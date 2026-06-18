import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { DocumentStatus, ReviewStatus } from "@prisma/client";

export async function POST() {
  try {
    // 1. Clean the database
    await db.auditLog.deleteMany({});
    await db.machineRecord.deleteMany({});
    await db.document.deleteMany({});

    // 2. Create sample Documents and records
    
    // DOCUMENT 1: Approved Shift 1 Record
    const doc1 = await db.document.create({
      data: {
        fileName: "shift_1_log_0601.png",
        filePath: "/uploads/sample-image.png",
        status: "APPROVED" as DocumentStatus,
        rawOcrText: "DATE: 2026-06-01 SHIFT: I EMP: BT1020 MACHINE: MC-730 WO: WO-10294 OP: 1010 QTY: 450 TIME: 8.0",
      },
    });

    await db.machineRecord.create({
      data: {
        date: "2026-06-01",
        shift: "I",
        employeeNo: "BT1020",
        operationCode: "1010",
        machineNo: "MC-730",
        workOrderNo: "WO-10294",
        quantityProduced: 450,
        timeTakenHours: 8.0,
        fieldConfidences: {
          date: 0.98,
          shift: 0.95,
          employeeNo: 0.96,
          operationCode: 0.94,
          machineNo: 0.99,
          workOrderNo: 0.92,
          quantityProduced: 0.95,
          timeTakenHours: 0.93,
        },
        validationStatus: "VALID",
        validationErrors: [],
        reviewStatus: "APPROVED" as ReviewStatus,
        documentId: doc1.id,
        createdAt: new Date("2026-06-01T08:00:00Z"),
      },
    });

    // DOCUMENT 2: Approved Shift 2 Record
    const doc2 = await db.document.create({
      data: {
        fileName: "shift_2_log_0601.png",
        filePath: "/uploads/sample-image.png",
        status: "APPROVED" as DocumentStatus,
        rawOcrText: "DATE: 2026-06-01 SHIFT: II EMP: BT3340 MACHINE: MC-850 WO: WO-10295 OP: 1020 QTY: 380 TIME: 7.5",
      },
    });

    await db.machineRecord.create({
      data: {
        date: "2026-06-01",
        shift: "II",
        employeeNo: "BT3340",
        operationCode: "1020",
        machineNo: "MC-850",
        workOrderNo: "WO-10295",
        quantityProduced: 380,
        timeTakenHours: 7.5,
        fieldConfidences: {
          date: 0.97,
          shift: 0.94,
          employeeNo: 0.95,
          operationCode: 0.93,
          machineNo: 0.97,
          workOrderNo: 0.91,
          quantityProduced: 0.94,
          timeTakenHours: 0.92,
        },
        validationStatus: "VALID",
        validationErrors: [],
        reviewStatus: "APPROVED" as ReviewStatus,
        documentId: doc2.id,
        createdAt: new Date("2026-06-01T16:00:00Z"),
      },
    });

    // DOCUMENT 3: Approved Shift 3 Record
    const doc3 = await db.document.create({
      data: {
        fileName: "shift_3_log_0602.png",
        filePath: "/uploads/sample-image.png",
        status: "APPROVED" as DocumentStatus,
        rawOcrText: "DATE: 2026-06-02 SHIFT: III EMP: BT2040 MACHINE: MC-730 WO: WO-10296 OP: 1010 QTY: 490 TIME: 8.5",
      },
    });

    await db.machineRecord.create({
      data: {
        date: "2026-06-02",
        shift: "III",
        employeeNo: "BT2040",
        operationCode: "1010",
        machineNo: "MC-730",
        workOrderNo: "WO-10296",
        quantityProduced: 490,
        timeTakenHours: 8.5,
        fieldConfidences: {
          date: 0.96,
          shift: 0.98,
          employeeNo: 0.94,
          operationCode: 0.91,
          machineNo: 0.98,
          workOrderNo: 0.93,
          quantityProduced: 0.96,
          timeTakenHours: 0.94,
        },
        validationStatus: "VALID",
        validationErrors: [],
        reviewStatus: "APPROVED" as ReviewStatus,
        documentId: doc3.id,
        createdAt: new Date("2026-06-02T00:30:00Z"),
      },
    });

    // DOCUMENT 4: Record Pending Review with validation issues (OCR handwriting misread Shift IV)
    const doc4 = await db.document.create({
      data: {
        fileName: "handwritten_log_noisy.jpg",
        filePath: "/uploads/sample-handwriting.png",
        status: "REVIEW_PENDING" as DocumentStatus,
        rawOcrText: "DATE: 2026-06-02 SHIFT: IV EMP: BT471O MACHINE: MC-73O WO: WO-10297 OP: 5OO2 QTY: 600 TIME: 1.5",
      },
    });

    await db.machineRecord.create({
      data: {
        date: "2026-06-02",
        shift: "IV", // INVALID
        employeeNo: "BT4710", // CORRECTED
        operationCode: "5002",
        machineNo: "MC-730", // CORRECTED
        workOrderNo: "WO-10297",
        quantityProduced: 600,
        timeTakenHours: 1.5,
        fieldConfidences: {
          date: 0.91,
          shift: 0.45, // low confidence
          employeeNo: 0.68, // low confidence
          operationCode: 0.72,
          machineNo: 0.70,
          workOrderNo: 0.88,
          quantityProduced: 0.82,
          timeTakenHours: 0.81,
        },
        validationStatus: "INVALID",
        validationErrors: [
          "Shift 'IV' is invalid. Allowed shifts: I, II, III.",
          "Outlier Detected: Exceptionally high productivity rate of 400.0 units/hour. Please verify values."
        ],
        reviewStatus: "PENDING" as ReviewStatus,
        documentId: doc4.id,
        createdAt: new Date("2026-06-02T10:00:00Z"),
      },
    });

    // DOCUMENT 5: Record Pending Review (Potential duplicate work order check)
    const doc5 = await db.document.create({
      data: {
        fileName: "handwritten_duplicate_log.jpg",
        filePath: "/uploads/sample-handwriting.png",
        status: "REVIEW_PENDING" as DocumentStatus,
        rawOcrText: "DATE: 2026-06-02 SHIFT: II EMP: BT3340 MACHINE: MC-850 WO: WO-10294 OP: 1020 QTY: 200 TIME: 4.0",
      },
    });

    await db.machineRecord.create({
      data: {
        date: "2026-06-02",
        shift: "II",
        employeeNo: "BT3340",
        operationCode: "1020",
        machineNo: "MC-850",
        workOrderNo: "WO-10294", // DUPLICATE (matches doc1)
        quantityProduced: 200,
        timeTakenHours: 4.0,
        fieldConfidences: {
          date: 0.94,
          shift: 0.92,
          employeeNo: 0.95,
          operationCode: 0.91,
          machineNo: 0.96,
          workOrderNo: 0.93,
          quantityProduced: 0.92,
          timeTakenHours: 0.91,
        },
        validationStatus: "VALID", // It contains warnings but no strict formatting errors
        validationErrors: ["Potential Duplicate Work Order: 'WO-10294' already exists in database."],
        reviewStatus: "PENDING" as ReviewStatus,
        documentId: doc5.id,
        createdAt: new Date("2026-06-02T16:30:00Z"),
      },
    });

    // Write a dummy audit log for the seeder
    await db.auditLog.create({
      data: {
        recordId: "mock-record-id-seeding",
        fieldName: "Employee Number",
        oldValue: "BT471O",
        newValue: "BT4710",
        editedAt: new Date("2026-06-02T11:15:00Z"),
      },
    });

    return NextResponse.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error("Seeder API error:", error);
    return NextResponse.json(
      { error: "Failed to seed database: " + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}
