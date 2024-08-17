import { SignIn } from "@clerk/clerk-react";
import React from "react";

const SignInPage = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <SignIn />
    </div>
  );
};

export default SignInPage;
