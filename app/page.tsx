/** @format */

import {type Session, getServerSession} from 'next-auth'
import ListSection from "../components/sections/ListNowSection";
import ListingsSection from "../components/sections/ListingsSection";
import ClientComponent from "../components/ClientComponent";
import { authOptions } from "@/app/lib/nextAuth";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/auth/authSlice";
import axios from 'axios';
import { store } from './redux/store';



export default async function Home() {
  // const dispatch = useDispatch()
   const session: Session | null = await getServerSession(authOptions);

  //  const user = session.user as object
    // console.log("session",session);
let userData
   if (session && session.user && session.user.email as string) {
   const userEmail = session.user.email
     try {
       const response = await axios.get(
         `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/user-details`,
         {
           params: {
             email: userEmail,
           },
         }
       );

     
      userData = response.data;

     } catch (error) {
       console.error("Error fetching user details:", error);
     }
   }

  return (
    <main className="flex flex-col items-center justify-center ">
      <div className="w-5/6 mb-24">
        <ClientComponent userData={userData} />
        <ListSection />
        <ListingsSection />
      </div>
    </main>
  );
}
