import { z } from "zod";

export const server = z.object({
  BETTER_AUTH_SECRET: z.string().min(1),
  GOOGLE_CLIENT_ID: z.string().min(1),
  NODE_ENV: z
    .enum(["test", "production", "development"])
    .default("development"),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  DATABASE_URL: z.url().min(1),
  APP_URL: z.url().min(1),
});

export const client = z.object({
  VITE_APP_URL: z.url().min(1),
  VITE_HONO_URL: z.url().min(1),
});

export const serverEnv = server.parse(process.env);
export const clientEnv =
  typeof import.meta !== "undefined" && import.meta.env
    ? client.parse(import.meta.env)
    : ({} as z.infer<typeof client>);
