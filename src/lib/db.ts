import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

export const bryggaAuthClient = createClient({
	url: import.meta.env.BRYGGA_AUTH_DB_URL,
  authToken: import.meta.env.BRYGGA_AUTH_DB_TOKEN
});

export const bryggaInnholdClient = createClient({
  url: import.meta.env.BRYGGA_INNHOLD_DB_URL,
  authToken: import.meta.env.BRYGGA_INNHOLD_DB_TOKEN,
});


export const db = drizzle(bryggaAuthClient);
export const contentDb = drizzle(bryggaInnholdClient)