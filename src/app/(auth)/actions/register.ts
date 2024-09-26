"use server";

import { IRegisterRequest } from "@/common/request/registerRequest";
import { register } from "@/services/auth";

export async function registerAction(request: IRegisterRequest) {
  try {
    console.log(request);
    const response = await register(request);

    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, errors: error.response.data.errors };
  }
}
