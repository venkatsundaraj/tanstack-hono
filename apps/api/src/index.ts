import { Hono } from "hono";
import users from "./routes/user";
import { logger } from "hono/logger";
import auth from "./routes/auth";
import { cors } from "hono/cors";
import { createApp } from "./lib/create-app";

// const app = new Hono();
// app.use("*", logger());

// app.use(
//   "*",
//   cors({
//     origin: process.env.VITE_APP_URL! as string,
//     credentials: true,
//   }),
// );

// app.get("/", (c) => {
//   return c.json("hello world");
// });

// app.route("/api/user", users);
// app.route("/", auth);

const app = createApp();

app.use("*", async (c, next) => {
  console.log(c.env.VITE_APP_URL);
  const corsMiddleware = cors({
    origin: c.env.VITE_APP_URL as string,
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
