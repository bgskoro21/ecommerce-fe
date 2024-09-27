"use server";

import { verify } from "@/services/auth";

export async function verifyEmail(token: string) {
  try {
    const response = await verify(token);

    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, errors: error.response.data.errors };
  }
}
