"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import InputField from "@/app/components/Input";
import { faCircleExclamation, faEnvelope, faEye, faEyeSlash, faKey } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState } from "react";
import { loginAction } from "../actions/login";
import { useRouter } from "next/navigation";
import Alert from "@/app/components/Alert";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const LoginPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: any) => {
    const result = await loginAction(data);
    console.log(result);

    if (result.success) {
      router.push("/"); // Ganti dengan path yang sesuai
    } else {
      console.log(result);
      setErrorMessage(typeof result.errors === "string" ? result.errors : "Login failed. Please try again.");
    }
  };

  return (
    <>
      {errorMessage && <Alert icon={faCircleExclamation} message={errorMessage} />}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
        <InputField placeholder="Email" type="email" icon={faEnvelope} {...register("email")} />
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
        <button type="submit" className="bg-primary-gradient mt-4 text-white text-center w-full py-3 rounded-lg hover:opacity-80 duration-300">
          LOGIN
        </button>
        <p className="mt-3 text-center">
          <span className="opacity-60">Don't have an account?</span>
          <Link href="/" className="text-primary font-bold">
            Sign Up
          </Link>
        </p>
      </form>
    </>
  );
};

export default LoginPage;
