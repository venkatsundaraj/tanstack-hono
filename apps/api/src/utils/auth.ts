import { betterAuth } from "better-auth";

export const auth = betterAuth({
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
      clientId: process.env.GOOGLE_CLIENT_ID! as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET! as string,
      redirectURI: "http://localhost:3001/api/auth/callback/google",
    },
  },
  trustedOrigins: ["http://localhost:3000"],
  basePath: "/api/auth",
  secret: process.env.BETTER_AUTH_SECRET,
  account: {
    storeStateStrategy: "cookie",
    storeAccountCookie: true,
  },
});
