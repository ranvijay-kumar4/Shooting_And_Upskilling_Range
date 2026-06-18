"use client";

import React, { useState, useEffect, useRef } from "react";
import { useStore, UploadingFile } from "@/hooks/use-store";
import {
  Upload,
  FileText,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Clock,
  Trash2,
  FileUp,
} from "lucide-react";

export default function UploadPage() {
  const { uploadQueue, addFilesToQueue, updateFileProgress, updateFileStatus, clearQueue, addToast } = useStore();
  const [isDragOver, setIsDragOver] = useState(false);
  const [recentUploads, setRecentUploads] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch upload history
  const fetchHistory = async () => {
    try {
      const res = await fetch("/api/records");
      if (res.ok) {
        const data = await res.json();
        // Extract unique documents from records
        const docsMap = new Map();
        data.forEach((r: any) => {
          if (r.document && !docsMap.has(r.document.id)) {
            docsMap.set(r.document.id, r.document);
          }
        });
        setRecentUploads(Array.from(docsMap.values()));
      }
    } catch (err) {
      console.error("Failed to load upload history", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const processFiles = async (selectedFiles: FileList) => {
    const filesToQueue = Array.from(selectedFiles).map((f) => {
      const isImg = f.type.startsWith("image/");
      return {
        name: f.name,
        size: f.size,
        previewUrl: isImg ? URL.createObjectURL(f) : undefined,
      };
    });

    const fileIds = addFilesToQueue(filesToQueue);

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const queueId = fileIds[i];

      // Step 1: Simulate upload progress to server
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress <= 90) {
          updateFileProgress(queueId, progress);
        }
      }, 100);

      // Step 2: Send request to upload endpoint (which runs OCR + LLM + validation synchronously)
      try {
        updateFileStatus(queueId, "processing");
        const formData = new FormData();
        formData.append("files", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        clearInterval(interval);

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Processing failed");
        }

        const data = await res.json();
        const docResult = data.processed[0];

        if (docResult.status === "ERROR") {
          throw new Error(docResult.error || "Extraction failed");
        }

        updateFileProgress(queueId, 100);
        updateFileStatus(queueId, "success");
        
        if (docResult.validationStatus === "INVALID") {
          addToast(`'${file.name}' digitized with warnings. Review queue updated.`, "warning");
        } else {
          addToast(`'${file.name}' digitized successfully. Record pending approval.`, "success");
        }
      } catch (err: any) {
        clearInterval(interval);
        updateFileStatus(queueId, "error", err.message || "Failed to process");
        addToast(`Failed to digitize '${file.name}': ${err.message}`, "error");
      }
    }

    // Refresh history
    fetchHistory();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const triggerSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Upload Logs</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Ingest handwritten machine shop operational records (PNG, JPG, JPEG, or PDF) to start the AI extraction workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Zone & Active Queue */}
        <div className="lg:col-span-2 space-y-6">
          {/* Dropzone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerSelect}
            className={`border-2 border-dashed rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-4 cursor-pointer select-none transition-all duration-200 ${
              isDragOver
                ? "border-primary bg-primary/5 scale-[0.99] ring-2 ring-primary/20"
                : "border-border hover:border-slate-400 dark:hover:border-slate-600 bg-card hover:bg-accent/30"
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept="image/*,.pdf"
              className="hidden"
            />
            <div className="p-4 rounded-full bg-primary/10 text-primary">
              <FileUp className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-foreground">
                Drag and drop logs here, or <span className="text-primary hover:underline">browse files</span>
              </h3>
              <p className="text-[11px] text-muted-foreground">
                Supports JPEG, PNG, or PDF formats. File sizes up to 10MB.
              </p>
            </div>
          </div>

          {/* Active Queue */}
          {uploadQueue.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Active Processing Queue</h2>
                <button
                  onClick={clearQueue}
                  className="text-xs text-muted-foreground hover:text-destructive font-medium flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Clear Queue</span>
                </button>
              </div>
              <hr className="border-border" />

              <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
                {uploadQueue.map((file) => (
                  <div
                    key={file.id}
                    className="flex gap-4 p-3 border border-border rounded-lg bg-muted/30 items-center justify-between"
                  >
                    {/* Preview / Icon */}
                    <div className="flex items-center gap-3 min-w-0">
                      {file.previewUrl ? (
                        <img
                          src={file.previewUrl}
                          alt="preview"
                          className="h-10 w-10 object-cover rounded-md border border-border shrink-0"
                        />
                      ) : (
                        <div className="h-10 w-10 bg-primary/10 text-primary flex items-center justify-center rounded-md border border-border shrink-0">
                          <FileText className="h-5 w-5" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="text-xs font-semibold truncate max-w-[200px] sm:max-w-[300px]">
                          {file.name}
                        </div>
                        <div className="text-[10px] text-muted-foreground font-mono">
                          {(file.size / 1024).toFixed(1)} KB
                        </div>
                      </div>
                    </div>

                    {/* Progress / Status */}
                    <div className="flex items-center gap-4">
                      {file.status === "pending" || file.status === "processing" ? (
                        <div className="text-right space-y-1">
                          <div className="text-[10px] font-semibold text-primary animate-pulse font-mono">
                            {file.status === "pending" ? `Uploading ${file.progress}%` : "AI Processing..."}
                          </div>
                          <div className="w-24 bg-border h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-primary h-full transition-all duration-300"
                              style={{ width: `${file.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      ) : file.status === "success" ? (
                        <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50 dark:bg-emerald-950/20 px-2 py-1 rounded-md">
                          <CheckCircle className="h-3.5 w-3.5" />
                          <span>Processed</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-end gap-0.5">
                          <div className="flex items-center gap-1.5 text-xs text-rose-600 font-semibold bg-rose-50 dark:bg-rose-950/20 px-2 py-1 rounded-md">
                            <AlertCircle className="h-3.5 w-3.5" />
                            <span>Failed</span>
                          </div>
                          {file.error && (
                            <span className="text-[9px] text-rose-500 max-w-[120px] truncate">
                              {file.error}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Upload History / Ingestion Log */}
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Ingestion History</h2>
            <hr className="border-border" />

            {loadingHistory ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
              </div>
            ) : recentUploads.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground space-y-2">
                <Clock className="h-8 w-8 mx-auto text-muted-foreground/50" />
                <div className="text-xs font-medium">No documents processed yet.</div>
                <p className="text-[10px] leading-relaxed">
                  Uploaded documents will be listed here with their status logs.
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {recentUploads.map((doc) => {
                  const statusColors =
                    doc.status === "APPROVED"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900"
                      : doc.status === "REJECTED"
                      ? "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900"
                      : doc.status === "ERROR"
                      ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900"
                      : "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900";

                  return (
                    <div
                      key={doc.id}
                      className="p-3 border border-border rounded-lg bg-muted/20 space-y-2 hover:bg-muted/40 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="text-xs font-semibold truncate text-foreground">
                            {doc.fileName}
                          </div>
                          <div className="text-[9px] text-muted-foreground">
                            {new Date(doc.uploadedAt).toLocaleString()}
                          </div>
                        </div>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 border rounded-md uppercase shrink-0 font-mono ${statusColors}`}>
                          {doc.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
