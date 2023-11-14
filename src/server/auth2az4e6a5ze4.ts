import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  User,
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  Session,
  MyUser,
} from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { env } from "~/env.mjs";
import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & MyUser
  }

  // // interface User {
  // //   // ...other properties
  // //   // role: UserRole;
  // //   id: string;
  // //   name: string;
  // //   role: string;
  // // }
  interface MySession extends Session {
    user: {
      id: string;
      name: string;
      role: string;
    };
  }

  interface MyUser extends User {
    id: string;
    name: string;
    role: string;
  }
}


/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if(token) {
        session.user = token.user as MyUser;
      }
      return Promise.resolve(session);
  },
  // adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch("/api/utils/check-credentials", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;

        // const user = {
        //   id: "1",
        //   name: "test",
        //   role: "USER",
        // };

        // if (user) {
        //   return user;
        // } else {
        //   return null;
        // }
      },
    }),
    // DiscordProvider({
    //   clientId: env.DISCORD_CLIENT_ID,
    //   clientSecret: env.DISCORD_CLIENT_SECRET,
    // }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
