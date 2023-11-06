import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

export const tursoClient = createClient({
	url: import.meta.env.TURSO_DB_URL,
  authToken: import.meta.env.TURSO_DB_TOKEN
});

export const db = drizzle(tursoClient);