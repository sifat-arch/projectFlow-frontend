import apiClient from "@/lib/apiClient";
import type { IAuthResponse, ILoginPayload, IRegisterPayload } from "@/types";

export const userLogin = async (
  payload: ILoginPayload,
): Promise<IAuthResponse> => {
  return await apiClient<IAuthResponse>("/auth/login", {
    method: "POST",
    body: payload,
  });
};

export const userRegister = async (
  payload: IRegisterPayload,
): Promise<IAuthResponse> => {
  return await apiClient<IAuthResponse>("/auth/register", {
    method: "POST",
    body: payload,
  });
};

export const userLogout = async (): Promise<void> => {
  // 1. Tell backend to clear its httpOnly cookies
  try {
    await apiClient("/auth/logout", {
      method: "POST",
    });
  } catch (error) {
    console.warn("Backend logout request warning:", error);
  }

  // 2. Tell Next.js route handler to clear frontend cookies
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
  } catch (error) {
    console.warn("Frontend cookie clear warning:", error);
  }
};
