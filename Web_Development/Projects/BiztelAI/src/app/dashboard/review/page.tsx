"use client";

import React, { useState, useEffect } from "react";
import { useStore } from "@/hooks/use-store";
import {
  FileCheck2,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Save,
  Check,
  ChevronRight,
  Eye,
  Activity,
  History as HistoryIcon,
} from "lucide-react";

export default function ReviewPage() {
  const { addToast } = useStore();
  const [pendingRecords, setPendingRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeRecord, setActiveRecord] = useState<any | null>(null);

  // Form State
  const [formDate, setFormDate] = useState("");
  const [formShift, setFormShift] = useState("");
  const [formEmployeeNo, setFormEmployeeNo] = useState("");
  const [formOperationCode, setFormOperationCode] = useState("");
  const [formMachineNo, setFormMachineNo] = useState("");
  const [formWorkOrderNo, setFormWorkOrderNo] = useState("");
  const [formQuantity, setFormQuantity] = useState<number | null>(null);
  const [formTime, setFormTime] = useState<number | null>(null);

  // Tab state inside document viewer (original doc vs raw ocr text)
  const [docViewerTab, setDocViewerTab] = useState<"doc" | "ocr">("doc");

  // Fetch pending records from database
  const fetchPending = async (selectId?: string) => {
    try {
      setLoading(true);
      const res = await fetch("/api/records?status=PENDING");
      if (res.ok) {
        const data = await res.json();
        setPendingRecords(data);
        if (data.length > 0) {
          // If selectId is passed, activate it, otherwise activate first
          const match = selectId ? data.find((r: any) => r.id === selectId) : null;
          handleSelectRecord(match || data[0]);
        } else {
          setActiveRecord(null);
        }
      }
    } catch (err) {
      console.error(err);
      addToast("Failed to fetch review queue", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleSelectRecord = (record: any) => {
    setActiveRecord(record);
    setFormDate(record.date || "");
    setFormShift(record.shift || "");
    setFormEmployeeNo(record.employeeNo || "");
    setFormOperationCode(record.operationCode || "");
    setFormMachineNo(record.machineNo || "");
    setFormWorkOrderNo(record.workOrderNo || "");
    setFormQuantity(record.quantityProduced);
    setFormTime(record.timeTakenHours);
  };

  // Render confidence badges with color thresholds
  const renderConfidenceBadge = (fieldName: string) => {
    if (!activeRecord || !activeRecord.fieldConfidences) return null;
    const confidence = activeRecord.fieldConfidences[fieldName] ?? 1.0;
    const pct = Math.round(confidence * 100);

    let colors = "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900";
    if (pct >= 90) {
      colors = "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900";
    } else if (pct >= 70) {
      colors = "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900";
    }

    return (
      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 border rounded-md shrink-0 select-none ${colors}`}>
        {pct}% Conf
      </span>
    );
  };

  // Get field highlight border classes
  const getFieldBorderClass = (fieldName: string) => {
    if (!activeRecord || !activeRecord.fieldConfidences) return "border-border";
    const confidence = activeRecord.fieldConfidences[fieldName] ?? 1.0;
    const pct = Math.round(confidence * 100);

    if (pct < 70) return "border-rose-500 focus:ring-rose-500 focus:border-rose-500 bg-rose-50/5";
    if (pct < 90) return "border-amber-400 focus:ring-amber-400 focus:border-amber-400 bg-amber-50/5";
    return "border-border focus:ring-primary focus:border-primary";
  };

  // Handle Save (only updates values and validations, leaves reviewStatus PENDING)
  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!activeRecord) return;

    try {
      const res = await fetch("/api/records", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: activeRecord.id,
          date: formDate,
          shift: formShift,
          employeeNo: formEmployeeNo,
          operationCode: formOperationCode,
          machineNo: formMachineNo,
          workOrderNo: formWorkOrderNo,
          quantityProduced: formQuantity,
          timeTakenHours: formTime,
          reviewStatus: "PENDING",
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Update failed");
      }

      const data = await res.json();
      addToast("Corrections saved. Validation updated.", "success");
      // Refresh active item and queue to display updated validations and logs
      fetchPending(activeRecord.id);
    } catch (err: any) {
      addToast(err.message, "error");
    }
  };

  // Handle Approve (saves fields and updates reviewStatus APPROVED)
  const handleApprove = async () => {
    if (!activeRecord) return;

    try {
      const res = await fetch("/api/records", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: activeRecord.id,
          date: formDate,
          shift: formShift,
          employeeNo: formEmployeeNo,
          operationCode: formOperationCode,
          machineNo: formMachineNo,
          workOrderNo: formWorkOrderNo,
          quantityProduced: formQuantity,
          timeTakenHours: formTime,
          reviewStatus: "APPROVED",
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Approval failed");
      }

      addToast("Record approved successfully!", "success");
      // Refresh list, will select next record in queue
      fetchPending();
    } catch (err: any) {
      addToast(err.message, "error");
    }
  };

  // Handle Reject
  const handleReject = async () => {
    if (!activeRecord) return;

    try {
      const res = await fetch("/api/records", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: activeRecord.id,
          date: formDate,
          shift: formShift,
          employeeNo: formEmployeeNo,
          operationCode: formOperationCode,
          machineNo: formMachineNo,
          workOrderNo: formWorkOrderNo,
          quantityProduced: formQuantity,
          timeTakenHours: formTime,
          reviewStatus: "REJECTED",
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Rejection failed");
      }

      addToast("Record rejected and flagged.", "warning");
      fetchPending();
    } catch (err: any) {
      addToast(err.message, "error");
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col min-h-0">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Review Workstation</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Perform human-in-the-loop review on machine shop records. Verify field values, check validation errors, and authorize entries.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs bg-muted border border-border px-3 py-1.5 rounded-lg font-mono">
          <Activity className="h-3.5 w-3.5 text-primary" />
          <span>Queue Count: {pendingRecords.length}</span>
        </div>
      </div>

      {loading && pendingRecords.length === 0 ? (
        <div className="flex-1 flex items-center justify-center bg-card border border-border rounded-2xl p-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : pendingRecords.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-card border border-border rounded-2xl border-dashed">
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 rounded-full border border-emerald-100 dark:border-emerald-900 mb-4">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h3 className="text-sm font-semibold">Review Queue Cleared</h3>
          <p className="text-xs text-muted-foreground max-w-sm mt-1 leading-relaxed">
            All records have been processed and validated. Upload more logsheets to ingest data.
          </p>
        </div>
      ) : (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
          {/* Column 1: Pending Queue Selector */}
          <div className="lg:col-span-1 border border-border bg-card rounded-2xl flex flex-col overflow-hidden max-h-[750px]">
            <div className="p-4 border-b border-border bg-muted/20">
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Pending Items</h2>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-border">
              {pendingRecords.map((record) => {
                const isActive = activeRecord?.id === record.id;
                const isInvalid = record.validationStatus === "INVALID";
                return (
                  <button
                    key={record.id}
                    onClick={() => handleSelectRecord(record)}
                    className={`w-full text-left p-4 transition-colors flex items-center justify-between select-none cursor-pointer ${
                      isActive ? "bg-primary/5 border-l-4 border-primary" : "hover:bg-muted/30"
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="text-xs font-semibold text-foreground truncate">
                        {record.document?.fileName || "Ingested Record"}
                      </div>
                      <div className="text-[10px] text-muted-foreground font-mono mt-0.5">
                        WO: {record.workOrderNo || "N/A"}
                      </div>
                    </div>
                    {isInvalid ? (
                      <span className="text-[9px] font-bold bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400 px-1.5 py-0.5 rounded border border-rose-100 dark:border-rose-900 uppercase">
                        Issues
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 px-1.5 py-0.5 rounded border border-amber-100 dark:border-amber-900 uppercase">
                        Pending
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Columns 2-4: Interactive Split Panel Workspace */}
          {activeRecord && (
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[750px]">
              {/* Left Column: Original Document Viewer / OCR text */}
              <div className="border border-border bg-card rounded-2xl flex flex-col overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-border bg-muted/20 justify-between items-center px-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDocViewerTab("doc")}
                      className={`text-xs font-bold py-3.5 border-b-2 px-1 cursor-pointer select-none transition-colors ${
                        docViewerTab === "doc" ? "border-primary text-primary" : "border-transparent text-muted-foreground"
                      }`}
                    >
                      Original File
                    </button>
                    <button
                      onClick={() => setDocViewerTab("ocr")}
                      className={`text-xs font-bold py-3.5 border-b-2 px-1 cursor-pointer select-none transition-colors ${
                        docViewerTab === "ocr" ? "border-primary text-primary" : "border-transparent text-muted-foreground"
                      }`}
                    >
                      Raw OCR Dump
                    </button>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono truncate max-w-[150px]">
                    {activeRecord.document?.fileName}
                  </span>
                </div>

                {/* Tab content */}
                <div className="flex-1 overflow-auto bg-muted/10 p-4 flex flex-col justify-center">
                  {docViewerTab === "doc" ? (
                    activeRecord.document?.filePath ? (
                      activeRecord.document.filePath.endsWith(".pdf") ? (
                        <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground space-y-3 h-full">
                          <FileText className="h-16 w-16 text-primary/30" />
                          <div className="text-xs font-semibold text-foreground">PDF Document Loaded</div>
                          <p className="text-[10px] max-w-xs leading-relaxed">
                            Handwritten text layout parsed using mock correction heuristics. Refer to the Raw OCR Dump tab to inspect noisy OCR characters.
                          </p>
                          <a
                            href={activeRecord.document.filePath}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-primary hover:underline font-semibold flex items-center gap-1 mt-2"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            <span>View Original PDF</span>
                          </a>
                        </div>
                      ) : (
                        <div className="relative group overflow-hidden border border-border rounded-xl bg-card max-h-[600px] flex items-center justify-center">
                          <img
                            src={activeRecord.document.filePath}
                            alt="document file source"
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      )
                    ) : (
                      <div className="text-xs text-muted-foreground text-center py-12">No document path available</div>
                    )
                  ) : (
                    <div className="h-full bg-slate-900 text-slate-300 font-mono text-xs p-4 rounded-xl border border-slate-800 overflow-y-auto selection:bg-blue-500 selection:text-white">
                      <pre className="whitespace-pre-wrap leading-relaxed">{activeRecord.document?.rawOcrText || "No raw OCR text captured."}</pre>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Schema Editing Form & Validations */}
              <div className="border border-border bg-card rounded-2xl flex flex-col overflow-hidden">
                <div className="p-4 border-b border-border bg-muted/20">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Workstation Ingestion</h2>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* Validation Engine Warnings Panel */}
                  {activeRecord.validationErrors && (activeRecord.validationErrors as string[]).length > 0 && (
                    <div className="p-4 border border-amber-200 bg-amber-50/50 dark:border-amber-950/20 dark:bg-amber-950/20 rounded-xl space-y-2">
                      <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                        <AlertTriangle className="h-4 w-4 shrink-0" />
                        <h4 className="text-xs font-bold">Validation Warnings Detected</h4>
                      </div>
                      <ul className="list-disc list-inside text-[11px] text-amber-700/95 dark:text-amber-400/90 leading-relaxed pl-1 space-y-1">
                        {(activeRecord.validationErrors as string[]).map((err, idx) => (
                          <li key={idx}>{err}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Editing Form */}
                  <form onSubmit={handleSave} className="space-y-4">
                    {/* Date Field */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold">Date</label>
                        {renderConfidenceBadge("date")}
                      </div>
                      <input
                        type="text"
                        value={formDate}
                        onChange={(e) => setFormDate(e.target.value)}
                        className={`w-full text-xs border rounded-lg px-3 py-2 bg-transparent transition-colors focus:outline-none focus:ring-1 ${getFieldBorderClass(
                          "date"
                        )}`}
                      />
                    </div>

                    {/* Shift Field */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold">Shift</label>
                        {renderConfidenceBadge("shift")}
                      </div>
                      <select
                        value={formShift}
                        onChange={(e) => setFormShift(e.target.value)}
                        className={`w-full text-xs border rounded-lg px-3 py-2 bg-card transition-colors focus:outline-none focus:ring-1 ${getFieldBorderClass(
                          "shift"
                        )}`}
                      >
                        <option value="">-- Select Shift --</option>
                        <option value="I">Shift I</option>
                        <option value="II">Shift II</option>
                        <option value="III">Shift III</option>
                        <option value="IV">Shift IV (Invalid Testing)</option>
                      </select>
                    </div>

                    {/* Employee No Field */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold">Employee ID</label>
                        {renderConfidenceBadge("employeeNo")}
                      </div>
                      <input
                        type="text"
                        value={formEmployeeNo}
                        onChange={(e) => setFormEmployeeNo(e.target.value)}
                        className={`w-full text-xs border rounded-lg px-3 py-2 bg-transparent transition-colors focus:outline-none focus:ring-1 ${getFieldBorderClass(
                          "employeeNo"
                        )}`}
                      />
                    </div>

                    {/* Operation Code */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold">Operation Code</label>
                        {renderConfidenceBadge("operationCode")}
                      </div>
                      <input
                        type="text"
                        value={formOperationCode}
                        onChange={(e) => setFormOperationCode(e.target.value)}
                        className={`w-full text-xs border rounded-lg px-3 py-2 bg-transparent transition-colors focus:outline-none focus:ring-1 ${getFieldBorderClass(
                          "operationCode"
                        )}`}
                      />
                    </div>

                    {/* Machine Number */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold">Machine ID</label>
                        {renderConfidenceBadge("machineNo")}
                      </div>
                      <input
                        type="text"
                        value={formMachineNo}
                        onChange={(e) => setFormMachineNo(e.target.value)}
                        className={`w-full text-xs border rounded-lg px-3 py-2 bg-transparent transition-colors focus:outline-none focus:ring-1 ${getFieldBorderClass(
                          "machineNo"
                        )}`}
                      />
                    </div>

                    {/* Work Order Number */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold">Work Order No</label>
                        {renderConfidenceBadge("workOrderNo")}
                      </div>
                      <input
                        type="text"
                        value={formWorkOrderNo}
                        onChange={(e) => setFormWorkOrderNo(e.target.value)}
                        className={`w-full text-xs border rounded-lg px-3 py-2 bg-transparent transition-colors focus:outline-none focus:ring-1 ${getFieldBorderClass(
                          "workOrderNo"
                        )}`}
                      />
                    </div>

                    {/* Quantity Produced */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold">Quantity Produced</label>
                        {renderConfidenceBadge("quantityProduced")}
                      </div>
                      <input
                        type="number"
                        value={formQuantity === null ? "" : formQuantity}
                        onChange={(e) => setFormQuantity(e.target.value === "" ? null : Number(e.target.value))}
                        className={`w-full text-xs border rounded-lg px-3 py-2 bg-transparent transition-colors focus:outline-none focus:ring-1 ${getFieldBorderClass(
                          "quantityProduced"
                        )}`}
                      />
                    </div>

                    {/* Time Taken Hours */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold">Time Taken (Hours)</label>
                        {renderConfidenceBadge("timeTakenHours")}
                      </div>
                      <input
                        type="number"
                        step="0.1"
                        value={formTime === null ? "" : formTime}
                        onChange={(e) => setFormTime(e.target.value === "" ? null : Number(e.target.value))}
                        className={`w-full text-xs border rounded-lg px-3 py-2 bg-transparent transition-colors focus:outline-none focus:ring-1 ${getFieldBorderClass(
                          "timeTakenHours"
                        )}`}
                      />
                    </div>
                  </form>

                  {/* Audit Logs Trail dropdown inside Form if corrections exist */}
                  {activeRecord.auditLogs && activeRecord.auditLogs.length > 0 && (
                    <div className="pt-4 border-t border-border space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <HistoryIcon className="h-3.5 w-3.5" />
                        <h4 className="text-[10px] font-bold uppercase tracking-wider">Field Modifications Trail</h4>
                      </div>
                      <div className="space-y-1.5 font-mono text-[9px] max-h-32 overflow-y-auto">
                        {activeRecord.auditLogs.map((log: any) => (
                          <div key={log.id} className="p-2 bg-muted/40 border border-border rounded-lg leading-relaxed">
                            <span className="text-primary font-semibold">{log.fieldName}</span> corrected from{" "}
                            <span className="line-through text-rose-500 font-semibold">"{log.oldValue || "empty"}"</span> to{" "}
                            <span className="text-emerald-500 font-semibold">"{log.newValue || "empty"}"</span>{" "}
                            on {new Date(log.editedAt).toLocaleTimeString()}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Foot Action Buttons */}
                <div className="p-4 border-t border-border bg-muted/20 flex items-center justify-between gap-3">
                  <button
                    onClick={handleReject}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border border-rose-200 dark:border-rose-900 bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400 rounded-lg text-xs font-semibold transition-colors cursor-pointer select-none"
                  >
                    <XCircle className="h-3.5 w-3.5" />
                    <span>Reject</span>
                  </button>

                  <button
                    onClick={() => handleSave()}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border border-border hover:bg-accent rounded-lg text-xs font-semibold transition-colors cursor-pointer select-none"
                  >
                    <Save className="h-3.5 w-3.5" />
                    <span>Save Edits</span>
                  </button>

                  <button
                    onClick={handleApprove}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-primary hover:bg-primary/95 text-primary-foreground rounded-lg text-xs font-semibold transition-all shadow-sm shadow-primary/10 hover:scale-[1.01] cursor-pointer select-none"
                  >
                    <Check className="h-3.5 w-3.5" />
                    <span>Approve</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
