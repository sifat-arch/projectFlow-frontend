"use client";

import React, { useState } from "react";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import {
  FolderGit2,
  Code2,
  Database,
  Globe,
  FileText,
  UploadCloud,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Info,
  RotateCcw,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useCreateSubmission } from "@/hooks";
import {
  submissionValidationSchema,
  type SubmissionFormValues,
} from "@/validation";
import { useAuth } from "@/providers/authProvider";

export const SubmissionForm = () => {
  const { user } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);

  const { mutate: submitProject, isPending } = useCreateSubmission();

  const form = useForm({
    defaultValues: {
      projectName: "",
      frontendRepoUrl: "",
      backendRepoUrl: "",
      liveLink: "",
      description: "",
    } as SubmissionFormValues,
    validators: {
      onSubmit: submissionValidationSchema,
    },
    onSubmit: ({ value }) => {
      setServerError(null);
      setSubmissionSuccess(false);

      submitProject(
        {
          projectName: value.projectName.trim(),
          frontendRepoUrl: value.frontendRepoUrl.trim(),
          backendRepoUrl: value.backendRepoUrl?.trim() || undefined,
          liveLink: value.liveLink.trim(),
          description: value.description.trim(),
        },
        {
          onSuccess: (response) => {
            setSubmissionSuccess(true);
            toast.add({
              title: "Project Submitted Successfully!",
              description:
                response?.message ||
                "Your project has been recorded and is ready for mentor evaluation.",
              type: "success",
            });
            form.reset();
          },
          onError: (error: any) => {
            const errorMessage =
              error?.data?.message ||
              error?.message ||
              "Failed to submit project. Please verify your details and try again.";

            setServerError(errorMessage);

            toast.add({
              title: "Submission Error",
              description: errorMessage,
              type: "error",
            });
          },
        },
      );
    },
  });

  return (
    <div className="space-y-6">
      {/* Student user banner */}
      {user && (
        <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border/60 text-xs text-muted-foreground">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
              {user.name ? user.name.charAt(0).toUpperCase() : "S"}
            </div>
            <div>
              <span className="font-semibold text-foreground text-sm block">
                {user.name}
              </span>
              <span>{user.email}</span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-primary/15 text-primary font-semibold uppercase text-[10px] tracking-wider">
            Student Role
          </span>
        </div>
      )}

      {/* Success Banner if submitted */}
      {submissionSuccess && (
        <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5 text-emerald-500" />
            <div className="space-y-1">
              <h4 className="font-semibold text-sm">Submission Confirmed</h4>
              <p className="text-xs opacity-90">
                Your project was saved into ProjectFlow. Mentors will be able to
                review your repositories and deployment on their dashboard.
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/my-submition"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors self-start sm:self-auto shrink-0 shadow-xs"
          >
            <span>My Submissions</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}

      {/* Server Error Alert (e.g. Duplicate project name or rate limit) */}
      {serverError && (
        <div className="p-4 rounded-2xl border border-destructive/30 bg-destructive/10 text-destructive flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <h4 className="font-semibold text-sm">
              Cannot Complete Submission
            </h4>
            <p>{serverError}</p>
            {serverError.toLowerCase().includes("already submitted") && (
              <p className="opacity-80">
                Tip: You cannot submit two projects with the exact same name.
                Try changing the Project Name or updating your existing project.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Main Submission Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-5"
      >
        {/* 1. Project Name */}
        <form.Field name="projectName">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor={field.name}
                    className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5"
                  >
                    <FolderGit2 className="h-3.5 w-3.5 text-primary" />
                    Project Name <span className="text-destructive">*</span>
                  </label>
                  <span className="text-[11px] text-muted-foreground">
                    Min 3 characters
                  </span>
                </div>

                <div className="relative">
                  <Input
                    id={field.name}
                    name={field.name}
                    placeholder="e.g. Next.js Task Management Platform"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    className="h-11"
                  />
                </div>

                {isInvalid && (
                  <p className="text-xs text-destructive font-medium animate-in fade-in slide-in-from-top-1 duration-150">
                    {field.state.meta.errors[0]?.message ||
                      String(field.state.meta.errors[0] || "")}
                  </p>
                )}
              </div>
            );
          }}
        </form.Field>

        {/* 2. Frontend Repo URL */}
        <form.Field name="frontendRepoUrl">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor={field.name}
                    className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5"
                  >
                    <Code2 className="h-3.5 w-3.5 text-primary" />
                    Frontend Repository URL{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <span className="text-[11px] text-muted-foreground">
                    GitHub / GitLab URL
                  </span>
                </div>

                <Input
                  id={field.name}
                  name={field.name}
                  type="url"
                  placeholder="https://github.com/username/frontend-repo"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  className="h-11 font-mono text-xs"
                />

                {isInvalid && (
                  <p className="text-xs text-destructive font-medium animate-in fade-in slide-in-from-top-1 duration-150">
                    {field.state.meta.errors[0]?.message ||
                      String(field.state.meta.errors[0] || "")}
                  </p>
                )}
              </div>
            );
          }}
        </form.Field>

        {/* 3. Backend Repo URL (Optional) */}
        <form.Field name="backendRepoUrl">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor={field.name}
                    className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5"
                  >
                    <Database className="h-3.5 w-3.5 text-primary" />
                    Backend Repository URL
                    <span className="text-[10px] font-normal text-muted-foreground lowercase">
                      (optional)
                    </span>
                  </label>
                  <span className="text-[11px] text-muted-foreground/70">
                    Leave blank if frontend-only
                  </span>
                </div>

                <Input
                  id={field.name}
                  name={field.name}
                  type="url"
                  placeholder="https://github.com/username/backend-repo"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  className="h-11 font-mono text-xs"
                />

                {isInvalid && (
                  <p className="text-xs text-destructive font-medium animate-in fade-in slide-in-from-top-1 duration-150">
                    {field.state.meta.errors[0]?.message ||
                      String(field.state.meta.errors[0] || "")}
                  </p>
                )}
              </div>
            );
          }}
        </form.Field>

        {/* 4. Live Demo Link */}
        <form.Field name="liveLink">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor={field.name}
                    className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5"
                  >
                    <Globe className="h-3.5 w-3.5 text-primary" />
                    Live Demo Link <span className="text-destructive">*</span>
                  </label>
                  <span className="text-[11px] text-muted-foreground">
                    Public Deployment
                  </span>
                </div>

                <Input
                  id={field.name}
                  name={field.name}
                  type="url"
                  placeholder="https://my-project.vercel.app"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  className="h-11 font-mono text-xs"
                />

                {isInvalid && (
                  <p className="text-xs text-destructive font-medium animate-in fade-in slide-in-from-top-1 duration-150">
                    {field.state.meta.errors[0]?.message ||
                      String(field.state.meta.errors[0] || "")}
                  </p>
                )}
              </div>
            );
          }}
        </form.Field>

        {/* 5. Description */}
        <form.Field name="description">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor={field.name}
                    className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5"
                  >
                    <FileText className="h-3.5 w-3.5 text-primary" />
                    Description & Testing Guide{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <span className="text-[11px] text-muted-foreground">
                    Min 10 chars ({field.state.value?.length || 0})
                  </span>
                </div>

                <Textarea
                  id={field.name}
                  name={field.name}
                  rows={4}
                  placeholder="Detail your project's core functionality, technologies used, test account credentials (if required), and any special setup instructions for mentors..."
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                />

                {isInvalid && (
                  <p className="text-xs text-destructive font-medium animate-in fade-in slide-in-from-top-1 duration-150">
                    {field.state.meta.errors[0]?.message ||
                      String(field.state.meta.errors[0] || "")}
                  </p>
                )}
              </div>
            );
          }}
        </form.Field>

        {/* Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full sm:flex-1 h-11 text-sm font-semibold gap-2 shadow-md shadow-primary/20 cursor-pointer"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Submitting Project...</span>
              </>
            ) : (
              <>
                <UploadCloud className="h-4 w-4" />
                <span>Submit Project for Review</span>
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => {
              form.reset();
              setServerError(null);
            }}
            className="w-full sm:w-auto h-11 px-4 text-xs gap-1.5 cursor-pointer text-muted-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SubmissionForm;
