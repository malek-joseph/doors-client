/** @format */

import {type Session, getServerSession} from 'next-auth'
import ListSection from "../components/sections/ListNowSection";
import ListingsSection from "../components/sections/ListingsSection";
import { authOptions } from "@/app/lib/nextAuth";

export default async function Home() {
   const session: Session | null = await getServerSession(authOptions);
   if (!session) {
       // Handle the case when session is null, e.g., redirect to login or show an error
       console.error("No session found");
       return; // or redirect, or throw an error, etc.
   }
   const user = session.user as object
    // console.log(session);

  return (
    <main className="flex flex-col items-center justify-center ">
      <div className="w-5/6 mb-24">
        <ListSection />
        <ListingsSection />
      </div>
    </main>
  );
}
