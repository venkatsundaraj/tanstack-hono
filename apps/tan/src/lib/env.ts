// import { z } from "zod";

// export const server = z.object({
//   BETTER_AUTH_SECRET: z.string().min(1),
//   GOOGLE_CLIENT_ID: z.string().min(1),
//   NODE_ENV: z
//     .enum(["test", "production", "development"])
//     .default("development"),
//   GOOGLE_CLIENT_SECRET: z.string().min(1),
//   DATABASE_URL: z.url().min(1),
//   APP_URL: z.url().min(1),
//   BETTER_AUTH_BASE_URL: z.url().min(1),
// });

// export const client = z.object({
//   VITE_APP_URL: z.url().min(1),
//   VITE_HONO_URL: z.url().min(1),
// });

// export const serverEnv = server.parse(process.env);
// export const clientEnv =
//   typeof import.meta !== "undefined" && import.meta.env
//     ? client.parse(import.meta.env)
//     : ({} as z.infer<typeof client>);

const isTest = process.env.IS_TEST === "true";

const testFallback = (
  value: string | undefined,
  fallback: string,
  name: string,
): string => {
  if (isTest) {
    return value || fallback;
  }
  if (value === undefined || value === "") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

const required = (value: string | undefined, name: string): string => {
  if (value === undefined || value === "") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

export const serverEnv = {
  GOOGLE_CLIENT_ID: testFallback(
    process.env.GOOGLE_CLIENT_ID,
    "test-google-client-id",
    "GOOGLE_CLIENT_ID",
  ),
  DATABASE_URL: isTest
    ? required(process.env.DATABASE_URL, "DATABASE_URL_TEST")
    : required(process.env.DATABASE_URL, "DATABASE_URL"),

  GOOGLE_CLIENT_SECRET: testFallback(
    process.env.GOOGLE_CLIENT_SECRET,
    "test-google-client-secret",
    "GOOGLE_CLIENT_SECRET",
  ),
  NODE_ENV: required(process.env.NODE_ENV, "NODE_ENV"),
  APP_URL: required(process.env.APP_URL, "APP_URL"),
  BETTER_AUTH_BASE_URL: required(
    process.env.BETTER_AUTH_BASE_URL,
    "BETTER_AUTH_BASE_URL",
  ),
  BETTER_AUTH_SECRET: required(
    process.env.BETTER_AUTH_SECRET,
    "BETTER_AUTH_SECRET",
  ),
};
