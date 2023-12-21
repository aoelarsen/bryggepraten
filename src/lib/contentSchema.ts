import { relations, sql } from "drizzle-orm";
import { sqliteTable, text, integer, index, type TableConfig} from "drizzle-orm/sqlite-core";


// Utgivelser
export const utgivelser = sqliteTable("utgivelser", {
  id: integer("id").primaryKey(),
  books: text("books").references(() => books.id),
  calendars: text("calendars").references(() => calendars.id),
})

export const books = sqliteTable("books", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  genre: text("genre"),
  authors: text("authors").notNull(),
  releaseDate: text("release_date").notNull().default(sql`CURRENT_TIMESTAMP`),
  price: text("price").notNull(),
  status: text("status").notNull().default(''),
}, (table) => {
  return {
    titleIdx: index('title_idx').on(table.title)
  }
})

export const booksRelations = relations(books, ({one}) => ({
    authors: one(authors, {
      fields: [books.authors],
      references: [authors.id],
    }),
}))

export const calendars = sqliteTable("calendars", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  authors: text("authors").notNull(),
  release_date: text("release_date").notNull().default(sql`CURRENT_TIMESTAMP`),
  price: text("price").notNull(),
  status: text("status").notNull().default(''),
}, (table) => {
  return {
    titleIdx: index('title_idx').on(table.title)
  }
})

export const calendarsRelations = relations(calendars, ({one}) => ({
    authors: one(authors, {
      fields: [calendars.authors],
      references: [authors.id],
    }), 
}))

// Forfattere
export const authors = sqliteTable("authors", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").unique(),
  books: text("books").references(() => books.id, { onDelete: "cascade" }),
  calendars: text("calendars").references(() => calendars.id, { onDelete: "cascade" }),
}, (table) => {
  return {
    nameIdx: index('name_idx').on(table.name)
  }
})

export const authorsRelations = relations(authors, ({many}) => ({
  books: many(books),
  calendars: many(calendars),
}))

// Nyheter
export const news = sqliteTable("news", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  image: text("image_url").notNull().default(""),
  date: text("date").notNull().default(sql`CURRENT_TIMESTAMP`),
  author: text("author").notNull().references(() => authors.id),
}, (table) => {
  return {
    titleIdx: index('title_idx').on(table.title)
  }
})

// Praten
export const praten = sqliteTable("praten", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  image: text("image_url").notNull().default(""),
  date: text("date").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => {
  return {
    titleIdx: index('title_idx').on(table.title)
  }
})

export type Utgivelser = typeof utgivelser.$inferSelect;
export type InsertUtgivelser = typeof utgivelser.$inferInsert;
export type Books = typeof books.$inferSelect;
export type InsertBooks = typeof books.$inferInsert;
export type Calendars = typeof calendars.$inferSelect;
export type InsertCalendars = typeof calendars.$inferInsert;
export type Author = typeof authors.$inferSelect;
export type InsertAuthor = typeof authors.$inferInsert;
export type News = typeof news.$inferSelect;
export type InsertNews = typeof news.$inferInsert;
export type Praten = typeof praten.$inferSelect;
export type InsertPraten = typeof praten.$inferInsert;