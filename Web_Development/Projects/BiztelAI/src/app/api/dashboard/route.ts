import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // 1. Fetch KPI counts
    const totalUploads = await db.document.count();
    const totalRecords = await db.machineRecord.count();
    
    const validationFailures = await db.machineRecord.count({
      where: { validationStatus: "INVALID" },
    });

    const pendingReviews = await db.machineRecord.count({
      where: { reviewStatus: "PENDING" },
    });

    const approvedRecords = await db.machineRecord.count({
      where: { reviewStatus: "APPROVED" },
    });

    const manualCorrectionsCount = await db.auditLog.count();

    // 2. Fetch all records to calculate average confidence, duplicate flags, and chart data
    const records = await db.machineRecord.findMany();

    // Compute Average Confidence
    let totalConfidenceSum = 0;
    let confidenceFieldCount = 0;

    // Detect duplicate work orders in database
    const workOrderCounts: Record<string, number> = {};
    records.forEach((r) => {
      if (r.workOrderNo) {
        workOrderCounts[r.workOrderNo] = (workOrderCounts[r.workOrderNo] || 0) + 1;
      }
    });
    
    let duplicateRecordsCount = 0;
    Object.values(workOrderCounts).forEach((count) => {
      if (count > 1) {
        duplicateRecordsCount += count;
      }
    });

    records.forEach((r) => {
      const conf = r.fieldConfidences as any;
      if (conf) {
        const fields = [
          "date",
          "shift",
          "employeeNo",
          "operationCode",
          "machineNo",
          "workOrderNo",
          "quantityProduced",
          "timeTakenHours",
        ];
        fields.forEach((f) => {
          if (conf[f] !== undefined && conf[f] !== null) {
            totalConfidenceSum += Number(conf[f]);
            confidenceFieldCount++;
          }
        });
      }
    });

    const averageConfidence =
      confidenceFieldCount > 0 ? (totalConfidenceSum / confidenceFieldCount) * 100 : 100.0;

    // 3. Format Chart Data
    
    // CHART 1: Shift-wise Summary (Pie Chart)
    const shiftCounts: Record<string, number> = { "Shift I": 0, "Shift II": 0, "Shift III": 0 };
    records.forEach((r) => {
      if (r.shift === "I") shiftCounts["Shift I"]++;
      else if (r.shift === "II") shiftCounts["Shift II"]++;
      else if (r.shift === "III") shiftCounts["Shift III"]++;
    });
    const shiftSummaryData = Object.keys(shiftCounts).map((key) => ({
      name: key,
      value: shiftCounts[key],
    }));

    // CHART 2: Machine-wise Production (Bar Chart)
    // CHART 4: Productivity Chart (Quantity Produced / Hours Worked)
    const machineQty: Record<string, number> = {};
    const machineHours: Record<string, number> = {};

    records.forEach((r) => {
      if (r.machineNo) {
        const m = r.machineNo;
        machineQty[m] = (machineQty[m] || 0) + (r.quantityProduced || 0);
        machineHours[m] = (machineHours[m] || 0) + (r.timeTakenHours || 0);
      }
    });

    const machineProductionData = Object.keys(machineQty).map((m) => ({
      machine: m,
      quantity: machineQty[m],
    }));

    const machineProductivityData = Object.keys(machineQty).map((m) => {
      const qty = machineQty[m];
      const hrs = machineHours[m];
      const rate = hrs > 0 ? qty / hrs : 0;
      return {
        machine: m,
        productivity: Number(rate.toFixed(1)),
      };
    });

    // CHART 3: Daily Production Trend (Line Chart)
    const dailyQty: Record<string, number> = {};
    records.forEach((r) => {
      if (r.date) {
        dailyQty[r.date] = (dailyQty[r.date] || 0) + (r.quantityProduced || 0);
      }
    });
    // Sort keys chronologically
    const dailyProductionData = Object.keys(dailyQty)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .map((date) => ({
        date,
        quantity: dailyQty[date],
      }));

    return NextResponse.json({
      kpis: {
        totalUploads,
        totalRecords,
        validationFailures,
        pendingReviews,
        approvedRecords,
        averageConfidence: Number(averageConfidence.toFixed(1)),
        duplicateRecordsFound: duplicateRecordsCount,
        manualCorrectionsMade: manualCorrectionsCount,
      },
      charts: {
        shiftSummary: shiftSummaryData,
        machineProduction: machineProductionData,
        dailyProduction: dailyProductionData,
        machineProductivity: machineProductivityData,
      },
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(
      { error: "Failed to load dashboard data: " + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}
