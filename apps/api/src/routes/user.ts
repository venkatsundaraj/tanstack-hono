import { Hono } from "hono";
import { getUser } from "../controllers/user-controller";

const users = new Hono();

users.get("/:id", getUser);

export default users;
