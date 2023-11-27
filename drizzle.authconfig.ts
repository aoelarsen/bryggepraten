import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  schema: "./src/lib/authSchema.ts",
  out: "./drizzle",
  driver: "turso",
  dbCredentials: {
    url: process.env.BRYGGA_AUTH_DB_URL || 'https://turso.app',
    authToken: process.env.BRYGGA_AUTH_DB_TOKEN,
    
  }
} satisfies Config;