import { Environment } from "@/env";
import { PinoLogger } from "hono-pino";
import { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import { Session, User } from "better-auth";

export interface AppBindings {
  Bindings: Environment;
  Variables: {
    logger: PinoLogger;
    user: User;
    session: Session;
  };
}

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouterHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;
