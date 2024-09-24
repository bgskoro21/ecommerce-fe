import { IApiResponse } from "@/common/types/apiResponse";
import apiClient from "./api";
import { AxiosError } from "axios";
import { cookies } from "next/headers";

interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export async function login(email: string, password: string): Promise<IApiResponse<ILoginResponse>> {
  try {
    const response = await apiClient.post<IApiResponse<ILoginResponse>>("/users/login", { email, password });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError;
  }
}

export async function refreshAccessToken(): Promise<IApiResponse<ILoginResponse>> {
  try {
    const response = await apiClient.post("/users/refresh");

    console.log(response);

    // cookies().set({
    //   name: "access_token",
    //   value: response.data?.accessToken ?? "",
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV !== "development",
    //   maxAge: 60 * 60, // 1 hour
    //   path: "/",
    //   sameSite: "strict",
    // });

    // cookies().set({
    //   name: "refresh_token",
    //   value: response.data?.refreshToken ?? "",
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV !== "development",
    //   maxAge: 60 * 60, // 1 hour
    //   path: "/",
    //   sameSite: "strict",
    // });

    return response.data;
  } catch (error) {
    console.error("Gagal refresh token:", error);
    throw error;
  }
}
