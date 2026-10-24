import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — LaunchPilot AI",
  description: "Manage projects, prioritize tasks, and orchestrate smart AI assistance.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      {children}
    </div>
  );
}
