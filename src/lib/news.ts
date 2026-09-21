import type { Row } from '@libsql/client';
import { getDb } from './db';
import { slugify, uniqueSlug } from './slugify';
import type { Nyhet } from './contentTypes';

const PAGE_SIZE = 8;
const SELECT_COLUMNS = 'id, tittel, dato, body, image';
const ORDER_BY = 'ORDER BY dato DESC, created_at DESC';

// libsql returns SQL NULL for an absent image; the app's Nyhet type expects it omitted.
const toNyhet = (row: Row): Nyhet => ({
	id: row.id as string,
	tittel: row.tittel as string,
	dato: row.dato as string,
	body: row.body as string,
	...(row.image ? { image: row.image as string } : {}),
});

export interface NewsPage {
	items: Nyhet[];
	page: number;
	totalPages: number;
	total: number;
}

/** Most recent news item, shown on the front page. */
export const getLatestNews = async (): Promise<Nyhet | null> => {
	const db = getDb();
	const res = await db.execute(`SELECT ${SELECT_COLUMNS} FROM news ${ORDER_BY} LIMIT 1`);
	return res.rows[0] ? toNyhet(res.rows[0]) : null;
};

/** Paginated news for the public archive. */
export const listNews = async (page = 1, pageSize = PAGE_SIZE): Promise<NewsPage> => {
	const db = getDb();
	const offset = (page - 1) * pageSize;

	const [itemsRes, countRes] = await Promise.all([
		db.execute({
			sql: `SELECT ${SELECT_COLUMNS} FROM news ${ORDER_BY} LIMIT ? OFFSET ?`,
			args: [pageSize, offset],
		}),
		db.execute('SELECT count(*) as count FROM news'),
	]);

	const total = Number(countRes.rows[0].count);

	return {
		items: itemsRes.rows.map(toNyhet),
		page,
		totalPages: Math.max(1, Math.ceil(total / pageSize)),
		total,
	};
};

/** Full, unpaginated list for the admin overview. */
export const listAllNews = async (): Promise<Nyhet[]> => {
	const db = getDb();
	const res = await db.execute(`SELECT ${SELECT_COLUMNS} FROM news ${ORDER_BY}`);
	return res.rows.map(toNyhet);
};

export const getNewsById = async (id: string): Promise<Nyhet | null> => {
	const db = getDb();
	const res = await db.execute({
		sql: `SELECT ${SELECT_COLUMNS} FROM news WHERE id = ?`,
		args: [id],
	});
	return res.rows[0] ? toNyhet(res.rows[0]) : null;
};

export interface NewsInput {
	tittel: string;
	dato: string;
	body: string;
	image?: string;
}

/** Computes a slug for a new post that doesn't collide with an existing id — call before uploading an image so the filename can reuse it. */
export const reserveNewsId = async (tittel: string): Promise<string> => {
	const db = getDb();
	const existing = await db.execute('SELECT id FROM news');
	return uniqueSlug(
		slugify(tittel),
		existing.rows.map((row) => String(row.id)),
	);
};

export const createNews = async (id: string, input: NewsInput): Promise<Nyhet> => {
	const db = getDb();
	await db.execute({
		sql: 'INSERT INTO news (id, tittel, dato, body, image) VALUES (?, ?, ?, ?, ?)',
		args: [id, input.tittel, input.dato, input.body, input.image ?? null],
	});

	return { id, ...input };
};

export const updateNews = async (id: string, input: NewsInput): Promise<void> => {
	const db = getDb();
	await db.execute({
		sql: 'UPDATE news SET tittel = ?, dato = ?, body = ?, image = ? WHERE id = ?',
		args: [input.tittel, input.dato, input.body, input.image ?? null, id],
	});
};

export const deleteNews = async (id: string): Promise<void> => {
	const db = getDb();
	await db.execute({ sql: 'DELETE FROM news WHERE id = ?', args: [id] });
};
