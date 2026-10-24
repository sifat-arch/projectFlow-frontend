"use client";

import React from "react";
import Link from "next/link";
import {
  Layers,
  Code2,
  Globe,
  Share2,
  Mail,
  Heart,
  ArrowUpRight,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/60 bg-muted/20 backdrop-blur-sm transition-colors mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 group inline-flex"
            >
              <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center ring-1 ring-primary/20 shadow-sm group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
                <Layers className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight text-foreground flex items-center gap-1.5">
                  Project<span className="text-primary">Flow</span>
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground -mt-1">
                  Portal
                </span>
              </div>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Empowering students to submit innovative projects and mentors to
              provide actionable feedback with ease and precision.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="h-8 w-8 rounded-lg border border-border/60 bg-background/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
                aria-label="GitHub"
              >
                <Code2 className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="h-8 w-8 rounded-lg border border-border/60 bg-background/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
                aria-label="Twitter"
              >
                <Share2 className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="h-8 w-8 rounded-lg border border-border/60 bg-background/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
                aria-label="LinkedIn"
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                href="mailto:support@projectflow.dev"
                className="h-8 w-8 rounded-lg border border-border/60 bg-background/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
                aria-label="Email support"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/"
                  className="hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/submit"
                  className="hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  Submit Project
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  Mentor Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  Account Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Roles & Features */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              For Users
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <span className="text-foreground font-medium text-xs block">
                  Student Role
                </span>
                Submit projects, track evaluation status, and view mentor
                feedback.
              </li>
              <li className="pt-1">
                <span className="text-foreground font-medium text-xs block">
                  Mentor Role
                </span>
                Review submissions, assess code quality, and provide guidance.
              </li>
            </ul>
          </div>

          {/* Resources & Docs */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="#guidelines"
                  className="hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  Submission Rules
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  FAQ & Help
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="#api"
                  className="hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  API Documentation
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p className="flex items-center gap-1">
            © 2026 ProjectFlow. Built with{" "}
            <Heart className="h-3 w-3 text-destructive fill-destructive inline" />{" "}
            for students and mentors.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#security"
              className="hover:text-foreground transition-colors"
            >
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
