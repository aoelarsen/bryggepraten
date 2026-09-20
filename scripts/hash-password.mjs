// Run locally to generate a CMS_*_HASH value — never commit the plaintext password.
// Usage: node scripts/hash-password.mjs "the-password"
import { randomBytes, scryptSync } from 'node:crypto';

const password = process.argv[2];
if (!password) {
	console.error('Usage: node scripts/hash-password.mjs "the-password"');
	process.exit(1);
}

const salt = randomBytes(16).toString('hex');
const hash = scryptSync(password, salt, 64).toString('hex');

console.log(`${salt}:${hash}`);
