"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import InputField from "@/components/Input";
import { faCircleExclamation, faEnvelope, faEye, faEyeSlash, faKey } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { loginAction } from "../../action";
import { useRouter } from "next/navigation";
import Alert from "@/components/Alert";
import ButtonElement from "@/components/Button";
import { useMessage } from "@/context/messageContext";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const LoginForm = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data, clearMessage } = useMessage();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (data.message) {
      const timer = setTimeout(() => {
        clearMessage();
      }, 5000); // Menghapus pesan setelah 5 detik

      return () => clearTimeout(timer);
    }
  }, [data.message, clearMessage]);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const result = await loginAction(data);

    if (result.success) {
      router.push("/");
    } else {
      setErrorMessage(typeof result.errors === "string" ? result.errors : "Login failed. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <>
      {data.message && <Alert icon={faCircleExclamation} message={data.message} type={data.success ? "alert-success" : "alert-error"} />}
      {errorMessage && <Alert icon={faCircleExclamation} message={errorMessage} type="alert-error" />}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
        <InputField placeholder="Email" type="email" icon={faEnvelope} {...register("email")} />
        {errors.email && <p className="text-sm text-red-500 mt-2">{errors.email.message}</p>}
        <Link href="/reset" className="flex justify-end text-primary text-sm mt-3 mb-1">
          Forgot Password?
        </Link>
        <InputField placeholder="Password" type={!isShowPassword ? "password" : "text"} icon={faKey} suffixIcon={!isShowPassword ? faEyeSlash : faEye} {...register("password")} onClickSuffixIcon={() => setIsShowPassword(!isShowPassword)} />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        <ButtonElement label="LOGIN" type="submit" className="bg-primary-gradient w-full text-white py-3 mt-4" isLoading={isLoading} />
        <p className="mt-3 text-center">
          <span className="opacity-60">Don't have an account? </span>
          <Link href="/register" className="text-primary font-bold">
            Sign Up
          </Link>
        </p>
      </form>
    </>
  );
};

export default LoginForm;
