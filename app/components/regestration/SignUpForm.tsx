"use client";
import { useState } from "react";
import Link from "next/link";
import Button from "../shared/buttons/Button";
import Input from "../inputs/Input"; 
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/auth/authSlice"; 
import { signup } from "../../services/authService"; 
import {  toast } from "react-toastify";

const SignupForm: React.FC = () => {

 const [formData, setFormData] = useState({
   email: "",
   password: "",
   confirmPassword: "",
   name: "",
   age: "",
   photo: null,
 });
 const [signingUp, setSigningUp] = useState(false);
 const router = useRouter();
 const dispatch = useDispatch();

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   const { name, value, files } = e.target;
   setFormData((prevData) => ({
     ...prevData,
     [name]: files ? files[0] : value,
   }));
 };

 const handleSignup = async (e: React.FormEvent) => {
   e.preventDefault();
   const { email, password, confirmPassword, name, age, photo } = formData;

   if (password !== confirmPassword || password.length < 8) {
     toast.error("Password mismatch or too short");
     return;
   }

   const formDataToSend = new FormData();
   formDataToSend.append("email", email);
   formDataToSend.append("password", password);
   formDataToSend.append("name", name);
   formDataToSend.append("age", age);
   if (photo) formDataToSend.append("photo", photo);

   setSigningUp(true);
   const success = await signup(formDataToSend);
   setSigningUp(false);

   if (success) {
     dispatch(setUser({ email, name,age, photo }));
     router.push("/"); 
   }
 };

  
  const handleGoogleSignUp = () => {};

  return (
    <div className="p-4 rounded-lg  ">
      {/* <h2 className="text-lg mb-2">Signup</h2> */}
      {/* <p className="text-xs mb-4 text-gray-400">
        Enter your account details to enter our platform.
      </p> */}

      {/* Signin with Google option */}
      {/* <div className="flex items-center mb-4">
        <Button
          type="button"
          title="Signup with Google"
          icon="/assets/images/google-logo.png"
          variant="btn_dark"
          disabled={false}
        />
      </div> */}

      {/* Horizontal line with "or" */}
      {/* <div className="flex items-center mb-4">
        <hr className="flex-grow border-t border-gray-200" />
        <span className="mx-2 text-sm text-gray-400">or</span>
        <hr className="flex-grow border-t border-gray-200" />
      </div> */}
      <form onSubmit={handleSignup}>
        <div className="mb-4">
          <label
            htmlFor="photo"
            className="block mb-2 text-lg font-medium text-gray-700 ">
            Upload Photo
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handleInputChange}
            className="block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-teal-50 file:text-teal-700
      hover:file:bg-teal-100 "
          />
        </div>
        {/* Name input */}
        <Input
          label="Name"
          type="text"
          id="name"
          name="name"
           value={formData.name}
          onChange={handleInputChange}
          required={true}
        />

        {/* Age input */}
        <Input
          label="Age"
          type="number" // Use 'number' type for age input to get a numeric keyboard on mobile devices
          id="age"
           name="age"
         value={formData.age}
          onChange={handleInputChange}
          required={true}
        />
        {/* Email input */}
        <Input
          label="Email"
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required={true}
          autocomplete="email"
        />

        {/* Password input */}
        <div className="mb-4 relative">
          <Input
            label="Password"
            type="password"
            id="password"
            name="password"
          value={formData.password}
          onChange={handleInputChange}
            required={true}
            autocomplete="new-password"
          />
          <Input
            label="Confirm Password"
            type="password"
            id="confirmPassword"
             name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
            required={true}
            autocomplete="new-password"
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
