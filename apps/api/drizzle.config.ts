import { type Config } from "drizzle-kit";
import { defineConfig } from "drizzle-kit";

import env from "@/env-runtime";

export default defineConfig({
  schema: "./src/db/schema/todos.ts",
  dialect: "postgresql",
  out: "./drizzle-prod",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["tan_*"],
}) satisfies Config;
