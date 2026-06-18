"use client";

import React from "react";
import { useStore } from "@/hooks/use-store";
import { AlertCircle, CheckCircle2, Info, X, AlertTriangle } from "lucide-react";

export function Toasts() {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const bgClass =
          toast.type === "success"
            ? "border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300"
            : toast.type === "error"
            ? "border-rose-500 bg-rose-50 text-rose-900 dark:bg-rose-950/30 dark:text-rose-300"
            : toast.type === "warning"
            ? "border-amber-500 bg-amber-50 text-amber-900 dark:bg-amber-950/30 dark:text-amber-300"
            : "border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-950/30 dark:text-blue-300";

        const Icon =
          toast.type === "success"
            ? CheckCircle2
            : toast.type === "error"
            ? AlertCircle
            : toast.type === "warning"
            ? AlertTriangle
            : Info;

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 border rounded-xl shadow-lg transition-all duration-300 transform translate-y-0 opacity-100 ${bgClass}`}
            role="alert"
          >
            <Icon className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="flex-1 text-sm font-medium pr-2 leading-relaxed">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-muted-foreground hover:text-foreground shrink-0 rounded-lg p-0.5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
