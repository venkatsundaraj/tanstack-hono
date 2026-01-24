import { Context } from "hono";
import { findByUserId } from "../services/user-service";

export const getUser = function (c: Context) {
  const id = c.req.param("id");
  const user = findByUserId(id);
  return c.json(user);
};
