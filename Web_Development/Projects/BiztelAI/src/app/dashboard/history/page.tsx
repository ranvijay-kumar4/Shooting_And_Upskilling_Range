"use client";

import React, { useState, useEffect } from "react";
import { useStore } from "@/hooks/use-store";
import {
  Search,
  Filter,
  Download,
  Eye,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  History as HistoryIcon,
  X,
} from "lucide-react";

export default function HistoryPage() {
  const { addToast } = useStore();
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // Detailed view modal state
  const [inspectedRecord, setInspectedRecord] = useState<any | null>(null);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      let url = "/api/records";
      const params = [];
      if (statusFilter && statusFilter !== "ALL") {
        params.push(`status=${statusFilter}`);
      }
      if (searchQuery.trim() !== "") {
        params.push(`search=${encodeURIComponent(searchQuery)}`);
      }
      if (params.length > 0) {
        url += `?${params.join("&")}`;
      }

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setRecords(data);
      }
    } catch (err) {
      console.error(err);
      addToast("Failed to fetch records history", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRecords();
  };

  // Quick reset filters
  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("ALL");
    // Trigger fetch manually because setStatusFilter won't change if it was already ALL
    setTimeout(() => {
      fetch("/api/records")
        .then((res) => res.json())
        .then((data) => setRecords(data));
    }, 50);
  };

  // Client-side CSV Exporter
  const handleExportCSV = () => {
    if (records.length === 0) {
      addToast("No records available to export", "warning");
      return;
    }

    // Define CSV Headers
    const headers = [
      "Record ID",
      "Date",
      "Shift",
      "Employee Number",
      "Operation Code",
      "Machine Number",
      "Work Order Number",
      "Quantity Produced",
      "Time Taken (Hours)",
      "Validation Status",
      "Review Status",
      "File Name",
      "Created At",
    ];

    // Map rows
    const rows = records.map((r) => [
      r.id,
      r.date || "",
      r.shift || "",
      r.employeeNo || "",
      r.operationCode || "",
      r.machineNo || "",
      r.workOrderNo || "",
      r.quantityProduced ?? "",
      r.timeTakenHours ?? "",
      r.validationStatus,
      r.reviewStatus,
      r.document?.fileName || "",
      new Date(r.createdAt).toISOString(),
    ]);

    // Construct CSV String
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(","))].join(
        "\n"
      );

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `machine_shop_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast("CSV log exported successfully!", "success");
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Operation Logs</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Search historic log sheets, download tabular exports, and audit past edits.
          </p>
        </div>
        <div>
          <button
            onClick={handleExportCSV}
            className="flex w-full sm:w-auto items-center justify-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-semibold rounded-lg shadow-sm shadow-primary/10 transition-colors cursor-pointer select-none"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-4 items-end">
          {/* Search Box */}
          <div className="flex-1 space-y-1 w-full">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Search Logs</label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by Date, Employee ID, Machine ID, or Work Order..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-9 pr-4 py-2.5 border border-border rounded-lg bg-transparent focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="w-full sm:w-48 space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Review Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full text-xs border border-border rounded-lg px-3 py-2.5 bg-card focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">Pending Review</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex w-full sm:w-auto gap-3">
            <button
              type="submit"
              className="flex-1 sm:flex-none px-4 py-2.5 bg-accent hover:bg-accent/80 text-accent-foreground text-xs font-semibold rounded-lg border border-border transition-colors cursor-pointer"
            >
              Search
            </button>
            <button
              type="button"
              onClick={handleClearFilters}
              className="flex-1 sm:flex-none px-4 py-2.5 hover:bg-muted text-muted-foreground text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      {/* Main Table */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : records.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground space-y-2">
            <Clock className="h-12 w-12 mx-auto text-muted-foreground/30 animate-pulse" />
            <h3 className="text-sm font-semibold">No Logs Found</h3>
            <p className="text-xs max-w-sm mx-auto leading-relaxed">
              No machine shop logs matched the search filter. Reset parameters or seed the database in Settings to populate.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/20 text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                  <th className="p-4">Date</th>
                  <th className="p-4">Shift</th>
                  <th className="p-4">Employee ID</th>
                  <th className="p-4">Machine ID</th>
                  <th className="p-4">Work Order</th>
                  <th className="p-4">Qty</th>
                  <th className="p-4">Hrs</th>
                  <th className="p-4 text-center">Validation</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs">
                {records.map((record) => {
                  const statusColors =
                    record.reviewStatus === "APPROVED"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900"
                      : record.reviewStatus === "REJECTED"
                      ? "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900"
                      : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900";

                  const isInvalid = record.validationStatus === "INVALID";

                  return (
                    <tr key={record.id} className="hover:bg-muted/10 transition-colors">
                      <td className="p-4 font-mono font-semibold">{record.date || "—"}</td>
                      <td className="p-4">{record.shift || "—"}</td>
                      <td className="p-4 font-mono">{record.employeeNo || "—"}</td>
                      <td className="p-4 font-mono">{record.machineNo || "—"}</td>
                      <td className="p-4 font-mono">{record.workOrderNo || "—"}</td>
                      <td className="p-4 font-mono font-semibold">{record.quantityProduced ?? "—"}</td>
                      <td className="p-4 font-mono">{record.timeTakenHours ?? "—"}</td>
                      <td className="p-4 text-center">
                        {isInvalid ? (
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/20 px-2 py-0.5 rounded border border-rose-100 dark:border-rose-900">
                            <AlertTriangle className="h-3 w-3 shrink-0" />
                            <span>Errors</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded border border-emerald-100 dark:border-emerald-900">
                            <CheckCircle className="h-3 w-3 shrink-0" />
                            <span>Valid</span>
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded border font-mono uppercase ${statusColors}`}>
                          {record.reviewStatus}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => setInspectedRecord(record)}
                          className="p-1.5 hover:bg-accent text-muted-foreground hover:text-foreground rounded-lg transition-colors cursor-pointer"
                          title="Inspect Document"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inspection Modal Drawer */}
      {inspectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-muted/20">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="text-xs font-bold text-foreground">Document Inspector</h3>
                  <span className="text-[10px] text-muted-foreground font-mono">{inspectedRecord.document?.fileName}</span>
                </div>
              </div>
              <button
                onClick={() => setInspectedRecord(null)}
                className="p-1 hover:bg-accent rounded-lg cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content Body split screen */}
            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left pane: File image/PDF + raw ocr text */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Original Document Source</h4>
                {inspectedRecord.document?.filePath ? (
                  inspectedRecord.document.filePath.endsWith(".pdf") ? (
                    <div className="border border-border rounded-xl p-8 bg-muted/20 text-center flex flex-col items-center justify-center gap-2">
                      <FileText className="h-12 w-12 text-primary/30" />
                      <div className="text-xs font-semibold">PDF File Ingested</div>
                      <a
                        href={inspectedRecord.document.filePath}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-primary hover:underline font-medium"
                      >
                        Open original PDF source
                      </a>
                    </div>
                  ) : (
                    <div className="border border-border rounded-xl overflow-hidden bg-card flex items-center justify-center p-2">
                      <img
                        src={inspectedRecord.document.filePath}
                        alt="source upload log"
                        className="max-w-full max-h-64 object-contain rounded-lg"
                      />
                    </div>
                  )
                ) : (
                  <div className="text-xs text-muted-foreground">No source path available</div>
                )}

                {/* Raw OCR dump */}
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Raw OCR Recognized Text</h4>
                <div className="bg-slate-900 text-slate-300 font-mono text-[11px] p-3 rounded-xl border border-slate-800 max-h-44 overflow-y-auto">
                  <pre className="whitespace-pre-wrap leading-relaxed">{inspectedRecord.document?.rawOcrText || "No text buffer."}</pre>
                </div>
              </div>

              {/* Right pane: Extracted data + validations + audit trails */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-3">Extracted Fields</h4>
                  <div className="grid grid-cols-2 gap-3.5 border border-border rounded-xl p-4 bg-muted/20">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-muted-foreground">Date</span>
                      <div className="font-mono text-xs font-semibold text-foreground">{inspectedRecord.date || "—"}</div>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-muted-foreground">Shift</span>
                      <div className="text-xs font-semibold text-foreground">{inspectedRecord.shift || "—"}</div>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-muted-foreground">Employee Number</span>
                      <div className="font-mono text-xs font-semibold text-foreground">{inspectedRecord.employeeNo || "—"}</div>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-muted-foreground">Operation Code</span>
                      <div className="font-mono text-xs font-semibold text-foreground">{inspectedRecord.operationCode || "—"}</div>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-muted-foreground">Machine Number</span>
                      <div className="font-mono text-xs font-semibold text-foreground">{inspectedRecord.machineNo || "—"}</div>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-muted-foreground">Work Order Number</span>
                      <div className="font-mono text-xs font-semibold text-foreground">{inspectedRecord.workOrderNo || "—"}</div>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-muted-foreground">Quantity Produced</span>
                      <div className="font-mono text-xs font-bold text-foreground">{inspectedRecord.quantityProduced ?? "—"}</div>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-muted-foreground">Time Taken</span>
                      <div className="font-mono text-xs font-semibold text-foreground">{inspectedRecord.timeTakenHours ?? "—"} hrs</div>
                    </div>
                  </div>
                </div>

                {/* Validation list */}
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Validation Results</h4>
                  <div className="space-y-1.5 text-[11px] leading-relaxed">
                    {inspectedRecord.validationErrors && (inspectedRecord.validationErrors as string[]).length > 0 ? (
                      (inspectedRecord.validationErrors as string[]).map((err, idx) => (
                        <div key={idx} className="flex gap-2 p-2 border border-rose-200 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300 rounded-lg items-center">
                          <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                          <span>{err}</span>
                        </div>
                      ))
                    ) : (
                      <div className="flex gap-2 p-2 border border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300 rounded-lg items-center font-medium">
                        <CheckCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>All validation constraints satisfied.</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Audit Logs */}
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1 mb-2">
                    <HistoryIcon className="h-3.5 w-3.5" />
                    <span>Edits Audit Trail</span>
                  </h4>
                  <div className="space-y-2 max-h-36 overflow-y-auto">
                    {inspectedRecord.auditLogs && inspectedRecord.auditLogs.length > 0 ? (
                      inspectedRecord.auditLogs.map((log: any) => (
                        <div key={log.id} className="p-2 border border-border bg-muted/40 rounded-lg font-mono text-[9px] leading-relaxed">
                          <span className="text-primary font-semibold">{log.fieldName}</span> changed from{" "}
                          <span className="line-through text-rose-500">"{log.oldValue || "empty"}"</span> to{" "}
                          <span className="text-emerald-500 font-semibold">"{log.newValue || "empty"}"</span> on{" "}
                          {new Date(log.editedAt).toLocaleString()}
                        </div>
                      ))
                    ) : (
                      <div className="text-[10px] text-muted-foreground p-3 border border-border border-dashed rounded-lg text-center">
                        No manual corrections recorded. Values match original AI extraction.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="p-4 border-t border-border flex justify-end bg-muted/20">
              <button
                onClick={() => setInspectedRecord(null)}
                className="px-4 py-2 bg-accent hover:bg-accent/80 border border-border text-xs font-semibold rounded-lg cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
