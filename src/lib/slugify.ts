export const slugify = (text: string): string =>
	text
		.toLowerCase()
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '') // strip accents (æ/ø/å survive as themselves below)
		.replace(/[øØ]/g, 'o')
		.replace(/[æÆ]/g, 'ae')
		.replace(/[åÅ]/g, 'a')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');

/** Appends -2, -3, ... until the slug doesn't collide with an existing one. */
export const uniqueSlug = (base: string, existing: string[]): string => {
	if (!existing.includes(base)) return base;
	let i = 2;
	while (existing.includes(`${base}-${i}`)) i++;
	return `${base}-${i}`;
};
