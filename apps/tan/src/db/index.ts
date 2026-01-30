import * as schema from "@/db/schema/todo";
import { serverEnv } from "@/lib/env";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const globalConn = globalThis as unknown as {
  conn: postgres.Sql;
};

const conn = globalConn.conn ?? postgres(serverEnv.DATABASE_URL);

if (serverEnv.NODE_ENV !== "production") globalConn.conn = conn;

export const db = drizzle(conn, { schema });
