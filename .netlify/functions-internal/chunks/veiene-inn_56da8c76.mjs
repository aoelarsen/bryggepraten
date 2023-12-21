export { renderers } from '../renderers.mjs';
export { onRequest } from '../@astro-middleware.mjs';

const page = () => import('./prerender_95ed8bfd.mjs').then(n => n.v);

export { page };
