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
   gender: "",
   number: "",
   job:"",
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
   const { email, password, confirmPassword, name, age,gender, number, job, photo } = formData;

   if (password !== confirmPassword || password.length < 8) {
     toast.error("Password mismatch or too short");
     return;
   }
    if (!photo) {
    // Handle missing photo or age
    toast.error("Profile photo is required");
    return;
  }

   const formDataToSend = new FormData();
   formDataToSend.append("email", email);
   formDataToSend.append("password", password);
   formDataToSend.append("name", name);
   formDataToSend.append("number", number);
   formDataToSend.append("gender", gender);
   formDataToSend.append("job", job);
   formDataToSend.append("age", age);

  if (photo) {
    formDataToSend.append("photo", photo);
  }



   setSigningUp(true);
   const success = await signup(formDataToSend, dispatch);
   setSigningUp(false);
  //  console.log(photo)

   if (success) {
     router.push("/"); 
   }
 };

  
  const handleGoogleSignUp = () => {};

  return (
    <div className="p-4 rounded-lg lg:w-1/2 ">

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
        <div className="mb-4">
          <label
            htmlFor="photo"
            className="block mb-2 text-lg font-medium text-gray-700 ">
            
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handleInputChange}
            className="block text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-teal-50 file:text-teal-700
      hover:file:bg-teal-100 hover:cursor-pointer hover:file:cursor-pointer"
          />
        </div>
        <div className="lg:flex justify-between lg:w-full gap-1">
          <div className="lg:w-full">
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
        <Input
          label="Number"
          type="number" // Use 'number' type for age input to get a numeric keyboard on mobile devices
          id="number"
           name="number"
         value={formData.number}
          onChange={handleInputChange}
          required={true}
            />
             <Input
          label="Gender"
          type="string" // Use 'number' type for age input to get a numeric keyboard on mobile devices
          id="gender"
           name="gender"
         value={formData.gender}
          onChange={handleInputChange}
          required={true}
        />
          </div>
          <div className="lg:w-full">
             
        <Input
          label="Job"
          type="string" // Use 'number' type for age input to get a numeric keyboard on mobile devices
          id="job"
           name="job"
         value={formData.job}
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
        </div>
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
      <p className="text-xs text-gray-400 mt-2 text-center">
        Already have an account?{" "}
        <span className="text-teal-500">
          <Link href="/login">Signin</Link>
        </span>
      </p>
    </div>
  );
};

export default SignupForm;
