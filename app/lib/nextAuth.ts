/** @format */
import GoogleProvider from "next-auth/providers/google";
import { type AuthOptions } from "next-auth";
import { Session, User } from "next-auth";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/auth/authSlice";
import { googleSignUp } from "../services/authService";
import { store } from "../redux/store"; // Import your store
import { AppDispatch } from "../redux/store";

// Extend the default session and user types to include the user id
interface ExtendedSession extends Session {
  user?: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/signup",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/google-signin`,
          {
            email: user.email,
            name: user.name,
            image: user.image,
          }
        );
       

   
        user.id = response.data.user._id;
        return true;
      } catch (error) {
        console.error("Error during Google sign-in:", error);
        return false;
      }
    },
  },
};
