import { Hono } from "hono";
import { getUser } from "../controllers/user-controller";
import { AppBindings } from "@/lib/types";
import { createApp } from "@/lib/create-app";

const users = createApp();

users.get("/", (c) => c.json("hello world"));
users.get("/hello", (c) => c.json("hello world - hello"));
users.get("/:id", getUser);

export default users;
