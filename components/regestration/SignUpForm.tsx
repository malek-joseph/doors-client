/** @format */
import React, { useState } from "react";
import Link from "next/link";
import Button from "../shared/buttons/Button";
import Input from "../inputs/Input";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { signup } from "../../app/services/authService";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    age: "",
    gender: "",
    number: "",
    job: "",
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


  const handleGoogleSignUp = async () => {signIn('google', {redirect: true, callbackUrl: '/'})};

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      email,
      password,
      confirmPassword,
      name,
      age,
      gender,
      number,
      job,
      photo,
    } = formData;

    if (password !== confirmPassword || password.length < 8) {
      toast.error("Password mismatch or too short");
      return;
    }
    if (!photo) {
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
    formDataToSend.append("photo", photo);

    setSigningUp(true);
    const success = await signup(formDataToSend, dispatch);
    setSigningUp(false);

    if (success) {
      router.push("/");
    }
  };

  return (
    <div className="p-4 rounded-lg lg:w-1/2">
      <div>
        <div className="flex items-center mb-4">
          <Button
            type="button"
            title="Signup with Google"
            icon="/assets/images/google-logo.png"
            variant="btn_dark"
            onClick={handleGoogleSignUp}
            disabled={false}
          />
        </div>

        <div className="flex items-center mb-4">
          <hr className="flex-grow border-t border-gray-200" />
          <span className="mx-2 text-sm text-gray-400">or</span>
          <hr className="flex-grow border-t border-gray-200" />
        </div>

        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label
              htmlFor="photo"
              className="block mb-2 text-lg font-medium text-gray-700"></label>
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
                autocomplete="name"
              />

              <Input
                label="Age"
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                required={true}
                autocomplete="age"
              />
              <Input
                label="Number"
                type="number"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleInputChange}
                required={true}
                autocomplete="tel"
              />
              <Input
                label="Gender"
                type="text"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required={true}
                autocomplete="sex"
              />
            </div>
            <div className="lg:w-full">
              <Input
                label="Job"
                type="text"
                id="job"
                name="job"
                value={formData.job}
                onChange={handleInputChange}
                required={true}
                autocomplete="organization-title"
              />
              <Input
                label="Email"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required={true}
                autocomplete="email"
              />

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

          <Button
            type="submit"
            title="Signup"
            variant="btn_teal"
            disabled={signingUp}
          />
        </form>

        <p className="text-xs text-gray-400 mt-2 text-center">
          Already have an account?{" "}
          <span className="text-teal-500">
            <Link href="/login">Signin</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
