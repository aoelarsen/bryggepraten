/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
declare namespace App {
	interface ImportMetaEnv {
		readonly BRYGGA_INNHOLD_DB_URL: string;
		readonly BRYGGA_INNHOLD_DB_TOKEN: string;
	}
	interface ImportMeta {
		readonly env: ImportMetaEnv;
	}

}

