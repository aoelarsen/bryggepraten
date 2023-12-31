import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  schema: "./src/lib/contentSchema.ts",
  out: "./drizzle/content",
  driver: "turso",
  dbCredentials: {
    url: process.env.BRYGGA_INNHOLD_DB_URL || 'https://turso.app',
    authToken: process.env.BRYGGA_INNHOLD_DB_TOKEN,
  }
} satisfies Config;