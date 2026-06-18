export interface ValidationResult {
  status: "VALID" | "INVALID";
  errors: string[]; // Strict errors that make the record invalid
  warnings: string[]; // Warnings that highlight outliers or duplicate work orders
}

interface RecordValidateInput {
  id?: string;
  date?: string | null;
  shift?: string | null;
  employeeNo?: string | null;
  operationCode?: string | null;
  machineNo?: string | null;
  workOrderNo?: string | null;
  quantityProduced?: number | null;
  timeTakenHours?: number | null;
}

/**
 * Validates a machine shop record against manufacturing rules.
 * 
 * @param record The record to validate
 * @param existingWorkOrders List of existing work order numbers in the database (for duplicate detection)
 * @returns ValidationResult containing status, errors list, and warnings list
 */
export function validateRecord(
  record: RecordValidateInput,
  existingWorkOrders: string[] = []
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Rule 1: Mandatory Fields
  if (!record.date || record.date.trim() === "") {
    errors.push("Date is a mandatory field.");
  }
  if (!record.shift || record.shift.trim() === "") {
    errors.push("Shift is a mandatory field.");
  }
  if (!record.employeeNo || record.employeeNo.trim() === "") {
    errors.push("Employee Number is a mandatory field.");
  }
  if (!record.machineNo || record.machineNo.trim() === "") {
    errors.push("Machine Number is a mandatory field.");
  }

  // Rule 2: Shift Validation (I, II, III allowed)
  if (record.shift && record.shift.trim() !== "") {
    const shift = record.shift.trim();
    if (shift !== "I" && shift !== "II" && shift !== "III") {
      errors.push(`Shift '${shift}' is invalid. Allowed shifts: I, II, III.`);
    }
  }

  // Rule 3: Employee Validation (^BT\d+$)
  if (record.employeeNo && record.employeeNo.trim() !== "") {
    const employeeNo = record.employeeNo.trim();
    if (!/^BT\d+$/.test(employeeNo)) {
      errors.push(`Employee Number '${employeeNo}' is invalid. Must follow pattern 'BT' followed by digits (e.g. BT1234).`);
    }
  }

  // Rule 4: Machine Validation (^MC-\d{3}$)
  if (record.machineNo && record.machineNo.trim() !== "") {
    const machineNo = record.machineNo.trim();
    if (!/^MC-\d{3}$/.test(machineNo)) {
      errors.push(`Machine Number '${machineNo}' is invalid. Must follow pattern 'MC-XXX' (e.g. MC-730).`);
    }
  }

  // Rule 5: Operation Code (Numeric only)
  if (record.operationCode && record.operationCode.trim() !== "") {
    const operationCode = record.operationCode.trim();
    if (!/^\d+$/.test(operationCode)) {
      errors.push(`Operation Code '${operationCode}' must be numeric only.`);
    }
  }

  // Rule 6: Quantity Validation (Quantity >= 0)
  // If empty: Manual Review Required
  if (record.quantityProduced === undefined || record.quantityProduced === null) {
    warnings.push("Manual Review Required: Quantity produced is missing.");
  } else {
    const qty = record.quantityProduced;
    if (qty < 0) {
      errors.push("Quantity produced cannot be negative.");
    }
  }

  // Rule 7: Time Validation (0 < time <= 12)
  if (record.timeTakenHours !== undefined && record.timeTakenHours !== null) {
    const hours = record.timeTakenHours;
    if (hours <= 0 || hours > 12) {
      errors.push(`Time taken (${hours} hours) must be greater than 0 and less than or equal to 12.`);
    }
  }

  // Rule 8: Duplicate Work Order Detection
  if (record.workOrderNo && record.workOrderNo.trim() !== "") {
    const wo = record.workOrderNo.trim();
    if (existingWorkOrders.includes(wo)) {
      warnings.push(`Potential Duplicate Work Order: '${wo}' already exists in database.`);
    }
  }

  // Rule 9: Outlier Detection (Quantity Produced / Time Taken)
  // Flag unrealistic productivity values
  if (
    record.quantityProduced !== undefined &&
    record.quantityProduced !== null &&
    record.quantityProduced > 0 &&
    record.timeTakenHours !== undefined &&
    record.timeTakenHours !== null &&
    record.timeTakenHours > 0
  ) {
    const productivity = record.quantityProduced / record.timeTakenHours;
    // Assume machine production rate should realistically be between 1 and 250 units/hour.
    // Rates outside this are flagged as potential OCR errors or operational anomalies.
    if (productivity > 250) {
      warnings.push(`Outlier Detected: Exceptionally high productivity rate of ${productivity.toFixed(1)} units/hour. Please verify values.`);
    } else if (productivity < 0.5) {
      warnings.push(`Outlier Detected: Exceptionally low productivity rate of ${productivity.toFixed(1)} units/hour. Please verify values.`);
    }
  }

  return {
    status: errors.length > 0 ? "INVALID" : "VALID",
    errors,
    warnings,
  };
}
