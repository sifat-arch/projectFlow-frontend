"use client";

import React, { useState } from "react";
import {
  Code2,
  Database,
  Globe,
  ExternalLink,
  Check,
  X,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Filter,
  RefreshCw,
  Search,
  FolderGit2,
  Loader2,
  User,
  Calendar,
} from "lucide-react";
import { useSubmissions, useUpdateSubmissionStatus } from "@/hooks";
import type { ISubmission, SubmissionStatus } from "@/types";
import { Button } from "@/components/ui/button";

const STATUS_FILTERS: {
  label: string;
  value: SubmissionStatus | "ALL";
  countKey?: string;
}[] = [
  { label: "All Submissions", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
];

export const SubmissionsTable = () => {
  const [status, setStatus] = useState<SubmissionStatus | "ALL">("ALL");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Fetch submissions using TanStack Query
  const {
    data: response,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useSubmissions({
    page,
    limit,
    status: status === "ALL" ? undefined : status,
  });

  // Status update mutation
  const { mutate: updateStatus } = useUpdateSubmissionStatus();

  const submissions = response?.data || [];
  const meta = response?.meta || {
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 1,
  };

  // Optional client-side search filter (student name or project title)
  const filteredSubmissions = submissions.filter((item) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      item.projectName.toLowerCase().includes(term) ||
      item.user?.name.toLowerCase().includes(term) ||
      item.user?.email.toLowerCase().includes(term)
    );
  });

  const handleStatusChange = (newStatus: SubmissionStatus | "ALL") => {
    setStatus(newStatus);
    setPage(1); // Reset to page 1 on filter switch
  };

  const handleAction = (id: string, newStatus: SubmissionStatus) => {
    setUpdatingId(id);
    updateStatus(
      { id, status: newStatus },
      {
        onSettled: () => {
          setUpdatingId(null);
        },
      },
    );
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div id="submissions-section" className="space-y-4">
      {/* 1. Header with Controls & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm">
        <div>
          <div className="flex items-center gap-2">
            <FolderGit2 className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Student Submissions
            </h2>
            {isFetching && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground animate-pulse">
                <Loader2 className="h-3 w-3 animate-spin" />
                Syncing...
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Review code repositories, preview live deployments, and approve or
            reject submissions.
          </p>
        </div>

        {/* Filter Badges / Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-muted/50 border border-border/50">
          {STATUS_FILTERS.map((filter) => {
            const isActive = status === filter.value;
            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => handleStatusChange(filter.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-background text-foreground shadow-xs border border-border/60"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/40"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Search & Table Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-1">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by student or project..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-border/70 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-muted-foreground">
          <span>Rows per page:</span>
          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="rounded-lg border border-border/70 bg-background px-2 py-1 text-xs text-foreground cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>

          <Button
            variant="outline"
            size="icon-xs"
            onClick={() => refetch()}
            title="Refresh table"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`}
            />
          </Button>
        </div>
      </div>

      {/* 3. Main Data Table */}
      <div className="rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40 border-b border-border/60 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <tr>
                <th scope="col" className="px-5 py-3.5">
                  Student
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Project Details
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Repository Links
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Live Preview
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Status
                </th>
                <th scope="col" className="px-5 py-3.5 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border/50">
              {isLoading ? (
                // Skeleton Rows
                [1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-muted rounded-full" />
                        <div className="space-y-1.5">
                          <div className="h-3.5 w-24 bg-muted rounded" />
                          <div className="h-3 w-32 bg-muted rounded" />
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="space-y-1.5">
                        <div className="h-3.5 w-36 bg-muted rounded" />
                        <div className="h-3 w-48 bg-muted rounded" />
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="h-6 w-28 bg-muted rounded" />
                    </td>
                    <td className="px-5 py-4">
                      <div className="h-6 w-20 bg-muted rounded" />
                    </td>
                    <td className="px-5 py-4">
                      <div className="h-6 w-16 bg-muted rounded-full" />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="h-8 w-24 bg-muted rounded ml-auto" />
                    </td>
                  </tr>
                ))
              ) : isError ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-rose-500"
                  >
                    <p className="font-semibold text-sm">
                      Failed to load submissions.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Check that your backend server is running on port 5000.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => refetch()}
                      className="mt-3 gap-1.5"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      Retry Connection
                    </Button>
                  </td>
                </tr>
              ) : filteredSubmissions.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-16 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                      <div className="h-12 w-12 rounded-2xl bg-muted/60 flex items-center justify-center text-muted-foreground mb-3">
                        <FolderGit2 className="h-6 w-6" />
                      </div>
                      <p className="font-semibold text-foreground text-sm">
                        No submissions found
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 text-center">
                        {status !== "ALL"
                          ? `There are no submissions currently marked as ${status}.`
                          : "No students have submitted projects yet."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((sub: ISubmission) => {
                  const isRowUpdating = updatingId === sub.id;

                  return (
                    <tr
                      key={sub.id}
                      className="transition-colors hover:bg-muted/30 group"
                    >
                      {/* Student Info */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0">
                            {sub.user?.name ? (
                              sub.user.name.charAt(0).toUpperCase()
                            ) : (
                              <User className="h-4 w-4" />
                            )}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-semibold text-foreground text-sm truncate">
                              {sub.user?.name || "Student"}
                            </span>
                            <span className="text-xs text-muted-foreground truncate">
                              {sub.user?.email || "No email"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Project Details */}
                      <td className="px-5 py-4 max-w-xs">
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground text-sm line-clamp-1">
                            {sub.projectName}
                          </span>
                          <span
                            className="text-xs text-muted-foreground line-clamp-1 mt-0.5"
                            title={sub.description}
                          >
                            {sub.description}
                          </span>
                          <span className="text-[10px] text-muted-foreground/80 mt-1 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(sub.createdAt)}
                          </span>
                        </div>
                      </td>

                      {/* Repo Links */}
                      <td className="px-5 py-4">
                        <div className="flex flex-col gap-1.5">
                          {sub.frontendRepoUrl && (
                            <a
                              href={sub.frontendRepoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs text-foreground/80 hover:text-primary transition-colors font-mono"
                            >
                              <Code2 className="h-3.5 w-3.5 text-primary shrink-0" />
                              <span className="truncate max-w-[120px]">
                                Frontend Repo
                              </span>
                              <ExternalLink className="h-3 w-3 opacity-60" />
                            </a>
                          )}
                          {sub.backendRepoUrl && (
                            <a
                              href={sub.backendRepoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs text-foreground/80 hover:text-primary transition-colors font-mono"
                            >
                              <Database className="h-3.5 w-3.5 text-primary shrink-0" />
                              <span className="truncate max-w-[120px]">
                                Backend Repo
                              </span>
                              <ExternalLink className="h-3 w-3 opacity-60" />
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Live Link */}
                      <td className="px-5 py-4">
                        {sub.liveLink ? (
                          <a
                            href={sub.liveLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border/70 bg-background text-xs font-medium text-foreground hover:border-primary/50 hover:text-primary transition-all shadow-2xs"
                          >
                            <Globe className="h-3.5 w-3.5 text-primary" />
                            <span>Preview</span>
                            <ExternalLink className="h-3 w-3 opacity-60" />
                          </a>
                        ) : (
                          <span className="text-xs text-muted-foreground italic">
                            None
                          </span>
                        )}
                      </td>

                      {/* Status Badge */}
                      <td className="px-5 py-4">
                        {sub.status === "PENDING" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                            <Clock className="h-3 w-3" />
                            Pending
                          </span>
                        )}
                        {sub.status === "APPROVED" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            <CheckCircle2 className="h-3 w-3" />
                            Approved
                          </span>
                        )}
                        {sub.status === "REJECTED" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                            <XCircle className="h-3 w-3" />
                            Rejected
                          </span>
                        )}
                      </td>

                      {/* Approve / Reject Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="inline-flex items-center gap-1.5 justify-end">
                          {isRowUpdating ? (
                            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground px-3 py-1">
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              Updating...
                            </span>
                          ) : (
                            <>
                              {/* Approve Button */}
                              <button
                                type="button"
                                disabled={sub.status === "APPROVED"}
                                onClick={() => handleAction(sub.id, "APPROVED")}
                                title={
                                  sub.status === "APPROVED"
                                    ? "Already approved"
                                    : "Approve project"
                                }
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                  sub.status === "APPROVED"
                                    ? "opacity-40 cursor-not-allowed bg-muted text-muted-foreground"
                                    : "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white border border-emerald-500/30"
                                }`}
                              >
                                <Check className="h-3.5 w-3.5" />
                                <span>Approve</span>
                              </button>

                              {/* Reject Button */}
                              <button
                                type="button"
                                disabled={sub.status === "REJECTED"}
                                onClick={() => handleAction(sub.id, "REJECTED")}
                                title={
                                  sub.status === "REJECTED"
                                    ? "Already rejected"
                                    : "Reject project"
                                }
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                  sub.status === "REJECTED"
                                    ? "opacity-40 cursor-not-allowed bg-muted text-muted-foreground"
                                    : "bg-rose-500/10 text-rose-600 hover:bg-rose-500 hover:text-white border border-rose-500/30"
                                }`}
                              >
                                <X className="h-3.5 w-3.5" />
                                <span>Reject</span>
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* 4. Server-Side Pagination Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3.5 border-t border-border/60 bg-muted/20 text-xs text-muted-foreground">
          <div>
            Showing{" "}
            <span className="font-semibold text-foreground">
              {meta.total === 0 ? 0 : (meta.page - 1) * meta.limit + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-foreground">
              {Math.min(meta.page * meta.limit, meta.total)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">{meta.total}</span>{" "}
            submissions
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="xs"
              disabled={meta.page <= 1 || isLoading}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className="gap-1 cursor-pointer"
            >
              <ChevronLeft className="h-3 w-3" />
              <span>Previous</span>
            </Button>

            <span className="px-2 font-medium text-foreground">
              Page {meta.page} of {meta.totalPage || 1}
            </span>

            <Button
              variant="outline"
              size="xs"
              disabled={meta.page >= meta.totalPage || isLoading}
              onClick={() => setPage((p) => Math.min(p + 1, meta.totalPage))}
              className="gap-1 cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionsTable;
