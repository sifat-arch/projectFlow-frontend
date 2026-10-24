"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Layers,
  UploadCloud,
  FolderGit2,
  Globe,
  LogOut,
  User as UserIcon,
  GraduationCap,
} from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/providers/authProvider";

export const StudentSidebar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { setOpenMobile } = useSidebar();

  const handleNavClick = () => {
    setOpenMobile(false);
  };

  const isSubmitActive =
    pathname === "/dashboard/submit" || pathname === "/submit";
  const isMySubmissionsActive =
    pathname === "/dashboard/my-submition" ||
    pathname === "/dashboard/my-submission" ||
    pathname === "/my-submition" ||
    pathname === "/my-submission";
  const isPublicHomeActive = pathname === "/";

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      {/* 1. Header with Logo */}
      <SidebarHeader>
        <Link
          href="/"
          onClick={handleNavClick}
          className="flex items-center gap-3 px-1 py-1 group"
        >
          <div className="h-9 w-9 shrink-0 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-sm transition-transform group-hover:scale-105">
            <Layers className="h-5 w-5" />
          </div>
          <div className="flex flex-col overflow-hidden group-data-[collapsible=icon]:hidden">
            <span className="font-bold text-base tracking-tight text-foreground flex items-center gap-1">
              Project<span className="text-primary">Flow</span>
            </span>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground -mt-0.5 flex items-center gap-1">
              <GraduationCap className="h-3.5 w-3.5 text-primary inline" />
              Student Portal
            </span>
          </div>
        </Link>
      </SidebarHeader>

      {/* 2. Navigation Content */}
      <SidebarContent>
        {/* Core Student Routes */}
        <SidebarGroup>
          <SidebarGroupLabel>Student Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* 1. Submit Project Route */}
              <SidebarMenuItem>
                <Link
                  href="/dashboard/submit"
                  onClick={handleNavClick}
                  className="w-full block"
                >
                  <SidebarMenuButton isActive={isSubmitActive}>
                    <UploadCloud className="h-4 w-4 shrink-0" />
                    <span className="group-data-[collapsible=icon]:hidden">
                      Submit Project
                    </span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>

              {/* 2. My Submissions Route */}
              <SidebarMenuItem>
                <Link
                  href="/dashboard/my-submition"
                  onClick={handleNavClick}
                  className="w-full block"
                >
                  <SidebarMenuButton isActive={isMySubmissionsActive}>
                    <FolderGit2 className="h-4 w-4 shrink-0" />
                    <span className="group-data-[collapsible=icon]:hidden">
                      My Submissions
                    </span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Links Group */}
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link
                  href="/"
                  onClick={handleNavClick}
                  className="w-full block"
                >
                  <SidebarMenuButton isActive={isPublicHomeActive}>
                    <Globe className="h-4 w-4 shrink-0" />
                    <span className="group-data-[collapsible=icon]:hidden">
                      Public Home
                    </span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* 3. Footer with Profile & Logout */}
      <SidebarFooter>
        <div className="flex flex-col gap-2">
          {/* User profile card */}
          <div className="flex items-center gap-3 p-2 rounded-xl bg-muted/40 border border-border/50 overflow-hidden">
            <div className="h-9 w-9 shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
              {user?.name ? (
                user.name.charAt(0).toUpperCase()
              ) : (
                <UserIcon className="h-4 w-4" />
              )}
            </div>
            <div className="flex flex-col overflow-hidden min-w-0 group-data-[collapsible=icon]:hidden">
              <span className="text-xs font-semibold text-foreground truncate">
                {user?.name || "Student User"}
              </span>
              <span className="text-[10px] text-muted-foreground truncate">
                {user?.email || "student@projectflow.dev"}
              </span>
            </div>
          </div>

          {/* Logout Action */}
          <SidebarMenuButton
            onClick={logout}
            className="text-destructive hover:bg-destructive/10 hover:text-destructive gap-2.5 justify-start cursor-pointer"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span className="group-data-[collapsible=icon]:hidden">
              Sign Out
            </span>
          </SidebarMenuButton>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default StudentSidebar;
