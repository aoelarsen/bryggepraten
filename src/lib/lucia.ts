import { lucia } from "lucia";
import { astro } from "lucia/middleware";
import { libsql } from "@lucia-auth/adapter-sqlite";

import { bryggaAuthClient } from "./db.ts";

export const auth = lucia({
	adapter: libsql(bryggaAuthClient, {
		user: 'user',
		session: 'user_session',
		key: 'user_key',
	}),
  middleware: astro(),
  env: import.meta.env ? "DEV" : "PROD",
	getUserAttributes: (data) => {
		return {
			username: data.username,
			email: data.email,
			emailVerified: Boolean(data.email_verified),
		};
	}
});