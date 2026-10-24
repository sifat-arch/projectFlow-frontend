import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface JwtPayload {
  userId?: string;
  name?: string;
  email?: string;
  role?: string;
  exp?: number;
  [key: string]: unknown;
}

/**
 * Edge-compatible JWT parser to extract payload without external node dependencies
 */
function parseJwt(token: string): JwtPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );

    const parsed: JwtPayload = JSON.parse(jsonPayload);

    // If token has expired, consider it invalid
    if (parsed.exp && parsed.exp * 1000 < Date.now()) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("accessToken")?.value;
  const roleCookie = request.cookies.get("role")?.value;

  const jwtData = token ? parseJwt(token) : null;
  // If token is present but expired / unparseable, user is not authenticated
  const isValidAuth = Boolean(token && (jwtData || roleCookie));
  const userRole = (jwtData?.role || roleCookie || "").toUpperCase();

  const isPublicSubmit = pathname.startsWith("/submit");
  const isPublicMySubmission =
    pathname.startsWith("/my-submition") ||
    pathname.startsWith("/my-submission");

  const isStudentDashboardRoute =
    pathname.startsWith("/dashboard/submit") ||
    pathname.startsWith("/dashboard/my-submition") ||
    pathname.startsWith("/dashboard/my-submission");

  const isMentorOnlyRoute = pathname.startsWith("/dashboard/submissions");

  // Require authentication for all dashboard and submission routes
  if (
    pathname.startsWith("/dashboard") ||
    isPublicSubmit ||
    isPublicMySubmission
  ) {
    if (!isValidAuth) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 1. Role-based restrictions for STUDENT
  if (userRole === "STUDENT") {
    // If student accesses the root /dashboard, send them to their submissions
    if (pathname === "/dashboard" || pathname === "/dashboard/") {
      return NextResponse.redirect(new URL("/dashboard/my-submition", request.url));
    }
    // If student attempts to access mentor-only all submissions route
    if (isMentorOnlyRoute) {
      return NextResponse.redirect(new URL("/dashboard/my-submition", request.url));
    }
  }

  // 2. Role-based restrictions for MENTOR
  if (userRole === "MENTOR") {
    // If mentor attempts to access student submission forms or student's my-submission
    if (isPublicSubmit || isPublicMySubmission || isStudentDashboardRoute) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/submit/:path*",
    "/my-submition/:path*",
    "/my-submission/:path*",
    "/dashboard/:path*",
  ],
};
