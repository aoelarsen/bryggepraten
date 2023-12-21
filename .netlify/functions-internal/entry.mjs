import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { renderers } from './renderers.mjs';
import { manifest } from './manifest_dffcd050.mjs';

const _page0  = () => import('./chunks/generic_ad5847fa.mjs');
const _page1  = () => import('./chunks/index_6752722c.mjs');
const _page2  = () => import('./chunks/om-bryggepraten_75375e2f.mjs');
const _page3  = () => import('./chunks/praten-i-pressa_e2e271dc.mjs');
const _page4  = () => import('./chunks/bryggebutikken_7b284026.mjs');
const _page5  = () => import('./chunks/ruth-sjebane_7dafde9c.mjs');
const _page6  = () => import('./chunks/kontakt-oss_12ebc57e.mjs');
const _page7  = () => import('./chunks/underveis-kan-du-late-som-du-flyr_825c13dd.mjs');
const _page8  = () => import('./chunks/denne-fuglen-har-floyet_ec9a29f1.mjs');
const _page9  = () => import('./chunks/liv-og-leven-pa-karia_3153f82b.mjs');
const _page10  = () => import('./chunks/bryggepraten-boka_1be5eb0a.mjs');
const _page11  = () => import('./chunks/veiene-inn_56da8c76.mjs');
const _page12  = () => import('./chunks/dribble_74de63c3.mjs');
const _page13  = () => import('./chunks/index_84d4f7b3.mjs');
const _page14  = () => import('./chunks/index_a06c59d7.mjs');
const _page15  = () => import('./chunks/_token__30c812ca.mjs');
const _page16  = () => import('./chunks/index_5f4a0252.mjs');
const _page17  = () => import('./chunks/_token__1445a3c7.mjs');
const _page18  = () => import('./chunks/slettbruker_71ff8cd5.mjs');
const _page19  = () => import('./chunks/bruker_d1147133.mjs');
const _page20  = () => import('./chunks/logout_d1461a75.mjs');
const _page21  = () => import('./chunks/login_0dd70545.mjs');const pageMap = new Map([["node_modules/astro/dist/assets/endpoint/generic.js", _page0],["src/pages/index.astro", _page1],["src/pages/om-bryggepraten.astro", _page2],["src/pages/praten-i-pressa.astro", _page3],["src/pages/bryggebutikken.astro", _page4],["src/pages/ruth-sjebane.astro", _page5],["src/pages/kontakt-oss.astro", _page6],["src/pages/utgivelser/underveis-kan-du-late-som-du-flyr.astro", _page7],["src/pages/utgivelser/denne-fuglen-har-floyet.astro", _page8],["src/pages/utgivelser/liv-og-leven-pa-karia.astro", _page9],["src/pages/utgivelser/bryggepraten-boka.astro", _page10],["src/pages/utgivelser/veiene-inn.astro", _page11],["src/pages/utgivelser/dribble.astro", _page12],["src/pages/bakrommet/index.astro", _page13],["src/pages/bakrommet/epost-verifisering/index.astro", _page14],["src/pages/bakrommet/epost-verifisering/[token].ts", _page15],["src/pages/bakrommet/password-reset/index.astro", _page16],["src/pages/bakrommet/password-reset/[token].astro", _page17],["src/pages/bakrommet/slettbruker.astro", _page18],["src/pages/bakrommet/bruker.astro", _page19],["src/pages/bakrommet/logout.ts", _page20],["src/pages/bakrommet/login.astro", _page21]]);
const _manifest = Object.assign(manifest, {
	pageMap,
	renderers,
});
const _args = {};

const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler, pageMap };
