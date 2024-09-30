"use server";

import { forgot, login, register, reset, verify } from "@/services/auth";
import { setCookie } from "@/lib/cookies";
import { IForgotPasswordRequest, IRegisterRequest } from "@/common/request/authRequest";

interface ILoginInput {
  email: string;
  password: string;
}

interface IResetPasswordRequest {
  email: string;
}

export async function loginAction({ email, password }: ILoginInput) {
  try {
    const response = await login(email, password);

    setCookie({ name: "accessToken", value: response.data?.accessToken ?? "", maxAge: 60 * 60 });
    setCookie({ name: "refreshToken", value: response.data?.refreshToken ?? "", maxAge: 60 * 60 * 24 * 7 });

    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, errors: error.response.data.errors };
  }
}

export async function registerAction(request: IRegisterRequest) {
  try {
    console.log(request);
    const response = await register(request);

    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, errors: error.response.data.errors };
  }
}

export async function resetPassword({ email }: IResetPasswordRequest) {
  try {
    const response = await reset(email);

    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, errors: error.response.data.errors };
  }
}

export async function forgotPassword({ token, newPassword, confirmPassword }: IForgotPasswordRequest) {
  try {
    const response = await forgot({ token, newPassword, confirmPassword });

    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, errors: error.response.data.errors };
  }
}

export async function verifyEmail(token: string) {
  try {
    const response = await verify(token);

    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, errors: error.response.data.errors };
  }
}
