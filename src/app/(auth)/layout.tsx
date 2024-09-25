import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="min-h-screen flex">
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 lg:border lg:p-10 p-5">
          <div className="w-full max-w-md">
            <div className="w-16 h-16 p-4 flex justify-center items-center bg-primary-gradient text-white rounded-lg">
              <h1 className="font-bold text-4xl">B</h1>
            </div>
            <h1 className="mt-5 font-bold text-2xl ">Get Started</h1>
            <p className="text-sm text-slate-400 mt-2">Welcome to BagasShop Seller - Let's create your account</p>
            <div className="mt-7">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
