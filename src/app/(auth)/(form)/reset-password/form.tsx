"use client";
import ButtonElement from "@/components/Button";
import InputField from "@/components/Input";
import { useMessage } from "@/context/messageContext";
import { faEye, faEyeSlash, faKey } from "@fortawesome/free-solid-svg-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { forgotPassword } from "../../action";

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter") // Setidaknya satu huruf
    .matches(/[0-9]/, "Password must contain at least one number") // Setidaknya satu angka
    .matches(/[\W_]/, "Password must contain at least one special character") // Setidaknya satu karakter khusus
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm Password is required"),
});

const ForgotPasswordForm = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setData } = useMessage();
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const queryToken = new URLSearchParams(window.location.search).get("token");
    if (!queryToken) {
      setData({ success: false, message: "Token not found." });
      router.push("/login"); // Redirect jika token tidak ada
    } else {
      setToken(queryToken); // Simpan token di state
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const result = await forgotPassword({ ...data, token });

    if (result.success) {
      setData({
        success: true,
        message: "Forgot password successfully",
      });
    } else {
      setData({
        success: false,
        message: typeof result.errors === "string" ? result.errors : "Login failed. Please try again.",
      });
    }

    router.push("/login");
    setIsLoading(false);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        placeholder="Password"
        type={!isShowPassword ? "password" : "text"}
        icon={faKey}
        suffixIcon={!isShowPassword ? faEyeSlash : faEye}
        {...register("newPassword")}
        className="mt-4"
        onClickSuffixIcon={() => setIsShowPassword(!isShowPassword)}
      />
      {errors.newPassword && <p className="text-sm text-red-500 mt-2">{errors.newPassword.message}</p>}

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
      <ButtonElement label="SUBMIT" type="submit" className="bg-primary-gradient w-full text-white py-3 mt-4" isLoading={isLoading} />
    </form>
  );
};

export default ForgotPasswordForm;
