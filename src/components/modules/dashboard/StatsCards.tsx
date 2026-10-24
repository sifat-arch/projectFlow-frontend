"use client";

import React from "react";
import {
  FolderGit2,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
  RefreshCw,
} from "lucide-react";
import { useSubmissionStats } from "@/hooks";

export const StatsCards = () => {
  const {
    data: statsResponse,
    isLoading,
    isError,
    refetch,
  } = useSubmissionStats();
  const stats = statsResponse?.data;

  const cardItems = [
    {
      title: "Total Projects",
      value: stats?.total ?? 0,
      description: "All submitted projects",
      icon: FolderGit2,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20",
      badge: "Overview",
    },
    {
      title: "Pending Reviews",
      value: stats?.pending ?? 0,
      description: "Awaiting mentor evaluation",
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      badge: "Action Required",
    },
    {
      title: "Approved Projects",
      value: stats?.approved ?? 0,
      description: "Accepted & verified",
      icon: CheckCircle2,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      badge: "Completed",
    },
    {
      title: "Rejected Projects",
      value: stats?.rejected ?? 0,
      description: "Requires fixes or resubmission",
      icon: XCircle,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      border: "border-rose-500/20",
      badge: "Needs Revision",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-6 rounded-2xl border border-border/60 bg-card/40 animate-pulse space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-24 bg-muted rounded" />
              <div className="h-9 w-9 bg-muted rounded-xl" />
            </div>
            <div className="h-8 w-16 bg-muted rounded mt-2" />
            <div className="h-3 w-32 bg-muted rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-5 rounded-2xl border border-rose-500/30 bg-rose-500/5 text-center flex items-center justify-between gap-4">
        <p className="text-sm text-rose-500 font-medium">
          Could not load live statistics.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 cursor-pointer"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cardItems.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.title}
            className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-5 shadow-xs transition-all hover:border-border hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {item.title}
              </span>
              <div
                className={`p-2.5 rounded-xl ${item.bg} ${item.color} ring-1 ring-inset ${item.border} transition-transform group-hover:scale-110`}
              >
                <Icon className="h-4 w-4" />
              </div>
            </div>

            <div className="mt-3">
              <div className="text-3xl font-extrabold tracking-tight text-foreground">
                {item.value}
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {item.description}
                </span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${item.bg} ${item.color}`}
                >
                  {item.badge}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
