"use client";

import React, { useState, useEffect } from "react";
import { useStore } from "@/hooks/use-store";
import {
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FolderUp,
  Percent,
  Copy,
  Edit2,
  TrendingUp,
  Clock,
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

interface DashboardData {
  kpis: {
    totalUploads: number;
    totalRecords: number;
    validationFailures: number;
    pendingReviews: number;
    approvedRecords: number;
    averageConfidence: number;
    duplicateRecordsFound: number;
    manualCorrectionsMade: number;
  };
  charts: {
    shiftSummary: { name: string; value: number }[];
    machineProduction: { machine: string; quantity: number }[];
    dailyProduction: { date: string; quantity: number }[];
    machineProductivity: { machine: string; productivity: number }[];
  };
}

// Chart Colors
const COLORS_PIE = ["#3b82f6", "#10b981", "#f59e0b"]; // Blue, Green, Amber
const COLOR_PRIMARY = "#3b82f6";
const COLOR_SUCCESS = "#10b981";
const COLOR_WARNING = "#f59e0b";

export default function DashboardPage() {
  const { addToast } = useStore();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/dashboard");
      if (res.ok) {
        const stats = await res.json();
        setData(stats);
      } else {
        throw new Error("Failed to load dashboard data");
      }
    } catch (err) {
      console.error(err);
      addToast("Failed to fetch dashboard metrics", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchStats();
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Operations Dashboard</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Real-time analytics and statistics aggregated from digitized machine shop operational records.
          </p>
        </div>
        <button
          onClick={fetchStats}
          className="flex items-center justify-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs font-semibold hover:bg-accent transition-colors cursor-pointer select-none"
        >
          <Clock className="h-3.5 w-3.5" />
          <span>Refresh Data</span>
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : !data || data.kpis.totalRecords === 0 ? (
        <div className="text-center py-24 border border-dashed border-border rounded-2xl bg-card p-12 space-y-4">
          <FolderUp className="h-12 w-12 mx-auto text-muted-foreground/30" />
          <h3 className="text-sm font-semibold">No Operational Data Ingested</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
            Upload handwritten logsheets on the <a href="/dashboard/upload" className="text-primary hover:underline font-semibold">Upload page</a> or trigger pre-seeded logs on the <a href="/dashboard/settings" className="text-primary hover:underline font-semibold">Settings page</a> to activate analytics.
          </p>
        </div>
      ) : (
        <>
          {/* KPI Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* KPI 1: Ingested Documents */}
            <div className="rounded-xl border border-border bg-card p-4 md:p-6 shadow-sm flex items-center justify-between hover:scale-[1.01] transition-transform select-none">
              <div className="space-y-1">
                <span className="text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-wider">Total Uploads</span>
                <h3 className="text-xl md:text-3xl font-bold tracking-tight font-mono">{data.kpis.totalUploads}</h3>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500 shrink-0">
                <FolderUp className="h-5 w-5 md:h-6 md:w-6" />
              </div>
            </div>

            {/* KPI 2: Extracted Rows */}
            <div className="rounded-xl border border-border bg-card p-4 md:p-6 shadow-sm flex items-center justify-between hover:scale-[1.01] transition-transform select-none">
              <div className="space-y-1">
                <span className="text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-wider">Total Records</span>
                <h3 className="text-xl md:text-3xl font-bold tracking-tight font-mono">{data.kpis.totalRecords}</h3>
              </div>
              <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0">
                <CheckCircle className="h-5 w-5 md:h-6 md:w-6" />
              </div>
            </div>

            {/* KPI 3: Validation Failures */}
            <div className="rounded-xl border border-border bg-card p-4 md:p-6 shadow-sm flex items-center justify-between hover:scale-[1.01] transition-transform select-none">
              <div className="space-y-1">
                <span className="text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-wider">Validation Issues</span>
                <h3 className="text-xl md:text-3xl font-bold tracking-tight font-mono text-rose-500">{data.kpis.validationFailures}</h3>
              </div>
              <div className="p-3 rounded-lg bg-rose-500/10 text-rose-500 shrink-0">
                <XCircle className="h-5 w-5 md:h-6 md:w-6" />
              </div>
            </div>

            {/* KPI 4: Pending Review */}
            <div className="rounded-xl border border-border bg-card p-4 md:p-6 shadow-sm flex items-center justify-between hover:scale-[1.01] transition-transform select-none">
              <div className="space-y-1">
                <span className="text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-wider">Pending Reviews</span>
                <h3 className="text-xl md:text-3xl font-bold tracking-tight font-mono text-amber-500">{data.kpis.pendingReviews}</h3>
              </div>
              <div className="p-3 rounded-lg bg-amber-500/10 text-amber-500 shrink-0">
                <AlertTriangle className="h-5 w-5 md:h-6 md:w-6" />
              </div>
            </div>

            {/* KPI 5: Approved Logs */}
            <div className="rounded-xl border border-border bg-card p-4 md:p-6 shadow-sm flex items-center justify-between hover:scale-[1.01] transition-transform select-none">
              <div className="space-y-1">
                <span className="text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-wider">Approved Records</span>
                <h3 className="text-xl md:text-3xl font-bold tracking-tight font-mono">{data.kpis.approvedRecords}</h3>
              </div>
              <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0">
                <CheckCircle className="h-5 w-5 md:h-6 md:w-6" />
              </div>
            </div>

            {/* KPI 6: Average Legibility Confidence */}
            <div className="rounded-xl border border-border bg-card p-4 md:p-6 shadow-sm flex items-center justify-between hover:scale-[1.01] transition-transform select-none">
              <div className="space-y-1">
                <span className="text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-wider">Avg AI Confidence</span>
                <h3 className="text-xl md:text-3xl font-bold tracking-tight font-mono">{data.kpis.averageConfidence}%</h3>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500 shrink-0">
                <Percent className="h-5 w-5 md:h-6 md:w-6" />
              </div>
            </div>

            {/* KPI 7: Duplicate Records Warning */}
            <div className="rounded-xl border border-border bg-card p-4 md:p-6 shadow-sm flex items-center justify-between hover:scale-[1.01] transition-transform select-none">
              <div className="space-y-1">
                <span className="text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-wider">Duplicates Found</span>
                <h3 className="text-xl md:text-3xl font-bold tracking-tight font-mono text-amber-500">{data.kpis.duplicateRecordsFound}</h3>
              </div>
              <div className="p-3 rounded-lg bg-amber-500/10 text-amber-500 shrink-0">
                <Copy className="h-5 w-5 md:h-6 md:w-6" />
              </div>
            </div>

            {/* KPI 8: Human Corrections Logged */}
            <div className="rounded-xl border border-border bg-card p-4 md:p-6 shadow-sm flex items-center justify-between hover:scale-[1.01] transition-transform select-none">
              <div className="space-y-1">
                <span className="text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-wider">Corrections Made</span>
                <h3 className="text-xl md:text-3xl font-bold tracking-tight font-mono text-indigo-500">{data.kpis.manualCorrectionsMade}</h3>
              </div>
              <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-500 shrink-0">
                <Edit2 className="h-5 w-5 md:h-6 md:w-6" />
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart 1: Shift-wise Summary (Pie Chart) */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold tracking-tight">Shift Distribution Summary</h3>
                <p className="text-[10px] text-muted-foreground">Percentage of machine log records assigned per work shift.</p>
              </div>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.charts.shiftSummary}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {data.charts.shiftSummary.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS_PIE[index % COLORS_PIE.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        borderColor: "var(--border)",
                        borderRadius: "8px",
                        fontSize: "11px",
                      }}
                    />
                    <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: "11px" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Machine-wise Production (Bar Chart) */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold tracking-tight">Machine Production Tonnage</h3>
                <p className="text-[10px] text-muted-foreground">Sum of total parts/quantity produced by individual machine number.</p>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.charts.machineProduction} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                    <XAxis dataKey="machine" tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                    <YAxis tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        borderColor: "var(--border)",
                        borderRadius: "8px",
                        fontSize: "11px",
                      }}
                    />
                    <Bar dataKey="quantity" fill={COLOR_PRIMARY} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 3: Daily Production Trend (Line Chart) */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold tracking-tight">Daily Ingested Quantities Trend</h3>
                <p className="text-[10px] text-muted-foreground">Timeline log indicating cumulative quantity produced per working day.</p>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.charts.dailyProduction} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                    <YAxis tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        borderColor: "var(--border)",
                        borderRadius: "8px",
                        fontSize: "11px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="quantity"
                      stroke={COLOR_SUCCESS}
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 4: Productivity Index (Bar Chart) */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold tracking-tight">Machine Shop Productivity Index</h3>
                <p className="text-[10px] text-muted-foreground">Average productivity rate calculated as total quantity produced per hour worked (Qty / Hour).</p>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.charts.machineProductivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                    <XAxis dataKey="machine" tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                    <YAxis tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        borderColor: "var(--border)",
                        borderRadius: "8px",
                        fontSize: "11px",
                      }}
                    />
                    <Bar dataKey="productivity" fill={COLOR_WARNING} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
