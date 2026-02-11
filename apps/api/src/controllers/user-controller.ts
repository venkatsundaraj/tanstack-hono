import { Context } from "hono";
import { findByUserId } from "../services/user-service";

export const getUser = function (c: Context) {
  const id = c.req.param("id");
  const user = findByUserId(id);
  return c.json({
    user,
    env: {
      better_auth_url: c.env.BETTER_AUTH_URL,
      hono: c.env.VITE_HONO_URL,
      db: c.env.DATABASE_URL,
    },
  });
};
