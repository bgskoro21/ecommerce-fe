"use client"; // Menandakan bahwa ini adalah client component

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from "react";
import InputField from "@/components/Input";
import ButtonElement from "@/components/Button";
import Alert from "@/components/Alert";
import { faCircleExclamation, faEnvelope, faKey, faEye, faEyeSlash, faCheckCircle, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { registerAction } from "../../action";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter") // Setidaknya satu huruf
    .matches(/[0-9]/, "Password must contain at least one number") // Setidaknya satu angka
    .matches(/[\W_]/, "Password must contain at least one special character") // Setidaknya satu karakter khusus
    .required("Password is required"),
  name: Yup.string().required("Name is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const LoginForm = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const result = await registerAction(data);

    if (result.success) {
      setSuccessMessage("Registration successful! Please check your email for verification.");
      setErrorMessage("");
    } else {
      setErrorMessage(typeof result.errors === "string" ? result.errors : "Register user failed. Please try again.");
      setSuccessMessage("");
    }

    setIsLoading(false);
  };

  return (
    <>
      {successMessage && <Alert icon={faCheckCircle} message={successMessage} type="alert-success" />}
      {errorMessage && <Alert icon={faCircleExclamation} message={errorMessage} type="alert-error" />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField placeholder="Your Name" type="text" icon={faUser} {...register("name")} className="mt-4" />
        {errors.name && <p className="text-sm text-red-500 mt-2">{errors.name.message}</p>}

        <InputField placeholder="Email" type="email" icon={faEnvelope} {...register("email")} className="mt-4" />
        {errors.email && <p className="text-sm text-red-500 mt-2">{errors.email.message}</p>}

        <InputField
          placeholder="Password"
          type={!isShowPassword ? "password" : "text"}
          icon={faKey}
          suffixIcon={!isShowPassword ? faEyeSlash : faEye}
          {...register("password")}
          className="mt-4"
          onClickSuffixIcon={() => setIsShowPassword(!isShowPassword)}
        />
        {errors.password && <p className="text-sm text-red-500 mt-2">{errors.password.message}</p>}

        <InputField
          placeholder="Confirm Password"
          type={!isShowConfirmPassword ? "password" : "text"}
          icon={faKey}
          suffixIcon={!isShowConfirmPassword ? faEyeSlash : faEye}
          {...register("confirmPassword")}
          className="mt-4"
          onClickSuffixIcon={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
        />
        {errors.confirmPassword && <p className="text-sm text-red-500 mt-2">{errors.confirmPassword.message}</p>}

        <ButtonElement label="REGISTER" type="submit" className="bg-primary-gradient w-full text-white py-3 mt-4" isLoading={isLoading} />

        <p className="mt-3 text-center">
          <span className="opacity-60">Already have an account? </span>
          <Link href="/login" className="text-primary font-bold">
            Sign In
          </Link>
        </p>
      </form>
    </>
  );
};

export default LoginForm;
