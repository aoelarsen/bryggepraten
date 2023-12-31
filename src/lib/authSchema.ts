import { sqliteTable, text, blob } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
	id: text("id").primaryKey(),
	username: text("username").notNull(),
	email: text("email").notNull().unique(),
	email_verified: blob("email_verified", { mode: 'bigint' }).notNull(),
});

export const session = sqliteTable("user_session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	activeExpires: blob("active_expires", {
		mode: "bigint"
	}).notNull(),
	idleExpires: blob("idle_expires", {
		mode: "bigint"
	}).notNull()
});

export const key = sqliteTable("user_key", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	hashedPassword: text("hashed_password")
});

export const emailVerificationToken = sqliteTable("email_verification_token", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	expires: blob("expires", {
		mode: "bigint"
	}).notNull()
});

export const passwordResetToken = sqliteTable("password_reset_token", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	expires: blob("expires", {
		mode: "bigint"
	}).notNull()
});
