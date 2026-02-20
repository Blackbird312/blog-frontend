import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import type { NextAuthOptions } from "next-auth";
import { extractKeycloakRoles } from "@/src/lib/auth/extractRoles";

export const authOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      issuer: process.env.KEYCLOAK_ISSUER!,
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
    }), 
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) {
        (token as any).accessToken = account.access_token;
        (token as any).roles = extractKeycloakRoles(
          account.access_token as string,
          "blog-api"
        );
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).accessToken = (token as any).accessToken;
      (session as any).roles = (token as any).roles ?? [];
      return session;
    },
  },
};

export default NextAuth(authOptions);