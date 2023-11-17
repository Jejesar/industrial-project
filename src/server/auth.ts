import NextAuth, { MyUser, NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { NextApiHandler } from "next";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & MyUser;
  }

  interface MyUser extends User {
    id: string;
    name: string;
    role: string;
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_URL,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 1 * 60 * 60, // 1 hour
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user as MyUser;
      }
      return Promise.resolve(session);
    },
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  providers: [
    Credentials({
      id: "credentials",
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text", placeholder: "" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          process.env.NEXTAUTH_URL + "/api/utils/check-credentials",
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          }
        );

        const user = await res.json();

        if (res.status == 200 && user) {
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
};
const Handler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);
export default Handler;
