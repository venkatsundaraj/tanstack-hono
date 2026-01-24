import { Hono } from "hono";
import { cors } from "hono/cors";
import { auth as authHandler } from "../utils/auth";

const auth = new Hono();

auth.use(
  "/api/auth/*",
  cors({
    origin: "http://localhost:3000",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

auth.on(["POST", "GET"], "/api/auth/*", (c) => {
  return authHandler.handler(c.req.raw);
});
export default auth;
