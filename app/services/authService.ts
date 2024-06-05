/** @format */

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { setUser } from "../redux/features/auth/authSlice";
import { AppDispatch } from "../redux/store";

interface User {
  email: string;
  password: string;
}

const signup = async (formDataToSend: FormData, dispatch: AppDispatch) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/signup`,
      formDataToSend
    );
    // console.log(response.data);

    if (response.status === 201) {
      toast.success("Registered successfully");
      const { email, name, age, photo, gender, number, job, _id } =
        response.data;
      dispatch(
        setUser({ email, name, age, photo, gender, number, job, id: _id })
      );
      return true;
    }
    return false;
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 400) {
        toast.error(data.error);
      } else if (status === 401) {
        toast.error("Authentication failed. Check your credentials.");
      } else {
        toast.error("An error occurred while signing up.");
      }
    } else {
      toast.error("An unexpected error occurred.");
    }
  }
};

const signin = async (user: User, dispatch: AppDispatch) => {
  try {
    // Log the user payload
    // console.log("Signing in with:", user);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/signin`,
      user
    );

    if (response.status === 200) {
      const { email, name, age, photo, gender, number, job, _id } =
        response.data.user;
      dispatch(
        setUser({ email, name, age, photo, gender, number, job, id: _id })
      );
      toast.success("Signed in successfully");
      return true;
    }
    return false;
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 400) {
        toast.error(data.error);
      } else if (status === 401) {
        toast.error("Authentication failed. Check your credentials.");
      } else {
        toast.error("An error occurred while signing in.");
      }
    } else {
      toast.error("An unexpected error occurred.");
    }
  }
};



export { signup, signin };
