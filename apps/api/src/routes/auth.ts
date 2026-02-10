import { Hono } from "hono";
import { cors } from "hono/cors";
import { createAuth } from "../utils/auth";
import type { AppBindings } from "@/lib/types";
import { createApp } from "@/lib/create-app";

const auth = createApp();

auth.use("/api/auth/*", (c, next) => {
  const corsMiddleware = cors({
    origin: (origin) => {
      const allowedOrigins = [
        "https://tanstack-hono-tan.vercel.app",
        "http://localhost:3000",
        c.env.VITE_APP_URL,
      ];
      return allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
    },
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: [
      "Content-Type",
      "Authorization",
      "Cookie",
      "X-Requested-With",
    ],
    exposeHeaders: ["Set-Cookie", "Content-Length"],
    maxAge: 86400,
  });
  return corsMiddleware(c, next);
});

auth.get("/api/auth/debug-cookies", (c) => {
  return c.json({
    cookies: c.req.header("cookie"),
  });
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
      redirectURI: `${c.env.BETTER_AUTH_URL}/api/auth/callback/google`,
      trustedOrigins: [c.env.VITE_APP_URL],
    },
    endpoints: {
      signIn: `${c.env.BETTER_AUTH_URL}/api/auth/sign-in/social?provider=google`,
      callback: `${c.env.BETTER_AUTH_URL}/api/auth/callback/google`,
      session: `${c.env.BETTER_AUTH_URL}/api/auth/session`,
    },
  });
});

auth.on(["GET", "POST"], "/api/auth/*", async (c) => {
  console.log("Auth request:", {
    method: c.req.method,
    url: c.req.url,
    path: new URL(c.req.url).pathname,
    cookies: c.req.header("cookie"),
  });
  const authHandler = createAuth(c.env);
  const response = await authHandler.handler(c.req.raw);
  console.log("Auth response:", {
    status: response.status,
    setCookie: response.headers.get("set-cookie"),
    location: response.headers.get("location"),
  });

  return response;
});
export default auth;
