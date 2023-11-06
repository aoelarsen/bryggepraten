import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';

import netlify from '@astrojs/netlify/functions';

// https://astro.build/config
export default defineConfig({
    integrations: [preact(), tailwind()],
    output: 'hybrid',
    adapter: netlify(),
});
