"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/providers/authProvider";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  FolderGit2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  HelpCircle,
  Loader2,
} from "lucide-react";
import StatsCards from "@/components/modules/dashboard/StatsCards";
import RecentSubmissions from "@/components/modules/dashboard/RecentSubmissions";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function DashboardOverviewPage() {
  const { user, role, isLoading } = useAuth();
  const router = useRouter();
  const isStudent = role?.toUpperCase() === "STUDENT";

  useEffect(() => {
    if (!isLoading && isStudent) {
      router.replace("/dashboard/my-submition");
    }
  }, [isLoading, isStudent, router]);

  if (isLoading || isStudent) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-3 text-muted-foreground text-sm">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span>Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* 1. Mentor Welcome Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-linear-to-r from-primary/10 via-primary/5 to-transparent p-6 sm:p-8 shadow-xs">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-48 w-48 rounded-full bg-primary/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 border border-primary/25 text-primary text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Mentor Console Overview</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Welcome back, {user?.name || "Mentor"}! 👋
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl">
              Track high-level project submission metrics, review recent
              activities, and navigate to the dedicated submissions table.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/dashboard/submissions"
              className={
                buttonVariants({ size: "sm" }) +
                " gap-1.5 shadow-xs cursor-pointer"
              }
            >
              <FolderGit2 className="h-4 w-4" />
              <span>Go to All Submissions</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Top Statistics Cards */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4 text-primary" />
            Performance & Submission Overview
          </h2>
          <span className="text-xs text-muted-foreground">Updated live</span>
        </div>
        <StatsCards />
      </section>

      {/* 3. Overview Content: Recent Submissions + Quick Actions */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Recent Submissions Preview (8 Cols) */}
        <div className="lg:col-span-8">
          <RecentSubmissions />
        </div>

        {/* Quick Actions & Mentoring Workflow Card (4 Cols) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="rounded-3xl border border-border/70 bg-card/60 p-6 space-y-4">
            <h3 className="font-bold text-base text-foreground flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Quick Actions
            </h3>

            <div className="space-y-2.5">
              <Link
                href="/dashboard/submissions"
                className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/60 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <FolderGit2 className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-foreground block">
                      Review All Submissions
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      Full paginated data table
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </Link>

              <Link
                href="/dashboard/submissions"
                className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/60 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-foreground block">
                      Evaluate Submissions
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      Approve or reject projects
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          </div>

          {/* Evaluation Guidelines card */}
          <div className="rounded-2xl border border-border/60 bg-muted/20 p-5 space-y-2 text-xs text-muted-foreground">
            <h4 className="font-semibold text-foreground flex items-center gap-1.5">
              <HelpCircle className="h-4 w-4 text-primary" />
              Evaluation Criteria
            </h4>
            <p className="leading-relaxed">
              When reviewing a submission on the{" "}
              <strong>All Submissions</strong> page, ensure code repos build
              without errors and the live demo matches stated features.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
