import apiClient from "@/lib/apiClient";
import { IAuthResponse, ILoginPayload, IRegisterPayload } from "@/types";

export const userLogin = async (payload: ILoginPayload): Promise<IAuthResponse> => {
  return await apiClient<IAuthResponse>("/auth/login", {
    method: "POST",
    body: payload,
  });
};

export const userRegister = async (payload: IRegisterPayload): Promise<IAuthResponse> => {
  return await apiClient<IAuthResponse>("/auth/register", {
    method: "POST",
    body: payload,
  });
};
