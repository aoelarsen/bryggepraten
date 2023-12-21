/// <reference types="astro/client" />
declare namespace App {
	interface ImportMetaEnv {
		readonly BRYGGA_INNHOLD_DB_URL: string;
		readonly BRYGGA_INNHOLD_DB_TOKEN: string;
	}
	interface ImportMeta {
		readonly env: ImportMetaEnv;
	}
	interface Locals {
		auth: import("lucia").AuthRequest;
	}
}

/// <reference types="lucia" />
declare namespace Lucia {
	type Auth = import("./lib/lucia").Auth;
	type DatabaseUserAttributes = {
		username: string;
		email: string;
		email_verified: number;
	};
	type DatabaseSessionAttributes = {};
}

