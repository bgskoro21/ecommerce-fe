import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken");
  const loginPath = "/login";
  const protectedPaths = ["/", "/profile"];

  // Redirect ke halaman login jika tidak ada token dan pengguna mengakses route yang dilindungi
  if (!token && protectedPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(loginPath, request.url));
  }

  // Jika sudah login, redirect dari halaman login ke halaman lain (misalnya home)
  if (token && request.nextUrl.pathname === loginPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Izinkan akses ke route yang tidak dilindungi
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/", "/profile"], // Atur matcher untuk halaman login dan halaman yang dilindungi
};
