import { createDb } from "@/db";
import type { Environment } from "@/env";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const createAuth = (env: Environment) => {
  const db = createDb(env);
  return betterAuth({
    // session: {
    //   strategy: "jwt",
    //   expiresIn: 60 * 60 * 24 * 7,
    //   updateAge: 60 * 60 * 24,
    //   cookieCache: {
    //     enabled: true,
    //     maxAge: 60 * 5,
    //   },
    // },
    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        redirectURI: `${env.HONO_APP_URL}/api/auth/callback/google`,
      },
    },
    trustedOrigins: [env.VITE_APP_URL],
    basePath: "/api/auth",
    secret: env.BETTER_AUTH_SECRET,
    database: drizzleAdapter(db, { provider: "pg" }),
    advanced: {
      defaultCookieAttributes: {
        sameSite: "lax",
        secure: false,
        httpOnly: true,
        path: "/",
        domain: undefined,
      },
    },
    account: {
      storeStateStrategy: "cookie",
      storeAccountCookie: true,
    },
  });
};
