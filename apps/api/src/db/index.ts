import * as schema from "@/db/schema/todos";
import { Environment } from "@/env";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export function createDb(env: Environment) {
  const globalConn = globalThis as unknown as {
    conn: postgres.Sql;
  };

  const conn = globalConn.conn ?? postgres(env.DATABASE_URL);

  if (env.NODE_ENV !== "production") globalConn.conn = conn;

  const db = drizzle(conn, { schema });
  return db;
}
