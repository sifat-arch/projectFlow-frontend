"use client";

import React from "react";
import Link from "next/link";
import {
  FolderGit2,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Code2,
  ExternalLink,
  User,
  Calendar,
} from "lucide-react";
import { useSubmissions } from "@/hooks";
import { buttonVariants } from "@/components/ui/button";
import type { ISubmission } from "@/types";

export const RecentSubmissions = () => {
  const { data: response, isLoading } = useSubmissions({
    page: 1,
    limit: 5,
  });

  const recentList = response?.data?.slice(0, 5) || [];

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="rounded-3xl border border-border/70 bg-card/60 backdrop-blur-xl p-6 shadow-xs space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-border/60">
        <div>
          <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
            <FolderGit2 className="h-5 w-5 text-primary" />
            Recent Submissions
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Latest student project submissions requiring evaluation.
          </p>
        </div>

        <Link
          href="/dashboard/submissions"
          className={
            buttonVariants({ variant: "outline", size: "sm" }) +
            " gap-1.5 cursor-pointer text-xs"
          }
        >
          <span>View All Table</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl border border-border/50 bg-muted/20 animate-pulse flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-muted" />
                <div className="space-y-1.5">
                  <div className="h-3.5 w-32 bg-muted rounded" />
                  <div className="h-3 w-44 bg-muted rounded" />
                </div>
              </div>
              <div className="h-6 w-20 bg-muted rounded-full" />
            </div>
          ))}
        </div>
      ) : recentList.length === 0 ? (
        <div className="py-10 text-center text-muted-foreground">
          <FolderGit2 className="h-8 w-8 mx-auto mb-2 text-muted-foreground/60" />
          <p className="text-sm font-medium">No submissions recorded yet</p>
          <p className="text-xs text-muted-foreground/80 mt-1">
            When students submit projects, they will appear here.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-border/50">
          {recentList.map((sub: ISubmission) => (
            <div
              key={sub.id}
              className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-muted/20 -mx-2 px-2 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0">
                  {sub.user?.name ? sub.user.name.charAt(0).toUpperCase() : "S"}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground text-sm truncate">
                      {sub.projectName}
                    </span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1 shrink-0">
                      <Calendar className="h-3 w-3" />
                      {formatDate(sub.createdAt)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    by {sub.user?.name || "Student"} ({sub.user?.email})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                {/* Status Badge */}
                {sub.status === "PENDING" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    <Clock className="h-3 w-3" />
                    Pending
                  </span>
                )}
                {sub.status === "APPROVED" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="h-3 w-3" />
                    Approved
                  </span>
                )}
                {sub.status === "REJECTED" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                    <XCircle className="h-3 w-3" />
                    Rejected
                  </span>
                )}

                {/* Direct Link to Submissions Page */}
                <Link
                  href="/dashboard/submissions"
                  className="text-xs font-medium text-primary hover:underline flex items-center gap-0.5"
                >
                  <span>Review</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentSubmissions;
