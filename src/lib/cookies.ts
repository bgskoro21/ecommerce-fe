import { cookies } from "next/headers";

interface CookieOptions {
  name: string;
  value: string;
  maxAge: number;
  path?: string;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

export function setCookie({ name, value, maxAge, path = "/", httpOnly = true, secure = process.env.NODE_ENV !== "development", sameSite = "strict" }: CookieOptions): void {
  cookies().set({
    name,
    value,
    httpOnly,
    secure,
    maxAge,
    path,
    sameSite,
  });
}
