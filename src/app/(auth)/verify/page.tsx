"use client";

import React, { useEffect } from "react";
import { verifyEmail } from "../actions/verify";
import { useRouter } from "next/navigation";

const VerifyEmailPage = () => {
  const router = useRouter();

  const verify = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token");

    if (!token) {
      router.push("/register");
      return;
    }

    try {
      // Simulasi verifikasi token
      const result = await verifyEmail(token);

      if (result.success) {
        router.push("/login");
      } else {
        router.push("/register");
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      router.push("/register");
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
