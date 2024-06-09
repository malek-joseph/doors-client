/** @format */
"use client";

import React, { useState } from "react";

import Button from "../shared/buttons/Button";
import Link from "next/link";
import googleImg from "../../../public/assets/images/google-logo.png";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { signin } from "../../services/authService"; // Import the signup function
import Input from "../inputs/Input"; // Import the Input component
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/auth/authSlice";
import { signIn } from "next-auth/react";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
    } else {
      setSigningIn(true);
      const user = { email, password };
      const success = await signin(user, dispatch);

      setSigningIn(false);

      if (success) {
        router.push("/");
      }
    }
  };
  const handleGoogleLogin = async () => {
    signIn("google", { redirect: true, callbackUrl: "/" });
  };

  return (
    <div className="p-4 rounded-lg lg:w-1/2 ">
      {/* Signin with Google option */}
      <div className="flex items-center mb-4">
        <Button
          type="button"
          title="Signin with Google"
          icon="/assets/images/google-logo.png"
          variant="btn_dark"
          disabled={false}
          onClick={handleGoogleLogin}
        />
      </div>

      {/* Horizontal line with "or" */}
      <div className="flex items-center mb-4">
        <hr className="flex-grow border-t border-gray-200" />
        <span className="mx-2 text-sm text-gray-400">or</span>
        <hr className="flex-grow border-t border-gray-200" />
      </div>

      <form onSubmit={handleLogin} className="lg:w-full">
        <Input
          label="Email"
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={true}
          autocomplete="email"
        />

        {/* Password input */}
        <div className="mb-4 relative">
          <Input
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
            autocomplete="current-password"
          />
          {/* Forget password */}
          <p className="text-xs mb-4 mt-2 text-right">
            <a className="text-teal-500" href="#">
              Forget password?
            </a>
          </p>
        </div>

        {/* Login button */}

        <Button
          type="submit"
          title="Login"
          variant="btn_teal"
          disabled={signingIn}
        />
      </form>

      {/* Create an account */}
      <p className="text-xs text-gray-400 mt-2 text-center">
        Do not have an account?{" "}
        <span className="text-teal-500">
          <Link href="/auth/signup">Create an account</Link>
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
