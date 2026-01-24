import { Hono } from "hono";
import users from "./routes/user";
import { logger } from "hono/logger";
import auth from "./routes/auth";
import { cors } from "hono/cors";

const app = new Hono();
app.use("*", logger());

app.use(
  "*",
  cors({
    origin: process.env.VITE_APP_URL! as string,
    credentials: true,
  }),
);

app.get("/", (c) => {
  return c.json("hello world");
});

app.route("/api/user", users);
app.route("/", auth);

export default app;
