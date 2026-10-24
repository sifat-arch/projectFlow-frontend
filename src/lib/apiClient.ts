import { ofetch } from "ofetch";
import { getCookie } from "./auth-storage";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

const apiClient = ofetch.create({
  baseURL: BASE_URL,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
  onRequest({ options }) {
    if (typeof window !== "undefined") {
      let token = localStorage.getItem("accessToken");
      if (!token) {
        token = getCookie("accessToken");
      }
      if (token) {
        const headers = new Headers(options.headers);
        if (!headers.has("Authorization")) {
          headers.set("Authorization", `Bearer ${token}`);
        }
        options.headers = headers;
      }
    }
  },
});

export default apiClient;
