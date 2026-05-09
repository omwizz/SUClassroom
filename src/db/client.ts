import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";

type Database = ReturnType<typeof drizzle<typeof schema>>;

let client: ReturnType<typeof postgres> | null = null;
let db: Database | null = null;

function normalizeEnvValue(value: string | undefined) {
  return value?.trim().replace(/^["']|["']$/g, "") ?? "";
}

export function hasDatabaseUrl() {
  return Boolean(normalizeEnvValue(process.env.DATABASE_URL));
}

export function getDb() {
  const databaseUrl = normalizeEnvValue(process.env.DATABASE_URL);

  if (!databaseUrl) {
    throw new Error("DATABASE_URL no esta configurado.");
  }

  if (!client) {
    client = postgres(databaseUrl, {
      connect_timeout: 10,
      max: 1,
      prepare: false,
      ssl: "require",
    });
  }

  if (!db) {
    db = drizzle(client, { schema });
  }

  return db;
}
