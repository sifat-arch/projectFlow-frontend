"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Layers,
  Home,
  UploadCloud,
  LayoutDashboard,
  LogIn,
  UserPlus,
  LogOut,
  Menu,
  X,
  User as UserIcon,
} from "lucide-react";
import { useAuth } from "@/providers/authProvider";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const pathname = usePathname();
  const { user, role, isAuthenticated, isLoading, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Normalize role to uppercase for robust check
  const normalizedRole = role?.toUpperCase();
  const isStudent = normalizedRole === "STUDENT";
  const isMentor = normalizedRole === "MENTOR";

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LEFT: Brand / Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2.5 group transition-transform hover:scale-[1.02]"
              onClick={closeMobileMenu}
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
          </div>

          {/* MIDDLE: Navigation Routes */}
          <nav className="hidden md:flex items-center gap-1.5 bg-muted/40 p-1.5 rounded-full border border-border/50">
            {/* Home Route */}
            <Link
              href="/"
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                pathname === "/"
                  ? "bg-background text-foreground shadow-sm font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/60"
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>

            {/* Role-based Route: STUDENT -> Dashboard & Submit */}
            {isStudent && (
              <>
                <Link
                  href="/dashboard/my-submition"
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    pathname.startsWith("/dashboard/my-submition") ||
                    pathname.startsWith("/dashboard/my-submission")
                      ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/60"
                  }`}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                  <span className="ml-0.5 text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-full bg-primary-foreground/20 text-primary-foreground">
                    Student
                  </span>
                </Link>

                <Link
                  href="/dashboard/submit"
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    pathname === "/dashboard/submit" || pathname.startsWith("/submit")
                      ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/60"
                  }`}
                >
                  <UploadCloud className="h-4 w-4" />
                  <span>Submit</span>
                </Link>
              </>
            )}

            {/* Unauthenticated: Submit */}
            {!isAuthenticated && (
              <Link
                href="/submit"
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  pathname.startsWith("/submit")
                    ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/60"
                }`}
              >
                <UploadCloud className="h-4 w-4" />
                <span>Submit</span>
              </Link>
            )}

            {/* Role-based Route: MENTOR -> Dashboard */}
            {isMentor && (
              <Link
                href="/dashboard"
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  pathname.startsWith("/dashboard")
                    ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/60"
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
                <span className="ml-0.5 text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-full bg-primary-foreground/20 text-primary-foreground">
                  Mentor
                </span>
              </Link>
            )}
          </nav>

          {/* RIGHT: User Profile & Actions */}
          <div className="hidden md:flex items-center gap-3">
            {!isLoading && (
              <>
                {isAuthenticated && user ? (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-border/60 bg-muted/30">
                      <div className="h-7 w-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-medium text-xs">
                        {user.name ? (
                          user.name.charAt(0).toUpperCase()
                        ) : (
                          <UserIcon className="h-3.5 w-3.5" />
                        )}
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-semibold text-foreground line-clamp-1 max-w-[120px]">
                          {user.name}
                        </span>
                        <span className="text-[10px] font-medium text-primary uppercase tracking-wide">
                          {user.role}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={logout}
                      className="cursor-pointer gap-1.5 text-muted-foreground hover:text-destructive hover:border-destructive/30"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link
                      href="/login"
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "sm" }),
                        "gap-1.5 cursor-pointer",
                      )}
                    >
                      <LogIn className="h-4 w-4" />
                      <span>Sign In</span>
                    </Link>

                    <Link
                      href="/register"
                      className={cn(
                        buttonVariants({ size: "sm" }),
                        "gap-1.5 cursor-pointer",
                      )}
                    >
                      <UserPlus className="h-4 w-4" />
                      <span>Register</span>
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>

          {/* MOBILE: Menu Trigger */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE: Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <div className="space-y-1">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                pathname === "/"
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>

            {/* Role-based route for mobile: STUDENT */}
            {isStudent && (
              <>
                <Link
                  href="/dashboard/my-submition"
                  onClick={closeMobileMenu}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    pathname.startsWith("/dashboard/my-submition") ||
                    pathname.startsWith("/dashboard/my-submission")
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Student Dashboard</span>
                  </div>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-primary-foreground/20 text-primary-foreground">
                    Student
                  </span>
                </Link>

                <Link
                  href="/dashboard/submit"
                  onClick={closeMobileMenu}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    pathname === "/dashboard/submit" || pathname.startsWith("/submit")
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <UploadCloud className="h-4 w-4" />
                    <span>Submit Project</span>
                  </div>
                </Link>
              </>
            )}

            {!isAuthenticated && (
              <Link
                href="/submit"
                onClick={closeMobileMenu}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  pathname.startsWith("/submit")
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <UploadCloud className="h-4 w-4" />
                  <span>Submit Project</span>
                </div>
              </Link>
            )}

            {isMentor && (
              <Link
                href="/dashboard"
                onClick={closeMobileMenu}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  pathname.startsWith("/dashboard")
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Mentor Dashboard</span>
                </div>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-primary-foreground/20 text-primary-foreground">
                  Mentor
                </span>
              </Link>
            )}
          </div>

          <div className="pt-3 border-t border-border/60">
            {isAuthenticated && user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-muted/40">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-semibold text-xs">
                    {user.name ? (
                      user.name.charAt(0).toUpperCase()
                    ) : (
                      <UserIcon className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">
                      {user.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full justify-center gap-2 text-destructive hover:bg-destructive/10"
                  onClick={() => {
                    closeMobileMenu();
                    logout();
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log Out</span>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full justify-center gap-1.5 cursor-pointer",
                  )}
                >
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/register"
                  onClick={closeMobileMenu}
                  className={cn(
                    buttonVariants(),
                    "w-full justify-center gap-1.5 cursor-pointer",
                  )}
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
