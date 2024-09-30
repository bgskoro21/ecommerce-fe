import { IApiResponse } from "@/common/types/apiResponse";
import apiClient from "./api";
import { AxiosError } from "axios";
import { IForgotPasswordRequest, IRegisterRequest } from "@/common/request/authRequest";
import { setCookie } from "@/lib/cookies";

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

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(axiosError.response?.data);
    throw axiosError;
  }
}

export async function reset(email: string): Promise<IApiResponse<IRegisterResponse>> {
  try {
    const response = await apiClient.post<IApiResponse<IRegisterResponse>>("/users/forgot-password", { email });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(axiosError.response?.data);
    throw axiosError;
  }
}

export async function forgot({ token, newPassword, confirmPassword }: IForgotPasswordRequest): Promise<IApiResponse<IRegisterResponse>> {
  try {
    const response = await apiClient.post<IApiResponse<IRegisterResponse>>("/users/reset-password", { token, newPassword, confirmPassword });

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

    setCookie({ name: "accessToken", value: response.data?.accessToken ?? "", maxAge: 60 * 60 });
    setCookie({ name: "refreshToken", value: response.data?.refreshToken ?? "", maxAge: 60 * 60 * 24 * 7 });

    return response.data;
  } catch (error) {
    console.error("Gagal refresh token:", error);
    throw error;
  }
}
