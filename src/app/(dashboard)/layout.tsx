"use client";

import React, { ReactNode } from "react";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import MentorSidebar from "@/components/layout/dashboard/MentorSidebar";
import StudentSidebar from "@/components/layout/dashboard/StudentSidebar";
import Link from "next/link";
import { ShieldCheck, GraduationCap, Loader2 } from "lucide-react";
import { useAuth } from "@/providers/authProvider";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { role, isLoading } = useAuth();
  const isStudent = role?.toUpperCase() === "STUDENT";

  return (
    <SidebarProvider defaultOpen={true}>
      {/* Conditionally render StudentSidebar or MentorSidebar */}
      {isStudent ? <StudentSidebar /> : <MentorSidebar />}

      <SidebarInset>
        {/* Top Navbar Header inside Dashboard */}
        <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border/60 bg-background/80 px-4 sm:px-6 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <div className="h-4 w-px bg-border/60 hidden sm:block" />
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground hidden sm:inline">
                Workspace
              </span>
              <span className="text-muted-foreground hidden sm:inline">/</span>
              {isLoading ? (
                <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Loading workspace...
                </span>
              ) : isStudent ? (
                <span className="font-semibold text-foreground flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  Student Dashboard
                </span>
              ) : (
                <span className="font-semibold text-foreground flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Mentor Dashboard
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border border-border/50 hover:bg-muted"
            >
              Public Site →
            </Link>
          </div>
        </header>

        {/* Dashboard Main Content Area */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
