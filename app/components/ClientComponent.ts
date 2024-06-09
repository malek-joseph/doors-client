/** @format */
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, selectUserDetails } from "../redux/features/auth/authSlice";

export interface UserData {
  email: string;
  name: string;
  age?: number;
  photo?: string;
  gender?: string;
  number?: string;
  job?: string;
  _id: string;
}
interface ClientComponentProps {
  userData: UserData | null;
}

const ClientComponent: React.FC<ClientComponentProps> = ({ userData }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector(selectUserDetails);
  // console.log(userDetails)

  useEffect(() => {
    if (userData) {
      const { email, name, age, photo, gender, number, job, _id } = userData;
      dispatch(
        setUser({ email, name, age, photo, gender, number, job, id: _id })
      );
    }
  }, [userData, dispatch]);

  return null;
};

export default ClientComponent;
