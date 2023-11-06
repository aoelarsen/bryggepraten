import { lucia } from "lucia";
import { astro } from "lucia/middleware";
import { libsql } from "@lucia-auth/adapter-sqlite";

import { tursoClient } from "./db.ts";

export const auth = lucia({
	adapter: libsql(tursoClient, {
		user: 'user',
		key: 'user_key',
		session: 'user_session',
	}),
  middleware: astro(),
  env: import.meta.env ? "DEV" : "PROD",
	getUserAttributes: (data) => {
		return {
			username: data.username
		};
	}
});