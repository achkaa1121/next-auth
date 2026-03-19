import type { NextAuthConfig } from "next-auth";
import Google from "@auth/core/providers/google";
import GitHub from "@auth/core/providers/github";
export const runtime = "nodejs";
export const authConfig: NextAuthConfig = {
  providers: [Google, GitHub],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const PUBLIC_PATHS = ["/login", "/api/auth", "/register", "/forgot"];
      const isPublic = PUBLIC_PATHS.some((p) => nextUrl.pathname.startsWith(p));

      if (isPublic) return true;
      if (isLoggedIn) return true;

      return false;
    },
  },
};
