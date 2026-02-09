import { OpenAPIHono } from "@hono/zod-openapi";
import { AppBindings, AppOpenAPI } from "@/lib/types";
import { defaultHook } from "stoker/openapi";
import { parseEnv } from "@/env";
import { notFound, serveEmojiFavicon } from "stoker/middlewares";
import onError from "@/middlewares/on-error";
import { pinoLogger } from "@/middlewares/pino-logger";
import authCors from "@/middlewares/auth-cors";
import { Hono } from "hono";

export const createRouter = function () {
  return new Hono<AppBindings>({
    strict: false,
  });
};

export const createApp = function () {
  const app = createRouter();

  app.use((c, next) => {
    // c.env = parseEnv(c.env || {});
    c.env = parseEnv(Object.assign(c.env || {}, process.env));
    return next();
  });
  // app.use("/api/auth/*", authCors);
  app.use(serveEmojiFavicon(""));
  app.use(pinoLogger());
  app.notFound(notFound);
  app.onError(onError);
  return app;
};
export function createTestApp<R extends AppOpenAPI>(router: R) {
  return createApp().route("/", router);
}
