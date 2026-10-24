import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();

  // Clear all auth-related cookies on the frontend
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("role");
  cookieStore.delete("user");

  return NextResponse.json({
    success: true,
    message: "Logged out from frontend session",
  });
}
