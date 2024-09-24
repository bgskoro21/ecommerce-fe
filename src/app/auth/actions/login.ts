"use server";

import { login } from "@/services/auth";
import { setCookie } from "@/lib/cookies";

interface ILoginInput {
  email: string;
  password: string;
}

// Fungsi server action untuk login
export async function loginAction({ email, password }: ILoginInput) {
  try {
    const response = await login(email, password);

    setCookie({ name: "accessToken", value: response.data?.accessToken ?? "", maxAge: 60 * 60 });
    setCookie({ name: "accessToken", value: response.data?.accessToken ?? "", maxAge: 60 * 60 * 24 * 7 });

    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, errors: error.response.data.errors };
  }
}
