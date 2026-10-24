"use client";

import React from "react";
import Link from "next/link";
import {
  Layers,
  UploadCloud,
  LayoutDashboard,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/providers/authProvider";

const HomePage = () => {
  const { user, role, isAuthenticated } = useAuth();
  const normalizedRole = role?.toUpperCase();

  return (
    <div className="relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wide uppercase mb-6 animate-pulse">
          <Layers className="h-3.5 w-3.5" />
          <span>Next-Gen Project Evaluation Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
          Manage and Review <br />
          <span className="bg-linear-to-r from-primary via-teal-500 to-emerald-500 bg-clip-text text-transparent">
            Student Projects Seamlessly
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          ProjectFlow connects students and mentors in one unified flow.
          Students easily submit their projects, while mentors review code,
          track progress, and grade with confidence.
        </p>

        {/* Dynamic CTA depending on Auth & Role */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {isAuthenticated ? (
            <>
              {normalizedRole === "STUDENT" ? (
                <Link
                  href="/submit"
                  className={
                    buttonVariants({ size: "lg" }) +
                    " gap-2 shadow-lg shadow-primary/20"
                  }
                >
                  <UploadCloud className="h-5 w-5" />
                  <span>Go to Submit Project</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <Link
                  href="/dashboard"
                  className={
                    buttonVariants({ size: "lg" }) +
                    " gap-2 shadow-lg shadow-primary/20"
                  }
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Go to Mentor Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </>
          ) : (
            <>
              <Link
                href="/register"
                className={
                  buttonVariants({ size: "lg" }) +
                  " gap-2 shadow-lg shadow-primary/20"
                }
              >
                <span>Get Started as Student</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className={buttonVariants({ size: "lg", variant: "outline" })}
              >
                <span>Sign In</span>
              </Link>
            </>
          )}
        </div>

        {/* Blog / How It Works */}
        <section className="mt-20 text-left" aria-labelledby="how-it-works-title">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              The ProjectFlow guide
            </p>
            <h2
              id="how-it-works-title"
              className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
            >
              How ProjectFlow works
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              From the first submission to the final review, everything stays in one clear, connected workflow.
            </p>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-slate-200 border-y border-slate-200">
            <article className="py-8 sm:py-10">
              <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">01 · The platform</p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground">The Purpose of ProjectFlow</h3>
              <p className="mt-4 text-base text-muted-foreground leading-7">
                Project work often gets scattered across chat links, messages, and separate documents. Important submissions can be difficult to find, and feedback can get lost in the conversation. ProjectFlow brings that process together in one organized place, giving students and mentors a unified flow for sharing code, reviewing work, and completing evaluations.
              </p>
            </article>

            <article className="py-8 sm:py-10">
              <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">02 · Student guide</p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground">How to Submit Your Project</h3>
              <p className="mt-4 text-base text-muted-foreground leading-7">
                To submit your work, open the project submission form and provide the assignment title, your GitHub repository URL, and a link to the live preview. Use the project notes field to explain your approach, highlight anything your mentor should know, or mention areas where you would value feedback. Check that the links are correct, then submit the form for review.
              </p>
            </article>

            <article className="py-8 sm:py-10">
              <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">03 · Mentor guide</p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground">Mentor Review &amp; Decisions</h3>
              <p className="mt-4 text-base text-muted-foreground leading-7">
                Mentors can find submitted projects in their dashboard, where the repository and live preview are ready to review. After evaluating the work, a mentor leaves structured feedback so the student understands what is working well and what could be improved. The mentor then records a decision: mark the submission as <span className="font-medium text-foreground">Accepted</span> or choose <span className="font-medium text-foreground">Request Revision</span> when further changes are needed.
              </p>
            </article>

            <article className="py-8 sm:py-10">
              <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">04 · Student guide</p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground">Where Students Can Track Submissions</h3>
              <p className="mt-4 text-base text-muted-foreground leading-7">
                Students can follow progress from the Student Dashboard by opening the <span className="font-medium text-foreground">My Submissions</span> tab. Each project displays its current status badge—<span className="font-medium text-foreground">Pending</span>, <span className="font-medium text-foreground">Accepted</span>, or <span className="font-medium text-foreground">Revision Needed</span>—so it is easy to see what needs attention. Open a submission to read the mentor’s feedback and decide on the next step.
              </p>
            </article>
          </div>
        </section>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 text-left">
          <div className="p-6 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm">
            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <UploadCloud className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-lg text-foreground">
              For Students
            </h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Submit your GitHub repositories and live links directly. Receive
              clear mentor reviews to iterate and improve.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-lg text-foreground">
              For Mentors
            </h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Access an organized dashboard of student submissions, review code,
              provide structured feedback, and mark statuses.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm">
            <div className="h-10 w-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center mb-4">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-lg text-foreground">
              Role-Protected Routes
            </h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Protected by Next.js Edge Middleware ensuring students only access
              submission forms and mentors only access dashboards.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
