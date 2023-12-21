CREATE TABLE `authors` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text,
	`books` text,
	`calendars` text,
	FOREIGN KEY (`books`) REFERENCES `books`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`calendars`) REFERENCES `calendars`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `books` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`genre` text NOT NULL,
	`authors` text NOT NULL,
	`release_date` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`price` text NOT NULL,
	`status` text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `calendars` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`authors` text NOT NULL,
	`release_date` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`price` text NOT NULL,
	`status` text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `news` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`image_url` text DEFAULT '' NOT NULL,
	`date` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`author` text NOT NULL,
	FOREIGN KEY (`author`) REFERENCES `authors`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `praten` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`image_url` text DEFAULT '' NOT NULL,
	`date` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `utgivelser` (
	`id` integer PRIMARY KEY NOT NULL,
	`books` text,
	`calendars` text,
	FOREIGN KEY (`books`) REFERENCES `books`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`calendars`) REFERENCES `calendars`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `authors_email_unique` ON `authors` (`email`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `authors` (`name`);--> statement-breakpoint
CREATE INDEX `title_idx` ON `books` (`title`);--> statement-breakpoint
CREATE INDEX `title_idx` ON `calendars` (`title`);--> statement-breakpoint
CREATE INDEX `title_idx` ON `news` (`title`);--> statement-breakpoint
CREATE INDEX `title_idx` ON `praten` (`title`);