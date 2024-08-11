// pages/login.tsx

import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Builder",
  description: "Log in to your Builder account",
};

const Login: React.FC = () => {
  return (
    <div className=" relative">
      <div className=" flex items-center justify-center min-h-screen ">
        <div className=" bg-opacity-50 rounded-lg shadow-lg p-8 backdrop-blur-md max-w-md w-full mx-4">
          <Button size="icon" className="absolute  top-4 left-4">
            <X className="w-4 h-4" />
          </Button>
          <h1 className="text-3xl font-semibold  text-center mb-6">
            Login to Fey
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            If you gained access to Fey, you can enter your email or login with
            your Google account.
          </p>
          <div>
            <Input
              type="email"
              placeholder="account email"
              className="w-full px-4 py-2  bg-opacity-30  rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex justify-center mt-6">
            <Button variant="link">
              <Icons.google className="w-4 h-4 mr-2 " />
              Sign in with Google
            </Button>
          </div>
          <div className="text-center mt-4">
            <a href="#" className="text-muted-foreground mr-1">
              Don't have an account yet?
              <span className="text-primary">Sign up.</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;