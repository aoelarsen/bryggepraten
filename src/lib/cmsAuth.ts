import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

export const CMS_USERNAMES = ['hansen', 'larsen', 'havnesjefen'] as const;
export type CmsUsername = (typeof CMS_USERNAMES)[number];

const HASH_ENV_KEYS: Record<CmsUsername, string> = {
	hansen: 'CMS_HANSEN_HASH',
	larsen: 'CMS_LARSEN_HASH',
	havnesjefen: 'CMS_HAVNESJEFEN_HASH',
};

const KEY_LENGTH = 64;

// Used by the one-off scripts/hash-password.mjs script to produce the value
// that goes into each CMS_*_HASH environment variable. Format: "salt:hash",
// both hex-encoded, so the salt travels alongside the hash in one string.
export const hashPassword = (password: string): string => {
	const salt = randomBytes(16).toString('hex');
	const hash = scryptSync(password, salt, KEY_LENGTH).toString('hex');
	return `${salt}:${hash}`;
};

const verifyAgainstStoredHash = (password: string, stored: string): boolean => {
	const [salt, hashHex] = stored.split(':');
	if (!salt || !hashHex) return false;

	const expected = Buffer.from(hashHex, 'hex');
	const actual = scryptSync(password, salt, KEY_LENGTH);
	if (expected.length !== actual.length) return false;

	return timingSafeEqual(expected, actual);
};

export const verifyLogin = (username: string, password: string): CmsUsername | null => {
	if (!CMS_USERNAMES.includes(username as CmsUsername)) return null;

	const envKey = HASH_ENV_KEYS[username as CmsUsername];
	const stored = import.meta.env[envKey];
	if (!stored) return null;

	return verifyAgainstStoredHash(password, stored) ? (username as CmsUsername) : null;
};
