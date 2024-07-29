import { db } from "@/src/database/db";
import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  adapter: DrizzleAdapter(db),
  secret: process.env.AUTH_SECRET || "",
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
});
