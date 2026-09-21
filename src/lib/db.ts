import { createClient, type Client } from '@libsql/client';

let client: Client | undefined;

export const getDb = (): Client => {
	if (!client) {
		client = createClient({
			url: import.meta.env.TURSO_DATABASE_URL,
			authToken: import.meta.env.TURSO_AUTH_TOKEN,
		});
	}
	return client;
};
