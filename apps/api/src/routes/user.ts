import { Hono } from "hono";
import { getUser } from "../controllers/user-controller";
import { AppBindings } from "@/lib/types";

const users = new Hono<AppBindings>();

users.get("/:id", getUser);

export default users;
