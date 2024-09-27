import React from "react";
import LoginForm from "./form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login Page",
  description: "Login to your account",
};

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
