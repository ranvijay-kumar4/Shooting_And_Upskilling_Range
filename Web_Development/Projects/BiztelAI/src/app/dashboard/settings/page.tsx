"use client";

import React, { useState, useEffect } from "react";
import { useStore } from "@/hooks/use-store";
import { Cpu, ShieldCheck, Database, Key, HelpCircle, RefreshCw, CheckCircle, AlertTriangle } from "lucide-react";

export default function SettingsPage() {
  const { addToast } = useStore();
  const [seeding, setSeeding] = useState(false);
  const [apiKeyStatus, setApiKeyStatus] = useState<"loading" | "present" | "missing">("loading");

  useEffect(() => {
    // Check if the OpenAI API Key is present in the environment (we'll fetch from a quick status endpoint)
    fetch("/api/config-status")
      .then((res) => res.json())
      .then((data) => {
        setApiKeyStatus(data.hasOpenaiKey ? "present" : "missing");
      })
      .catch(() => setApiKeyStatus("missing"));
  }, []);

  const handleSeedDatabase = async () => {
    setSeeding(true);
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      if (!res.ok) throw new Error("Failed to seed database");
      addToast("Database seeded successfully with sample logsheets!", "success");
    } catch (err) {
      console.error(err);
      addToast("Failed to seed database", "error");
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Monitor system integrations, verify API statuses, and manage testing data.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core Config Status Card */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Keys & API Integrations */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-semibold tracking-tight flex items-center gap-2">
              <Key className="h-4 w-4 text-primary" />
              <span>API Integrations & AI Engine</span>
            </h2>
            <hr className="border-border" />

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 border border-border rounded-lg bg-muted/40">
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold">OpenAI API Key</div>
                  <div className="text-[10px] text-muted-foreground font-mono">gpt-4o-mini (JSON Mode)</div>
                </div>
                <div>
                  {apiKeyStatus === "loading" ? (
                    <span className="text-xs text-muted-foreground animate-pulse">Checking status...</span>
                  ) : apiKeyStatus === "present" ? (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50 dark:bg-emerald-950/20 px-2 py-1 rounded-md">
                      <CheckCircle className="h-3.5 w-3.5" />
                      <span>Configured</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs text-amber-600 font-semibold bg-amber-50 dark:bg-amber-950/20 px-2 py-1 rounded-md">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      <span>Mock Fallback Active</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 border border-border rounded-lg bg-muted/40">
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold">Tesseract.js Engine</div>
                  <div className="text-[10px] text-muted-foreground font-mono">Local WASM OCR Service</div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50 dark:bg-emerald-950/20 px-2 py-1 rounded-md">
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>Ready</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-muted-foreground leading-relaxed">
              <strong>Note:</strong> When the OpenAI API key is missing, the system automatically falls back to an intelligent handwriting-corrector mock engine. This engine simulates character-by-character correction (e.g. converting legibility typos like 'MC-73O' to 'MC-730') so you can test the system's OCR → LLM → Validation pipeline end-to-end.
            </p>
          </div>

          {/* Card 2: Seeder and Resets */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-semibold tracking-tight flex items-center gap-2">
              <Database className="h-4 w-4 text-indigo-500" />
              <span>Database Operations</span>
            </h2>
            <hr className="border-border" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Reset the local PostgreSQL database and seed it with a set of 5 pre-made manufacturing documents. The seed data contains approved shift records, noisy records needing validation reviews, and potential work order duplicates to populate dashboard charts.
            </p>

            <button
              onClick={handleSeedDatabase}
              disabled={seeding}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer shadow-sm shadow-indigo-500/10"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${seeding ? "animate-spin" : ""}`} />
              <span>{seeding ? "Seeding Database..." : "Seed Database"}</span>
            </button>
          </div>
        </div>

        {/* Informational Sidebar Card */}
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-semibold tracking-tight flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-primary" />
              <span>Manufacturing Workflow OS</span>
            </h2>
            <hr className="border-border" />
            <div className="space-y-3 text-xs leading-relaxed text-muted-foreground">
              <div className="p-2.5 rounded-lg border border-border bg-muted/30">
                <div className="font-semibold text-foreground flex items-center gap-1.5">
                  <span className="text-xs">1</span>
                  <span>Document Upload</span>
                </div>
                <p className="text-[11px] mt-0.5">Drag-and-drop logsheets. Files are stored in public folder.</p>
              </div>
              <div className="p-2.5 rounded-lg border border-border bg-muted/30">
                <div className="font-semibold text-foreground flex items-center gap-1.5">
                  <span className="text-xs">2</span>
                  <span>OCR Extraction</span>
                </div>
                <p className="text-[11px] mt-0.5">Local Tesseract.js recognizes handwritten text logs.</p>
              </div>
              <div className="p-2.5 rounded-lg border border-border bg-muted/30">
                <div className="font-semibold text-foreground flex items-center gap-1.5">
                  <span className="text-xs">3</span>
                  <span>LLM Correction</span>
                </div>
                <p className="text-[11px] mt-0.5">AI interprets noisy text, outputs camelCase structured JSON.</p>
              </div>
              <div className="p-2.5 rounded-lg border border-border bg-muted/30">
                <div className="font-semibold text-foreground flex items-center gap-1.5">
                  <span className="text-xs">4</span>
                  <span>Validation & Review</span>
                </div>
                <p className="text-[11px] mt-0.5">Rules identify duplicates, shift typos, and outlier speeds.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
