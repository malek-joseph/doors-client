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
      "http://localhost:8000/api/users/signup",
      formDataToSend
    );

    if (response.status === 201) {
      toast.success("Registered successfully");
      // Extract user data from the response
      const { email, name, age, photo, gender, number, job, _id } = response.data;

      // Dispatch user data to Redux store
      dispatch(setUser({ email, name, age, photo, gender, number, job, id:_id }));
      return true;
    }
    return false;
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 400) {
        // Bad Request: Display the error message from the backend
        toast.error(data.error);
      } else if (status === 401) {
        // Unauthorized: Display a generic error message
        toast.error("Authentication failed. Check your credentials.");
      } else {
        // Other error: Display a generic error message
        toast.error("An error occurred while signing up.");
      }
    } else {
      // Network error or other unexpected error: Display a generic error message
      toast.error("An unexpected error occurred.");
    }
  }
};

const signin = async (user: User, dispatch: AppDispatch) => {
  try {
    
    const response = await axios.post(
      "http://localhost:8000/api/users/signin",
      user
    );

    if (response.status === 200) {
      // Signin successful (status code 200: OK)
         const { email, name, age, photo, gender, number, job, _id } = response.data.user;
         // Dispatch user data to Redux store
         dispatch(setUser({ email, name, age, photo, gender, number, job, id:_id }));
      toast.success("Signed in successfully");
      return true;
    }
    return false;
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 400) {
        // Bad Request: Display the error message from the backend
        toast.error(data.error);
      } else if (status === 401) {
        // Unauthorized: Display a generic error message
        toast.error("Authentication failed. Check your credentials.");
      } else {
        // Other error: Display a generic error message
        toast.error("An error occurred while signing in.");
      }
    } else {
      // Network error or other unexpected error: Display a generic error message
      toast.error("An unexpected error occurred.");
    }
  }
};

export { signup, signin };