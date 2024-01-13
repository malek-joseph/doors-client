/** @format */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Button from "../shared/buttons/Button";
import Input from "../inputs/Input"; // Import the Input component
import { useRouter } from "next/navigation";
import { signup } from "../../services/authService"; // Import the signup function
import { ToastContainer, toast } from "react-toastify";

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signingUp, setSigningUp] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password === confirmPassword) {
      if (password.length < 8) {
        toast.error("Password must be at least 8 characters long");
      } else {
        setSigningUp(true);
        const user = { email, password };
        const success = await signup(user);
        setSigningUp(false);

        if (success) {
          router.push("/");
        }
      }
    } else {
      toast.error("Password mismatch");
    }
  };
  const handleGoogleSignUp = () => {};

  return (
    <div className="p-4 rounded-lg  ">
      <h2 className="text-lg mb-2">Signup</h2>
      <p className="text-xs mb-4 text-gray-400">
        Enter your account details to enter our platform.
      </p>

      {/* Signin with Google option */}
      <div className="flex items-center mb-4">
        <Button
          type="button"
          title="Signup with Google"
          icon="/assets/images/google-logo.png"
          variant="btn_dark"
          disabled={false}
        />
      </div>

      {/* Horizontal line with "or" */}
      <div className="flex items-center mb-4">
        <hr className="flex-grow border-t border-gray-200" />
        <span className="mx-2 text-sm text-gray-400">or</span>
        <hr className="flex-grow border-t border-gray-200" />
      </div>
      <form onSubmit={handleSignup}>
        {/* Email input */}
        <Input
          label="Email"
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={true}
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
          />
          <Input
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required={true}
          />
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          title="Signup"
          variant="btn_teal"
          disabled={signingUp}
        />
      </form>

      {/* Create an account */}
      <p className="text-xs text-gray-400 mt-4 text-center">
        Already have an account?{" "}
        <span className="text-teal-500">
          <Link href="/login">Signin</Link>
        </span>
      </p>
    </div>
  );
};

export default SignupForm;
