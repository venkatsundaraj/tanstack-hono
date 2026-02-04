import { createDb } from "@/db";
import type { Environment } from "@/env";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const createAuth = (env: Environment) => {
  const db = createDb(env);
  return betterAuth({
    database: drizzleAdapter(db, { provider: "pg" }),
    baseURL: env.HONO_APP_URL, // e.g. https://api.yoursite.com
    secret: env.BETTER_AUTH_SECRET,

    // Add this to handle proxy headers in production
    trustHost: true,

    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        // Let Better Auth construct this automatically using baseURL
      },
    },

    trustedOrigins: [env.VITE_APP_URL, env.HONO_APP_URL],

    // Strategy "cookie" is good for cross-domain
    account: {
      storeStateStrategy: "cookie",
    },
    useSecureCookies: true,
    advanced: {
      defaultCookieAttributes: {
        sameSite: "none",
        secure: true,
        httpOnly: true,
        domain: undefined,
      },
    },
  });
};
