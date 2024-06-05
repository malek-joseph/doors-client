/** @format */
import GoogleProvider from "next-auth/providers/google";
import { type AuthOptions } from "next-auth";

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
    signIn: '/login',
    newUser: '/signup'
    
  },
// callbacks: {
//   async signIn({ user, account, profile, email, credentials }) {
//     return true;
//   },
//   async redirect({ url, baseUrl }) {
//     return baseUrl;
//   },
//   async session({ session, user, token }) {
//     return session;
//   },
//   async jwt({ token, user, account, profile, isNewUser }) {
//     return token;
//   }
// }

};
