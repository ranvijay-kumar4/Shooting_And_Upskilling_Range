import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { validateRecord } from "@/lib/validation";
import { ReviewStatus, DocumentStatus } from "@prisma/client";

// GET handler: lists records with filters and search query parameters
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") as ReviewStatus | null;
    const search = searchParams.get("search") || "";
    const documentId = searchParams.get("documentId") || "";

    // Base query
    const whereClause: any = {};

    if (status) {
      whereClause.reviewStatus = status;
    }

    if (documentId) {
      whereClause.documentId = documentId;
    }

    // Keyword search across Date, Employee No, Machine No, Work Order No
    if (search.trim() !== "") {
      whereClause.OR = [
        { date: { contains: search, mode: "insensitive" } },
        { employeeNo: { contains: search, mode: "insensitive" } },
        { machineNo: { contains: search, mode: "insensitive" } },
        { workOrderNo: { contains: search, mode: "insensitive" } },
        { shift: { contains: search, mode: "insensitive" } },
      ];
    }

    const records = await db.machineRecord.findMany({
      where: whereClause,
      include: {
        document: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Fetch audit logs for all found records
    const recordIds = records.map((r) => r.id);
    const auditLogs = await db.auditLog.findMany({
      where: {
        recordId: { in: recordIds },
      },
      orderBy: {
        editedAt: "desc",
      },
    });

    // Map audit logs into their corresponding records for client convenience
    const recordsWithLogs = records.map((record) => ({
      ...record,
      auditLogs: auditLogs.filter((log) => log.recordId === record.id),
    }));

    return NextResponse.json(recordsWithLogs);
  } catch (error) {
    console.error("Fetch records API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch records: " + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}

// PUT handler: updates fields, generates audit logs, and validates corrected fields
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      id,
      date,
      shift,
      employeeNo,
      operationCode,
      machineNo,
      workOrderNo,
      quantityProduced,
      timeTakenHours,
      reviewStatus,
    } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing record ID" }, { status: 400 });
    }

    // 1. Fetch current database record
    const original = await db.machineRecord.findUnique({
      where: { id },
      include: { document: true },
    });

    if (!original) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    // 2. Track changes and build Audit Logs
    const auditLogsToCreate: {
      recordId: string;
      fieldName: string;
      oldValue: string | null;
      newValue: string | null;
    }[] = [];
    const fieldsToTrack = [
      { name: "date", label: "Date", originalVal: original.date, newVal: date },
      { name: "shift", label: "Shift", originalVal: original.shift, newVal: shift },
      { name: "employeeNo", label: "Employee Number", originalVal: original.employeeNo, newVal: employeeNo },
      { name: "operationCode", label: "Operation Code", originalVal: original.operationCode, newVal: operationCode },
      { name: "machineNo", label: "Machine Number", originalVal: original.machineNo, newVal: machineNo },
      { name: "workOrderNo", label: "Work Order Number", originalVal: original.workOrderNo, newVal: workOrderNo },
      {
        name: "quantityProduced",
        label: "Quantity Produced",
        originalVal: original.quantityProduced?.toString() ?? null,
        newVal: quantityProduced?.toString() ?? null,
      },
      {
        name: "timeTakenHours",
        label: "Time Taken (Hours)",
        originalVal: original.timeTakenHours?.toString() ?? null,
        newVal: timeTakenHours?.toString() ?? null,
      },
    ];

    for (const field of fieldsToTrack) {
      const origStr = field.originalVal ? String(field.originalVal).trim() : "";
      const newStr = field.newVal ? String(field.newVal).trim() : "";
      if (origStr !== newStr) {
        auditLogsToCreate.push({
          recordId: id,
          fieldName: field.label,
          oldValue: field.originalVal ? String(field.originalVal) : null,
          newValue: field.newVal ? String(field.newVal) : null,
        });
      }
    }

    // 3. Query other records' work orders to detect duplicates (excluding current record)
    const otherRecords = await db.machineRecord.findMany({
      where: { id: { not: id } },
      select: { workOrderNo: true },
    });
    const otherWorkOrders = otherRecords
      .map((r) => r.workOrderNo)
      .filter(Boolean) as string[];

    // 4. Re-run validation rules on updated data
    const parsedQty = quantityProduced !== "" && quantityProduced !== null && quantityProduced !== undefined ? Number(quantityProduced) : null;
    const parsedTime = timeTakenHours !== "" && timeTakenHours !== null && timeTakenHours !== undefined ? Number(timeTakenHours) : null;

    const valResult = validateRecord(
      {
        date,
        shift,
        employeeNo,
        operationCode,
        machineNo,
        workOrderNo,
        quantityProduced: parsedQty,
        timeTakenHours: parsedTime,
      },
      otherWorkOrders
    );

    const validationStatus = valResult.status;
    const validationErrors = [...valResult.errors, ...valResult.warnings];

    // Determine final review status
    let finalReviewStatus = reviewStatus ?? original.reviewStatus;

    // 5. Update record and write audit logs in a single transaction
    const updatedRecord = await db.$transaction(async (tx) => {
      // Create audit logs
      if (auditLogsToCreate.length > 0) {
        await tx.auditLog.createMany({
          data: auditLogsToCreate,
        });
      }

      // If reviewStatus is being changed to APPROVED, check if there are strict validation errors.
      // (Warnings like duplicate work order or outlier are allowed but strict errors are blocked)
      if (finalReviewStatus === "APPROVED" && valResult.errors.length > 0) {
        throw new Error(`Cannot approve record with active validation errors: ${valResult.errors.join(", ")}`);
      }

      // Update machine record
      const record = await tx.machineRecord.update({
        where: { id },
        data: {
          date,
          shift,
          employeeNo,
          operationCode,
          machineNo,
          workOrderNo,
          quantityProduced: parsedQty,
          timeTakenHours: parsedTime,
          validationStatus,
          validationErrors,
          reviewStatus: finalReviewStatus,
        },
      });

      // Update parent document status
      let docStatus: DocumentStatus = "REVIEW_PENDING";
      if (finalReviewStatus === "APPROVED") {
        docStatus = "APPROVED";
      } else if (finalReviewStatus === "REJECTED") {
        docStatus = "REJECTED";
      }

      await tx.document.update({
        where: { id: original.documentId },
        data: { status: docStatus },
      });

      return record;
    });

    return NextResponse.json({
      message: "Record updated successfully",
      record: updatedRecord,
      auditsCreated: auditLogsToCreate.length,
    });
  } catch (error) {
    console.error("Update record API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update record" },
      { status: 400 }
    );
  }
}

// DELETE handler: deletes a record and its document
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing record ID" }, { status: 400 });
    }

    const record = await db.machineRecord.findUnique({
      where: { id },
    });

    if (!record) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    // Delete record (cascade deletes parent document if we want, or delete document first)
    await db.$transaction([
      db.auditLog.deleteMany({ where: { recordId: id } }),
      db.machineRecord.delete({ where: { id } }),
      db.document.delete({ where: { id: record.documentId } }),
    ]);

    return NextResponse.json({ message: "Record and document deleted successfully" });
  } catch (error) {
    console.error("Delete record API error:", error);
    return NextResponse.json(
      { error: "Failed to delete record: " + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}
