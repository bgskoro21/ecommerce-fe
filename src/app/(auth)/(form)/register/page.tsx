import React from "react";
import RegisterForm from "./form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registration Page",
  description: "Register your account",
};

const RegisterPage = () => {
  return <RegisterForm />;
};

export default RegisterPage;
