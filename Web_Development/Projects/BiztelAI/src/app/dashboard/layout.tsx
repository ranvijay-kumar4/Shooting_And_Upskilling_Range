"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/hooks/use-store";
import {
  LayoutDashboard,
  Upload,
  FileCheck2,
  History,
  Settings,
  Sun,
  Moon,
  Menu,
  X,
  Cpu,
  Database,
  Activity,
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isDarkMode, toggleDarkMode, setDarkMode } = useStore();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [setDarkMode]);

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Upload Documents", href: "/dashboard/upload", icon: Upload },
    { name: "Review Queue", href: "/dashboard/review", icon: FileCheck2 },
    { name: "History", href: "/dashboard/history", icon: History },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-foreground">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card shrink-0 select-none">
        {/* Brand Logo */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-border">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Cpu className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-bold text-sm leading-none tracking-tight">Machine Shop AI</h1>
            <span className="text-[10px] text-muted-foreground font-mono">Workflow OS v1.0</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer controls */}
        <div className="p-4 border-t border-border bg-muted/40 space-y-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Systems Online</span>
            </div>
            <div className="flex items-center gap-1">
              <Database className="h-3 w-3" />
              <span>Postgres</span>
            </div>
          </div>
          <button
            onClick={toggleDarkMode}
            className="flex w-full items-center justify-center gap-2 px-3 py-2 border border-border rounded-lg text-xs font-medium bg-card hover:bg-accent hover:text-foreground transition-colors cursor-pointer"
          >
            {isDarkMode ? (
              <>
                <Sun className="h-3.5 w-3.5 text-amber-500" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="h-3.5 w-3.5 text-blue-500" />
                <span>Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Header for Mobile */}
      <header className="md:hidden h-16 flex items-center justify-between px-6 border-b border-border bg-card select-none">
        <div className="flex items-center gap-3">
          <Cpu className="h-5 w-5 text-primary" />
          <h1 className="font-bold text-sm tracking-tight">Machine Shop AI</h1>
        </div>
        <button
          onClick={toggleMobileMenu}
          className="p-2 border border-border rounded-lg hover:bg-accent cursor-pointer"
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bottom-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border flex flex-col p-6 space-y-4">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="pt-6 border-t border-border mt-auto space-y-4">
            <button
              onClick={() => {
                toggleDarkMode();
                setIsMobileOpen(false);
              }}
              className="flex w-full items-center justify-center gap-2 px-4 py-3 border border-border rounded-lg text-sm font-medium bg-card hover:bg-accent"
            >
              {isDarkMode ? (
                <>
                  <Sun className="h-4 w-4 text-amber-500" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 text-blue-500" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto min-h-0">
        {/* System Performance Header Banner (Minimalist SaaS header) */}
        <header className="h-16 hidden md:flex items-center justify-between px-8 border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold tracking-tight">System Status Overview</h2>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
            <span>OCR Queue: Idle</span>
            <span>•</span>
            <span>LLM Extraction: Active</span>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
