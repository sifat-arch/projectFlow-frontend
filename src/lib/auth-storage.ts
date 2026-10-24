import { IUser } from "@/types";

export const AUTH_TOKEN_KEY = "accessToken";
export const AUTH_USER_KEY = "user";
export const AUTH_ROLE_KEY = "role";

/**
 * Helper to get a cookie value by name on the client
 */
export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^|;\\s*)(${name})=([^;]*)`));
  return match ? decodeURIComponent(match[3]) : null;
}

/**
 * Save auth data into both localStorage and document.cookie
 * Next.js middleware requires cookies because localStorage is inaccessible on the server.
 */
export function setAuthSession(token: string, user: IUser) {
  if (typeof window === "undefined") return;

  const maxAge = 7 * 24 * 60 * 60; // 7 days in seconds
  const role = user.role || "STUDENT";

  // 1. LocalStorage
  try {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    localStorage.setItem(AUTH_ROLE_KEY, role);
  } catch (err) {
    console.warn("Failed to set localStorage", err);
  }

  // 2. Cookies (accessible to Next.js middleware)
  document.cookie = `${AUTH_TOKEN_KEY}=${encodeURIComponent(token)}; path=/; max-age=${maxAge}; SameSite=Lax`;
  document.cookie = `${AUTH_ROLE_KEY}=${encodeURIComponent(role)}; path=/; max-age=${maxAge}; SameSite=Lax`;
  document.cookie = `${AUTH_USER_KEY}=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=${maxAge}; SameSite=Lax`;

  // Dispatch custom event for reactive in-tab updates
  window.dispatchEvent(new Event("auth-change"));
}

/**
 * Clear auth data from localStorage and cookies
 */
export function clearAuthSession() {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    localStorage.removeItem(AUTH_ROLE_KEY);
  } catch (err) {
    console.warn("Failed to clear localStorage", err);
  }

  // Clear cookies with expired max-age
  document.cookie = `${AUTH_TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`;
  document.cookie = `${AUTH_ROLE_KEY}=; path=/; max-age=0; SameSite=Lax`;
  document.cookie = `${AUTH_USER_KEY}=; path=/; max-age=0; SameSite=Lax`;

  window.dispatchEvent(new Event("auth-change"));
}

/**
 * Read current session from localStorage (with cookie fallback)
 */
export function getClientSession(): {
  token: string | null;
  user: IUser | null;
  role: "STUDENT" | "MENTOR" | null;
} {
  if (typeof window === "undefined") {
    return { token: null, user: null, role: null };
  }

  let token = localStorage.getItem(AUTH_TOKEN_KEY);
  let userRaw = localStorage.getItem(AUTH_USER_KEY);
  let roleRaw = localStorage.getItem(AUTH_ROLE_KEY) as
    | "STUDENT"
    | "MENTOR"
    | null;

  // Fallback to cookie if localStorage is empty
  if (!token) {
    token = getCookie(AUTH_TOKEN_KEY);
  }
  if (!userRaw) {
    userRaw = getCookie(AUTH_USER_KEY);
  }
  if (!roleRaw) {
    roleRaw = getCookie(AUTH_ROLE_KEY) as "STUDENT" | "MENTOR" | null;
  }

  let user: IUser | null = null;
  if (userRaw) {
    try {
      user = JSON.parse(userRaw);
    } catch {
      user = null;
    }
  }

  const role = roleRaw || user?.role || null;

  return { token, user, role };
}
