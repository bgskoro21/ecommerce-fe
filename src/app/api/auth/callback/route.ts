// app/api/auth/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import cookie from "cookie";
import { googleLogin } from "@/services/auth";
import { setCookie } from "@/lib/cookies";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const code = searchParams.get("code");
  const returnedState = searchParams.get("state");

  if (!code) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/callback-handler?error=Authorization code not found.`);
  }

  if (!returnedState) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/callback-handler?error=State not found.`);
  }

  let parsedState;
  try {
    parsedState = JSON.parse(returnedState);
  } catch (error) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/callback-handler?error=Invalid state.`);
  }

  let { state, role } = parsedState;

  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = cookie.parse(cookieHeader);
  const storedState = cookies.oauth_state;

  if (!storedState || storedState !== state) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/callback-handler?error=Invalid state.`);
  }

  try {
    const backendResponse = await googleLogin(code, role);

    const { accessToken, refreshToken } = backendResponse.data || {};

    setCookie({ name: "accessToken", value: accessToken ?? "", maxAge: 60 * 60 });
    setCookie({ name: "refreshToken", value: refreshToken ?? "", maxAge: 60 * 60 * 24 * 7 });

    const deleteStateCookie = cookie.serialize("oauth_state", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0),
      path: "/",
      sameSite: "lax",
    });

    const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/callback-handler?success=true`);
    response.headers.set("Set-Cookie", `${deleteStateCookie}`);

    return response;
  } catch (error: any) {
    console.error("Error during Google login:", error.response?.data.errors || error.message);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/callback-handler?error=Login failed.`);
  }
}
