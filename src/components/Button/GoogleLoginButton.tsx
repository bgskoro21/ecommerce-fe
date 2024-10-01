// components/GoogleLoginButton.tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const GoogleLoginButton: React.FC = () => {
  const handleLogin = () => {
    const width = 500;
    const height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    // Misalnya, role bisa diambil dari state atau props
    const role = "STORE_OWNER";

    const oauthUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google`;

    window.open(oauthUrl, "Google Login", `width=${width},height=${height},top=${top},left=${left}`);
  };

  return (
    <button onClick={handleLogin} className="flex justify-center items-center w-full mt-3 text-center shadow-lg rounded-lg border border-collapse hover:bg-slate-200 duration-300">
      <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="Google Logo" width={60} />
      <span className="text-slate-500">Login Dengan Google</span>
    </button>
  );
};

export default GoogleLoginButton;
