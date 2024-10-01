// app/api/auth/google/route.ts
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import cookie from "cookie";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  // Generate a unique state parameter (misalnya UUID) dan simpan di cookie untuk validasi nanti
  const state = uuidv4();

  const NEXT_PUBLIC_GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const role = searchParams.get("role") || "USER";

  if (!NEXT_PUBLIC_GOOGLE_CLIENT_ID || !NEXT_PUBLIC_BASE_URL) {
    return new NextResponse("Environment variables are not set.", { status: 500 });
  }

  const redirectUri = `${NEXT_PUBLIC_BASE_URL}/api/auth/callback`;

  const paramsObj = new URLSearchParams({
    client_id: NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    include_granted_scopes: "true",
    access_type: "offline",
    prompt: "consent",
    state: JSON.stringify({ state, role }), // Sertakan state dan role dalam parameter state
  });

  // Simpan state di HttpOnly cookie untuk validasi di callback
  const stateCookie = cookie.serialize("oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 10 * 60, // 10 menit
    path: "/",
    sameSite: "lax",
  });

  const response = NextResponse.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${paramsObj.toString()}`);
  response.headers.set("Set-Cookie", stateCookie);

  return response;
}
