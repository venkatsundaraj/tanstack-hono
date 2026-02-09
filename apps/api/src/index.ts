import { Hono } from "hono";
import users from "./routes/user";
import { logger } from "hono/logger";
import auth from "./routes/auth";
import { cors } from "hono/cors";
import { createApp } from "./lib/create-app";

const app = createApp();

app.use("*", async (c, next) => {
  // console.log(c.env.VITE_APP_URL);
  const corsMiddleware = cors({
    origin: (origin) => {
      const allowedOrigins = [
        "http://localhost:3000",
        "https://tanstack-hono-tan.vercel.app",
        c.env.VITE_APP_URL,
      ].filter(Boolean);

      return allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
    },
    credentials: true,
  });
  return corsMiddleware(c, next);
});

const routes = [auth, users] as const;

routes.forEach((route) => {
  app.route("/", route);
});

export type AppType = (typeof routes)[number];

export default app;
