import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";

type Database = ReturnType<typeof drizzle<typeof schema>>;

let client: ReturnType<typeof postgres> | null = null;
let db: Database | null = null;

export function hasDatabaseUrl() {
  return Boolean(process.env.DATABASE_URL);
}

export function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL no está configurado.");
  }

  if (!client) {
    client = postgres(process.env.DATABASE_URL, { max: 1 });
  }

  if (!db) {
    db = drizzle(client, { schema });
  }

  return db;
}
