"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FolderGit2, ArrowLeft, Loader2 } from "lucide-react";
import SubmissionsTable from "@/components/modules/dashboard/SubmissionsTable";
import { buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/providers/authProvider";

export default function SubmissionsPage() {
  const { role, isLoading } = useAuth();
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
          <span>Loading submissions...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link
              href="/dashboard"
              className="hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
            <span>/</span>
            <span className="font-semibold text-foreground">Submissions</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2.5">
            <FolderGit2 className="h-7 w-7 text-primary" />
            All Student Submissions
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
            Complete list of submitted projects with server-side pagination,
            search, and status filtering. Review codebases and approve or reject
            submissions in real-time.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <Link
            href="/dashboard"
            className={
              buttonVariants({ variant: "outline", size: "sm" }) +
              " gap-1.5 cursor-pointer text-xs"
            }
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Overview</span>
          </Link>
        </div>
      </div>

      {/* Full Submissions Data Table */}
      <section>
        <SubmissionsTable />
      </section>
    </div>
  );
}
