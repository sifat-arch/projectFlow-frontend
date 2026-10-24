"use client";

import React from "react";
import Link from "next/link";
import {
  UploadCloud,
  CheckCircle2,
  FileCheck2,
  ShieldCheck,
  HelpCircle,
  FolderGit2,
  ArrowRight,
} from "lucide-react";
import SubmissionForm from "@/components/form/SubmissionForm";
import { buttonVariants } from "@/components/ui/button";

export default function DashboardSubmitPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link
              href="/dashboard/my-submition"
              className="hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
            <span>/</span>
            <span className="font-semibold text-foreground">Submit Project</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2.5">
            <UploadCloud className="h-7 w-7 text-primary" />
            Submit Your Project for Review
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
            Provide your public GitHub repository URLs, live deployment link, and project description. Once submitted, mentors will test your app and provide feedback.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <Link
            href="/dashboard/my-submition"
            className={
              buttonVariants({ variant: "outline", size: "sm" }) +
              " gap-1.5 cursor-pointer text-xs"
            }
          >
            <FolderGit2 className="h-3.5 w-3.5" />
            <span>View My Submissions</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* 2. Grid with Form and Pre-submission Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Form (8 Cols) */}
        <div className="lg:col-span-8">
          <div className="rounded-3xl border border-border/80 bg-card/60 backdrop-blur-xl p-6 sm:p-8 shadow-xl shadow-black/5 dark:shadow-black/20">
            <SubmissionForm />
          </div>
        </div>

        {/* Guidelines & Checklist Sidebar (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Checklist */}
          <div className="rounded-2xl border border-border/70 bg-card/50 p-5 space-y-4">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <FileCheck2 className="h-4 w-4 text-primary" />
              Pre-Submission Checklist
            </h3>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Public Repositories:</strong>{" "}
                  Ensure your GitHub repos are public or accessible to mentors.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Live Deployment:</strong>{" "}
                  Verify the live demo link works without CORS or build errors.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Test Accounts:</strong>{" "}
                  If authentication is required in your app, provide test credentials in the notes.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Unique Name:</strong>{" "}
                  Choose a descriptive and unique project title.
                </span>
              </li>
            </ul>
          </div>

          {/* How evaluation works */}
          <div className="rounded-2xl border border-border/70 bg-card/50 p-5 space-y-3">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              Review Workflow
            </h3>
            <div className="space-y-2 text-xs text-muted-foreground leading-relaxed">
              <p>
                1. Your submission immediately appears on the{" "}
                <strong>Mentor Dashboard</strong> in{" "}
                <span className="text-amber-500 font-medium">Pending</span> state.
              </p>
              <p>
                2. Mentors will clone and test your repositories, evaluate requirements, and mark as either{" "}
                <span className="text-emerald-500 font-medium">Approved</span> or{" "}
                <span className="text-rose-500 font-medium">Rejected</span>.
              </p>
              <p>
                3. You can track status anytime under{" "}
                <strong>My Submissions</strong>.
              </p>
            </div>
          </div>

          {/* Help & Support */}
          <div className="p-4 rounded-2xl bg-muted/30 border border-border/50 flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <HelpCircle className="h-4 w-4" />
            </div>
            <div className="text-xs">
              <span className="font-semibold text-foreground block">
                Need assistance?
              </span>
              <span className="text-muted-foreground">
                Contact your batch mentor or support team.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
