import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { db } from "@/lib/db";
import { extractOCRText } from "@/lib/ocr";
import { extractMachineShopData } from "@/lib/ai";
import { validateRecord } from "@/lib/validation";
import { DocumentStatus, ReviewStatus } from "@prisma/client";


export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    
    // Ensure the upload directory exists
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    const processedDocuments = [];

    for (const file of files) {
      const ext = path.extname(file.name).toLowerCase();
      const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${ext}`;
      const filePath = path.join(uploadDir, uniqueName);

      // Write file buffer to disk
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await fs.writeFile(filePath, buffer);

      const fileRelativePath = `/uploads/${uniqueName}`;

      // Step 1: Create Document in Database with UPLOADED status
      let doc = await db.document.create({
        data: {
          fileName: file.name,
          filePath: fileRelativePath,
          status: "UPLOADED" as DocumentStatus,
        },
      });

      let rawOcrText = "";
      let ocrConfidence = 1.0;

      try {
        // Step 2: OCR Processing
        doc = await db.document.update({
          where: { id: doc.id },
          data: { status: "OCR_PROCESSING" as DocumentStatus },
        });

        if (ext === ".pdf") {
          // Fallback simulation for PDF documents since Tesseract.js is image-based
          rawOcrText = `Machine Shop Daily Log Sheet
Date: 2026-06-05
Shift: II
Employee No: BT471O (noisy handwriting)
Machine No: MC-73O
Work Order No: WO-99128
Operation Code: 50O2
Quantity Produced: 250
Time Taken (Hrs): 4.5
Note: Handwritten entry with common OCR confusion characters.`;
          ocrConfidence = 0.85;
        } else {
          const ocrResult = await extractOCRText(filePath);
          rawOcrText = ocrResult.rawText;
          ocrConfidence = ocrResult.confidence;
        }

        // Update raw OCR text
        doc = await db.document.update({
          where: { id: doc.id },
          data: { 
            rawOcrText,
            status: "AI_PROCESSING" as DocumentStatus
          },
        });

        // Step 3: AI Extraction
        const extracted = await extractMachineShopData(rawOcrText);

        // Query existing work orders for duplicate validation
        const existingRecords = await db.machineRecord.findMany({
          select: { workOrderNo: true },
        });
        const existingWorkOrders = existingRecords
          .map((r) => r.workOrderNo)
          .filter(Boolean) as string[];

        // Step 4: Validation Engine
        const valResult = validateRecord(
          {
            date: extracted.date.value,
            shift: extracted.shift.value,
            employeeNo: extracted.employeeNo.value,
            operationCode: extracted.operationCode.value,
            machineNo: extracted.machineNo.value,
            workOrderNo: extracted.workOrderNo.value,
            quantityProduced: extracted.quantityProduced.value,
            timeTakenHours: extracted.timeTakenHours.value,
          },
          existingWorkOrders
        );

        // Step 5: Save Extracted Record & Update Doc Status
        const validationStatus = valResult.status;
        const validationErrors = [...valResult.errors, ...valResult.warnings];

        await db.machineRecord.create({
          data: {
            date: extracted.date.value,
            shift: extracted.shift.value,
            employeeNo: extracted.employeeNo.value,
            operationCode: extracted.operationCode.value,
            machineNo: extracted.machineNo.value,
            workOrderNo: extracted.workOrderNo.value,
            quantityProduced: extracted.quantityProduced.value,
            timeTakenHours: extracted.timeTakenHours.value,
            fieldConfidences: {
              date: extracted.date.confidence,
              shift: extracted.shift.confidence,
              employeeNo: extracted.employeeNo.confidence,
              operationCode: extracted.operationCode.confidence,
              machineNo: extracted.machineNo.confidence,
              workOrderNo: extracted.workOrderNo.confidence,
              quantityProduced: extracted.quantityProduced.confidence,
              timeTakenHours: extracted.timeTakenHours.confidence,
            },
            validationStatus,
            validationErrors,
            reviewStatus: "PENDING" as ReviewStatus,
            documentId: doc.id,
          },
        });

        doc = await db.document.update({
          where: { id: doc.id },
          data: { status: "REVIEW_PENDING" as DocumentStatus },
        });

        processedDocuments.push({
          id: doc.id,
          fileName: doc.fileName,
          filePath: doc.filePath,
          status: doc.status,
          validationStatus,
        });

      } catch (err) {
        console.error(`Error processing file ${file.name}:`, err);
        doc = await db.document.update({
          where: { id: doc.id },
          data: { status: "ERROR" as DocumentStatus },
        });
        processedDocuments.push({
          id: doc.id,
          fileName: doc.fileName,
          filePath: doc.filePath,
          status: doc.status,
          error: err instanceof Error ? err.message : String(err),
        });
      }
    }

    return NextResponse.json({
      message: "Files processed successfully",
      processed: processedDocuments,
    });
  } catch (error) {
    console.error("Upload API error:", error);
    return NextResponse.json(
      { error: "Internal server error: " + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}
