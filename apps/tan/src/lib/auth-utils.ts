import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { getCurrentUser } from "./session-utils";

export const logMiddleware = createMiddleware({ type: "function" }).server(
  async ({ next, context }) => {
    const now = Date.now();
    const result = await next();
    const duration = Date.now() - now;
    console.log("Server Req/Res:", {
      duration: `${duration}ms`,
      id: "functionId",
    });
    return result;
  },
);

export const authenticatedMiddleware = createMiddleware({ type: "function" })
  .middleware([logMiddleware])
  .server(async ({ next }) => {
    const { session, user } = await getCurrentUser();
    if (!user) {
      throw redirect({ to: "/login" });
    }

    return next({
      context: { user: { ...user }, session: { ...session } },
    });
  });

export const unAuthenticatedMiddleware = createMiddleware({ type: "function" })
  .middleware([logMiddleware])
  .server(async ({ next }) => {
    const { session, user } = await getCurrentUser();

    return next({
      context: { user: { ...user }, session: { ...session } },
    });
  });
