import { createApp, createRouter } from "@/lib/create-app";
import { createAuth } from "@/utils/auth";

const auth = createApp();

auth.get("/api/auth/health", (c) => {
  const authInstance = createAuth(c.env);

  return c.json({
    status: "ok",
    hello: authInstance,
    basePath: "/api/auth",
    providers: ["google"],
    config: {
      hasGoogleClientId: !!c.env.GOOGLE_CLIENT_ID,
      hasGoogleClientSecret: !!c.env.GOOGLE_CLIENT_SECRET,
      redirectURI: `${c.env.BETTER_AUTH_BASE_URL}/api/auth/callback/google`,
      trustedOrigins: [c.env.VITE_APP_URL],
    },
    endpoints: {
      signIn: `${c.env.BETTER_AUTH_BASE_URL}/api/auth/sign-in/social?provider=google`,
      callback: `${c.env.BETTER_AUTH_BASE_URL}/api/auth/callback/google`,
      session: `${c.env.BETTER_AUTH_BASE_URL}/api/auth/session`,
    },
  });
});

const router = auth.all("/api/auth/*", (c) => {
  const auth = createAuth(c.env);
  return auth.handler(c.req.raw);
});

export default router;
