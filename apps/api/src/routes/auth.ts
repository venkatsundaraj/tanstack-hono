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

auth.on(["POST", "GET"], "/api/auth/*", (c) => {
  const authHandler = createAuth(c.env);
  return authHandler.handler(c.req.raw);
});
export default auth;
