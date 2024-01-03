/** @format */
"use client";

import React, { useState } from "react";

import Button from "../shared/buttons/Button";
import Link from "next/link";
import googleImg from "../../../public/assets/images/google-logo.png"

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Basic validation, you might want to add more robust validation logic
    if (username && password) {
      onLogin(username, password);
    } else {
      alert("Please enter both username and password.");
    }
  };
  const handleGoogleLogin = () => {};

  return (
    <div className="p-4 rounded-lg  ">
      <h2 className="text-lg mb-2">Signin</h2>
      <p className="text-xs mb-4 text-gray-400">
        Enter your account details to enter our platform.
      </p>

      {/* Signin with Google option */}
      <div className="flex items-center mb-4">
        <Button
          type="button"
          title="Signin with Google"
          icon="/assets/images/google-logo.png"
          variant="btn_dark"
          onClick={handleGoogleLogin}
        />
      </div>

      {/* Horizontal line with "or" */}
      <div className="flex items-center mb-4">
        <hr className="flex-grow border-t border-gray-200" />
        <span className="mx-2 text-sm text-gray-400">or</span>
        <hr className="flex-grow border-t border-gray-200" />
      </div>

      {/* Email input */}
      <div className="mb-4">
        <label className="block text-xs mb-1" htmlFor="email">
          Email
        </label>
        <input
          className="border p-1 w-full rounded-md"
          type="text"
          id="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      {/* Password input */}
      <div className="mb-4 relative">
        <label className="block text-xs mb-1" htmlFor="password">
          Password
        </label>
        <input
          className="border p-1 w-full rounded-md"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        type="button"
        title="Login"
        variant="btn_teal"
        onClick={handleLogin}
      />

      {/* Create an account */}
      <p className="text-xs text-gray-400 mt-4 text-center">
        Do not have an account?{" "}
        <span className="text-teal-500">
          <Link href="/signup">Create an account</Link>
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
