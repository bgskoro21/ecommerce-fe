"use client";
import ButtonElement from "@/components/Button";
import InputField from "@/components/Input";
import { faCircleExclamation, faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { resetPassword } from "../../action";
import { useMessage } from "@/context/messageContext";
import { useRouter } from "next/navigation";
import Alert from "@/components/Alert";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Email is required"),
});

const ResetPasswordForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setData } = useMessage();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    const result = await resetPassword(data);

    if (result.success) {
      setData({ success: result.success, message: "Your reset password request already sent into your email. Please check your email." });

      router.push("/login");

      return;
    }

    setErrorMessage(typeof result.errors === "string" ? result.errors : "Register user failed. Please try again.");

    setIsLoading(false);
  };
  return (
    <>
      {errorMessage && <Alert icon={faCircleExclamation} message={errorMessage} type="alert-error" />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField placeholder="Email" type="email" icon={faEnvelope} {...register("email")} className="mt-4" />
        {errors.email && <p className="text-sm text-red-500 mt-2">{errors.email.message}</p>}

        <ButtonElement label="RESET PASSWORD" type="submit" className="bg-primary-gradient w-full text-white py-3 mt-4" isLoading={isLoading} />
      </form>
    </>
  );
};

export default ResetPasswordForm;
