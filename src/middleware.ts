import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
	const { pathname } = context.url;

	if (!pathname.startsWith('/bakrommet')) return next();
	if (pathname === '/bakrommet/login') return next();

	const user = await context.session?.get('user');
	if (!user) return context.redirect('/bakrommet/login');

	return next();
});
