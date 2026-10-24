"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  FolderGit2,
  UploadCloud,
  CheckCircle2,
  Clock,
  XCircle,
  ExternalLink,
  Code2,
  Database,
  Calendar,
  Layers,
  ArrowRight,
  Filter,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/providers/authProvider";
import { useMySubmissions } from "@/hooks";
import { Button, buttonVariants } from "@/components/ui/button";
import type { SubmissionStatus } from "@/types";

export default function MySubmissionsPage() {
  const { user } = useAuth();
  const { data: response, isLoading, isError, refetch, isFetching } = useMySubmissions();
  const [selectedStatus, setSelectedStatus] = useState<SubmissionStatus | "ALL">("ALL");

  const submissions = useMemo(() => response?.data || [], [response]);

  const stats = useMemo(() => {
    const total = submissions.length;
    const pending = submissions.filter((s) => s.status === "PENDING").length;
    const approved = submissions.filter((s) => s.status === "APPROVED").length;
    const rejected = submissions.filter((s) => s.status === "REJECTED").length;
    return { total, pending, approved, rejected };
  }, [submissions]);

  const filteredSubmissions = useMemo(() => {
    if (selectedStatus === "ALL") return submissions;
    return submissions.filter((s) => s.status === selectedStatus);
  }, [submissions, selectedStatus]);

  const getStatusBadge = (status: SubmissionStatus) => {
    switch (status) {
      case "APPROVED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Approved
          </span>
        );
      case "REJECTED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/25">
            <XCircle className="h-3.5 w-3.5" />
            Rejected
          </span>
        );
      case "PENDING":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25">
            <Clock className="h-3.5 w-3.5" />
            Pending Review
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* 1. Header Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-linear-to-r from-primary/10 via-primary/5 to-transparent p-6 sm:p-8 shadow-xs">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-48 w-48 rounded-full bg-primary/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 border border-primary/25 text-primary text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Student Submissions Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              My Submissions
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl">
              Track the status of all your submitted projects, review mentor feedback, and access your code repository and deployment links.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              disabled={isFetching}
              className="gap-1.5 cursor-pointer text-xs"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </Button>
            <Link
              href="/dashboard/submit"
              className={buttonVariants({ size: "sm" }) + " gap-1.5 shadow-xs cursor-pointer"}
            >
              <UploadCloud className="h-4 w-4" />
              <span>Submit New Project</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Overview Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Card */}
        <div className="p-4 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm space-y-1">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-medium">
            <span>Total Submitted</span>
            <FolderGit2 className="h-4 w-4 text-primary" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            {isLoading ? "..." : stats.total}
          </div>
          <span className="text-[11px] text-muted-foreground">All time submissions</span>
        </div>

        {/* Pending Card */}
        <div className="p-4 rounded-2xl border border-amber-500/25 bg-amber-500/5 backdrop-blur-sm space-y-1">
          <div className="flex items-center justify-between text-amber-600 dark:text-amber-400 text-xs font-medium">
            <span>In Review</span>
            <Clock className="h-4 w-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 tracking-tight">
            {isLoading ? "..." : stats.pending}
          </div>
          <span className="text-[11px] text-muted-foreground">Awaiting mentor check</span>
        </div>

        {/* Approved Card */}
        <div className="p-4 rounded-2xl border border-emerald-500/25 bg-emerald-500/5 backdrop-blur-sm space-y-1">
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 text-xs font-medium">
            <span>Approved</span>
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight">
            {isLoading ? "..." : stats.approved}
          </div>
          <span className="text-[11px] text-muted-foreground">Passed requirements</span>
        </div>

        {/* Rejected Card */}
        <div className="p-4 rounded-2xl border border-rose-500/25 bg-rose-500/5 backdrop-blur-sm space-y-1">
          <div className="flex items-center justify-between text-rose-600 dark:text-rose-400 text-xs font-medium">
            <span>Needs Revision</span>
            <XCircle className="h-4 w-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 dark:text-rose-400 tracking-tight">
            {isLoading ? "..." : stats.rejected}
          </div>
          <span className="text-[11px] text-muted-foreground">Requires changes</span>
        </div>
      </div>

      {/* 3. Filters and Tabs */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-muted/40 border border-border/50 text-xs font-medium">
          <button
            type="button"
            onClick={() => setSelectedStatus("ALL")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              selectedStatus === "ALL"
                ? "bg-background text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All ({stats.total})
          </button>
          <button
            type="button"
            onClick={() => setSelectedStatus("PENDING")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              selectedStatus === "PENDING"
                ? "bg-amber-500 text-white shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Pending ({stats.pending})
          </button>
          <button
            type="button"
            onClick={() => setSelectedStatus("APPROVED")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              selectedStatus === "APPROVED"
                ? "bg-emerald-600 text-white shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Approved ({stats.approved})
          </button>
          <button
            type="button"
            onClick={() => setSelectedStatus("REJECTED")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              selectedStatus === "REJECTED"
                ? "bg-rose-600 text-white shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Rejected ({stats.rejected})
          </button>
        </div>

        <span className="text-xs text-muted-foreground">
          Showing {filteredSubmissions.length} of {stats.total} submissions
        </span>
      </div>

      {/* 4. Submissions List View */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-border/60 bg-card/40 animate-pulse space-y-4"
            >
              <div className="h-6 w-1/3 bg-muted rounded-md" />
              <div className="h-4 w-2/3 bg-muted rounded-md" />
              <div className="h-8 w-1/2 bg-muted rounded-md" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="p-8 rounded-3xl border border-destructive/30 bg-destructive/5 text-center space-y-3">
          <p className="text-sm text-destructive font-medium">
            Failed to load your submissions. Please ensure you are logged in and try again.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="cursor-pointer gap-1.5"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Try Again
          </Button>
        </div>
      ) : filteredSubmissions.length === 0 ? (
        <div className="p-12 rounded-3xl border border-dashed border-border/80 bg-card/30 text-center space-y-4">
          <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <UploadCloud className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-foreground">
              {selectedStatus === "ALL"
                ? "No submissions found yet"
                : `No ${selectedStatus.toLowerCase()} submissions found`}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
              {selectedStatus === "ALL"
                ? "You haven't submitted any projects yet. Submit your repository and live demo links to get reviewed by your mentors."
                : `You don't have any projects currently in ${selectedStatus.toLowerCase()} status.`}
            </p>
          </div>
          {selectedStatus === "ALL" && (
            <Link
              href="/dashboard/submit"
              className={buttonVariants({ size: "sm" }) + " gap-1.5 cursor-pointer"}
            >
              <UploadCloud className="h-4 w-4" />
              <span>Submit Your First Project</span>
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSubmissions.map((submission) => {
            const formattedDate = new Date(submission.createdAt).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              },
            );

            return (
              <div
                key={submission.id}
                className="rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xl p-5 sm:p-6 transition-all hover:border-primary/40 hover:shadow-md space-y-4"
              >
                {/* Top row: Project Name + Status Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/50">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <FolderGit2 className="h-4 w-4 text-primary shrink-0" />
                      <h2 className="text-lg font-bold text-foreground tracking-tight">
                        {submission.projectName}
                      </h2>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Submitted on {formattedDate}</span>
                    </div>
                  </div>

                  <div>{getStatusBadge(submission.status)}</div>
                </div>

                {/* Middle: Description */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {submission.description}
                </p>

                {/* Bottom row: Links (Live Demo, Frontend Repo, Backend Repo) */}
                <div className="pt-2 flex flex-wrap items-center gap-2.5">
                  {submission.liveLink && (
                    <a
                      href={submission.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/70 bg-muted/40 hover:bg-muted text-xs font-medium text-foreground transition-colors group cursor-pointer"
                    >
                      <ExternalLink className="h-3.5 w-3.5 text-primary group-hover:scale-110 transition-transform" />
                      <span>Live Demo</span>
                    </a>
                  )}

                  {submission.frontendRepoUrl && (
                    <a
                      href={submission.frontendRepoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/70 bg-muted/40 hover:bg-muted text-xs font-medium text-foreground transition-colors group cursor-pointer"
                    >
                      <Code2 className="h-3.5 w-3.5 text-primary group-hover:scale-110 transition-transform" />
                      <span>Frontend Repository</span>
                    </a>
                  )}

                  {submission.backendRepoUrl && (
                    <a
                      href={submission.backendRepoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/70 bg-muted/40 hover:bg-muted text-xs font-medium text-foreground transition-colors group cursor-pointer"
                    >
                      <Database className="h-3.5 w-3.5 text-primary group-hover:scale-110 transition-transform" />
                      <span>Backend Repository</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
