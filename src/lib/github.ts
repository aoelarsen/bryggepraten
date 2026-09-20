const API_ROOT = 'https://api.github.com';

const repo = () => import.meta.env.GITHUB_REPO; // "owner/repo"
const branch = () => import.meta.env.GITHUB_BRANCH || 'main';
const token = () => import.meta.env.GITHUB_TOKEN;

const headers = () => ({
	Authorization: `Bearer ${token()}`,
	Accept: 'application/vnd.github+json',
	'X-GitHub-Api-Version': '2022-11-28',
});

export class GithubCommitError extends Error {}

/** Fetches a file's current content (utf-8 text) and its blob sha, or null if it doesn't exist yet. */
export const getFile = async (path: string): Promise<{ content: string; sha: string } | null> => {
	const res = await fetch(
		`${API_ROOT}/repos/${repo()}/contents/${path}?ref=${encodeURIComponent(branch())}`,
		{ headers: headers() },
	);

	if (res.status === 404) return null;
	if (!res.ok) throw new GithubCommitError(`Failed to read ${path}: ${res.status}`);

	const data = await res.json();
	// GitHub omits `content` for files over 1MB (book covers can exceed that) —
	// callers that only need the sha (e.g. putImage) still work fine.
	const content = data.content ? Buffer.from(data.content, 'base64').toString('utf-8') : '';
	return { content, sha: data.sha };
};

/**
 * Creates or updates a file in the repo, triggering a Netlify rebuild.
 * `content` is a utf-8 string for text files, or a base64 string for binary
 * files (pass `isBase64: true` in that case).
 */
export const putFile = async (
	path: string,
	content: string,
	message: string,
	options: { sha?: string; isBase64?: boolean } = {},
): Promise<void> => {
	const body = {
		message,
		content: options.isBase64 ? content : Buffer.from(content, 'utf-8').toString('base64'),
		branch: branch(),
		...(options.sha ? { sha: options.sha } : {}),
	};

	const res = await fetch(`${API_ROOT}/repos/${repo()}/contents/${path}`, {
		method: 'PUT',
		headers: { ...headers(), 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	});

	if (!res.ok) {
		const detail = await res.text();
		throw new GithubCommitError(`Failed to write ${path}: ${res.status} ${detail}`);
	}
};

/** Reads a JSON file and returns its parsed content plus the sha needed to update it. */
export const getJson = async <T>(path: string): Promise<{ data: T; sha: string } | null> => {
	const file = await getFile(path);
	if (!file) return null;
	return { data: JSON.parse(file.content) as T, sha: file.sha };
};

/** Commits an updated JSON file, re-fetching the sha first so concurrent edits don't clobber each other's blob pointer. */
export const putJson = async (path: string, data: unknown, message: string): Promise<void> => {
	const existing = await getFile(path);
	await putFile(path, JSON.stringify(data, null, 2) + '\n', message, {
		sha: existing?.sha,
	});
};

/** Commits an uploaded image file (as an ArrayBuffer) to the repo. */
export const putImage = async (
	path: string,
	fileData: ArrayBuffer,
	message: string,
): Promise<void> => {
	const base64 = Buffer.from(fileData).toString('base64');
	const existing = await getFile(path);
	await putFile(path, base64, message, { sha: existing?.sha, isBase64: true });
};
