import { Hono } from "hono";
import { cors } from "hono/cors";
import { createAuth } from "../utils/auth";
import type { AppBindings } from "@/lib/types";

const auth = new Hono<AppBindings>();

auth.use("/api/auth/*", (c, next) => {
  const corsMiddleware = cors({
    origin: (origin) => {
      const allowedOrigins = [
        "https://tanstack-hono-tan.vercel.app",
        "http://localhost:3000",
        c.env.VITE_APP_URL,
      ].filter(Boolean);

      return allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
    },
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  });
  return corsMiddleware(c, next);
});

auth.get("/api/auth/health", (c) => {
  const authInstance = createAuth(c.env);

  return c.json({
    status: "ok",
    basePath: "/api/auth",
    providers: ["google"],
    config: {
      hasGoogleClientId: !!c.env.GOOGLE_CLIENT_ID,
      hasGoogleClientSecret: !!c.env.GOOGLE_CLIENT_SECRET,
      redirectURI: `${c.env.HONO_APP_URL}/api/auth/callback/google`,
      trustedOrigins: [c.env.VITE_APP_URL],
    },
    endpoints: {
      signIn: `${c.env.HONO_APP_URL}/api/auth/sign-in/social?provider=google`,
      callback: `${c.env.HONO_APP_URL}/api/auth/callback/google`,
      session: `${c.env.HONO_APP_URL}/api/auth/session`,
    },
  });
});

auth.all("/api/auth/*", async (c) => {
  const authHandler = createAuth(c.env);
  return authHandler.handler(c.req.raw);
});
export default auth;
