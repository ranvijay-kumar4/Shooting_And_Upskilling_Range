"use client";

import Link from "next/link";
import { Cpu, ArrowRight, FileText, CheckSquare, ShieldCheck, BarChart3, Database } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-primary selection:text-white">
      {/* Top Navbar */}
      <header className="max-w-7xl w-full mx-auto px-6 h-20 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
            <Cpu className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-bold text-sm leading-none tracking-tight">Machine Shop AI</h1>
            <span className="text-[10px] text-slate-400 font-mono">Workflow Automation</span>
          </div>
        </div>
        <div>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-4 py-2 border border-slate-700 hover:border-slate-500 rounded-lg text-xs font-semibold bg-slate-900 transition-colors"
          >
            <span>Enter Workspace</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center px-6 py-12 text-center max-w-4xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium animate-pulse">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Production-Ready OCR + LLM Pipeline</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
          Digitize Machine Shop Records <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
            With AI Precision
          </span>
        </h2>

        <p className="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed">
          Upload handwritten manufacturing logsheets. Our system extracts structured data using OCR + LLMs, validates data formats, highlights low-confidence values, logs human corrections, and builds operational analytics.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
          >
            <span>Launch Workstation</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 text-left max-w-5xl">
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-colors space-y-3">
            <div className="p-2 w-fit rounded-lg bg-blue-500/10 text-blue-400">
              <FileText className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-white">OCR & LLM Correction</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tesseract.js extracts raw text, while GPT-4o-mini corrects handwritten noise (e.g. converting 'O' to '0' in machine IDs) and outputs structured JSON.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-colors space-y-3">
            <div className="p-2 w-fit rounded-lg bg-indigo-500/10 text-indigo-400">
              <CheckSquare className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-white">Automated Validations</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Instant checks on employee IDs, shift codes, duplicate work orders, negative quantities, and machine rate outliers to prevent database pollution.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-colors space-y-3">
            <div className="p-2 w-fit rounded-lg bg-violet-500/10 text-violet-400">
              <BarChart3 className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-white">Interactive Analytics</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Track production trends, shift productivity (Quantity/Hour), and machine performance in real-time through dynamic dashboards.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-20 flex items-center justify-between border-t border-slate-800 px-6 max-w-7xl w-full mx-auto text-xs text-slate-500 font-mono">
        <div>© 2026 Machine Shop AI Workflow Automation System.</div>
        <div className="flex items-center gap-1">
          <Database className="h-3 w-3" />
          <span>Local Storage Files / Neon PostgreSQL</span>
        </div>
      </footer>
    </div>
  );
}
