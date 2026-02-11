import { betterAuth } from "better-auth";
import { serverEnv } from "./env";
import { clientEnv } from "./public-env";
import { createServerFn, createServerOnlyFn } from "@tanstack/react-start";

export const auth = createServerOnlyFn(() => {
  return betterAuth({
    session: {
      strategy: "jwt",
      expiresIn: 60 * 60 * 24 * 7,
      updateAge: 60 * 60 * 24,
      cookieCache: {
        enabled: true,
        maxAge: 60 * 5,
      },
    },
    socialProviders: {
      google: {
        clientId: serverEnv.GOOGLE_CLIENT_ID,
        clientSecret: serverEnv.GOOGLE_CLIENT_SECRET,
        // redirectURI: `${import.meta.env.VITE_APP_URL}/api/auth/callback/google`,
      },
    },
    trustedOrigins: [import.meta.env.VITE_APP_URL!],
    basePath: "/api/auth",
    secret: serverEnv.BETTER_AUTH_SECRET,
  });
});
