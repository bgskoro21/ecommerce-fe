export interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export interface IForgotPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}
