import { withAuth } from "next-auth/middleware";

export default withAuth({
  secret: process.env.NEXTAUTH_URL,
  callbacks: {
    authorized({ token }) {
      return token?.user.role === "admin";
    },
  },
  pages: {
    verifyRequest: "/auth/signin",
  },
});

export const config = { matcher: ["/configuration"] };
