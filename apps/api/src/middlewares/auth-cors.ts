import { cors } from "hono/cors";

export default cors({
  origin: (origin) => {
    const allowedOrigins = [
      "http://localhost:3000",
      "https://tanstack-hono-tan.vercel.app",
    ].filter(Boolean);

    return allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  },
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["POST", "GET", "OPTIONS"],
  exposeHeaders: ["Content-Length", "Set-Cookie"],
  maxAge: 86400,
  credentials: true,
});
