"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { IUser } from "@/types";
import {
  clearAuthSession,
  getClientSession,
  setAuthSession,
} from "@/lib/auth-storage";
import { userLogout } from "@/api/auth.api";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: IUser | null;
  role: "STUDENT" | "MENTOR" | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: IUser) => void;
  logout: () => void;
  refreshAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<"STUDENT" | "MENTOR" | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const syncAuth = useCallback(() => {
    const session = getClientSession();
    setToken(session.token);
    setUser(session.user);
    setRole(session.role);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    syncAuth();

    // Listen for storage changes across tabs or custom dispatch
    const handleAuthChange = () => syncAuth();
    window.addEventListener("storage", handleAuthChange);
    window.addEventListener("auth-change", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleAuthChange);
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, [syncAuth]);

  const login = (authToken: string, authUser: IUser) => {
    setAuthSession(authToken, authUser);
    setToken(authToken);
    setUser(authUser);
    setRole(authUser.role);
  };

  const logout = async () => {
    try {
      await userLogout();
    } catch (error) {
      console.warn("Logout error:", error);
    } finally {
      clearAuthSession();
      setToken(null);
      setUser(null);
      setRole(null);
      router.push("/login");
      router.refresh();
    }
  };

  const value: AuthContextType = {
    user,
    role,
    token,
    isAuthenticated: Boolean(token && user),
    isLoading,
    login,
    logout,
    refreshAuth: syncAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
