import { IApiResponse } from "@/common/types/apiResponse";
import apiClient from "./api";
import { AxiosError } from "axios";
import { IRegisterRequest } from "@/common/request/registerRequest";

interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

interface IRegisterResponse {
  name: string;
  email: string;
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

export async function register(request: IRegisterRequest): Promise<IApiResponse<IRegisterResponse>> {
  try {
    const response = await apiClient.post<IApiResponse<IRegisterResponse>>("/users", { ...request, role: "STORE_OWNER" });

    console.log(response);

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(axiosError.response?.data);
    throw axiosError;
  }
}

export async function verify(token: string): Promise<IApiResponse<IRegisterResponse>> {
  try {
    const response = await apiClient.post<IApiResponse<IRegisterResponse>>("/users/verify", { token });

    console.log(response);

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(axiosError.response?.data);
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
