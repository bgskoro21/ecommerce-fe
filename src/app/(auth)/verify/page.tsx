"use client";

import React, { useEffect } from "react";
import { verifyEmail } from "../actions/verify";
import { useRouter } from "next/navigation";
import { useMessage } from "@/context/messageContext";

const VerifyEmailPage = () => {
  const router = useRouter();
  const { setData } = useMessage();

  const verify = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token");

    if (!token) {
      setData({
        success: false,
        message: "Token Not Found!",
      });
      router.push("/login");
      return;
    }

    try {
      // Simulasi verifikasi token
      const result = await verifyEmail(token);

      setData({
        success: result.success,
        message: result.success ? "Email verification successfully" : typeof result.errors == "string" ? result.errors : "Oops! verification email failed.",
      });

      router.push("/login");
    } catch (error) {
      setData({
        success: false,
        message: "Email verification failed!",
      });
      router.push("/login");
    }
  };

  useEffect(() => {
    verify();
  }, [router]);

  return (
    <div className="flex min-h-screen justify-center items-center">
      <span className="loading loading-dots loading-lg bg-primary-gradient"></span>
    </div>
  );
};

export default VerifyEmailPage;
