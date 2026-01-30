import { type Config } from "drizzle-kit";
import { defineConfig } from "drizzle-kit";

import { serverEnv } from "@/lib/env";

export default defineConfig({
  schema: "./src/db/schema/todo.ts",
  dialect: "postgresql",
  out: "./drizzle-prod",
  dbCredentials: {
    url: serverEnv.DATABASE_URL,
  },
  tablesFilter: ["tan_*"],
}) satisfies Config;
