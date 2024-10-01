"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const CallBackOauthHandler = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const success = params.get("success");
    const error = params.get("error");

    if (window.opener) {
      if (success) {
        window.opener.postMessage({ type: "oauth", success: true }, `${process.env.NEXT_PUBLIC_BASE_URL}/login`);
      } else if (error) {
        window.opener.postMessage({ type: "oauth", success: false, error }, `${process.env.NEXT_PUBLIC_BASE_URL}/login`);
      }
      window.close();
    }
  }, [searchParams]);
  return (
    <div className="flex min-h-screen justify-center items-center">
      <span className="loading loading-dots loading-lg bg-primary-gradient"></span>
    </div>
  );
};

export default CallBackOauthHandler;
