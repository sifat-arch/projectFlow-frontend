"use client";

import React from "react";
import Link from "next/link";
import {
  UploadCloud,
  CheckCircle2,
  FileCheck2,
  Code2,
  ShieldCheck,
  HelpCircle,
  Sparkles,
  FolderGit2,
  ArrowRight,
} from "lucide-react";
import SubmissionForm from "@/components/form/SubmissionForm";
import { buttonVariants } from "@/components/ui/button";

const SubmitPage = () => {
  return (
    <div className="relative overflow-hidden py-10 sm:py-14">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4 animate-in fade-in duration-300">
            <UploadCloud className="h-3.5 w-3.5" />
            <span>Student Submission Portal</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Submit Your Project for Review
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed">
            Provide your project repositories, live URL, and overview. Your
            mentor will inspect code quality, assess live functionality, and
            provide feedback.
          </p>

          <div className="mt-4 flex items-center justify-center gap-3">
            <Link
              href="/dashboard/my-submition"
              className={
                buttonVariants({ variant: "outline", size: "sm" }) +
                " gap-1.5 cursor-pointer text-xs"
              }
            >
              <FolderGit2 className="h-3.5 w-3.5" />
              <span>Go to My Submissions</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

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
                    <strong className="text-foreground">
                      Public Repositories:
                    </strong>{" "}
                    Ensure your GitHub repos are public or accessible to
                    mentors.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-foreground">
                      Live Deployment:
                    </strong>{" "}
                    Verify the live demo link works without CORS or build
                    errors.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-foreground">Test Accounts:</strong>{" "}
                    If authentication is required in your app, provide test
                    credentials in the notes.
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
                  <span className="text-amber-500 font-medium">Pending</span>{" "}
                  state.
                </p>
                <p>
                  2. Mentors will clone and test your repositories, evaluate
                  requirements, and mark as either{" "}
                  <span className="text-emerald-500 font-medium">Approved</span>{" "}
                  or <span className="text-rose-500 font-medium">Rejected</span>
                  .
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
    </div>
  );
};

export default SubmitPage;
