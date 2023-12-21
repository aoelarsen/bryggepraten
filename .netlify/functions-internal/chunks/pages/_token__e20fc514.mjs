import '@astrojs/internal-helpers/path';
/* empty css                            */import { e as createAstro, f as createComponent, A as AstroError, g as ImageMissingAlt, r as renderTemplate, m as maybeRenderHead, h as addAttribute, s as spreadAttributes, i as renderComponent, j as renderHead, k as renderSlot } from '../astro_8c48c1cc.mjs';
import 'html-escaper';
import 'clsx';
import { i as isESMImportedImage, g as getImage$1 } from '../astro/assets-service_e64b35dd.mjs';
import { jsx } from 'preact/jsx-runtime';
/* empty css                            */import { lucia } from 'lucia';
import { astro } from 'lucia/middleware';
import { libsql } from '@lucia-auth/adapter-sqlite';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { sqliteTable, text, blob } from 'drizzle-orm/sqlite-core';
import { isWithinExpiration, generateRandomString } from 'lucia/utils';
import { eq } from 'drizzle-orm';

const bryggaAuthClient = createClient({
  url: "libsql://brygga-auth-aoelarsen.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIyMDIzLTExLTI2VDExOjMwOjI3LjM2MDI4MDI0OVoiLCJpZCI6IjE0MzEwNTBmLThjNGYtMTFlZS1hOThlLTIyMTMyMWEyMmI4NSJ9.vACHhYfU2fqNMf376OTFG49VidqS0y9Dm2kFfheeEfzV3rId75MBXcLdigTego7N33XsRgkKm8F8Ajb3aHv5DQ"
});
createClient({
  url: "libsql://brygga-innhold-aoelarsen.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIyMDIzLTExLTI2VDExOjMxOjM0LjQ5ODU2MTMxWiIsImlkIjoiMTUzMTZiM2ItOGM0Zi0xMWVlLWE5OGUtMjIxMzIxYTIyYjg1In0.KqXKTIkt_YpGfxTmxriXaw1oOktJpL7ll5cIo8yDTvwUHXsX_AfjypGfEJKRrCwbfcr7dhJ3mntyR6eTurw6Bg"
});
const db = drizzle(bryggaAuthClient);

const auth = lucia({
  adapter: libsql(bryggaAuthClient, {
    user: "user",
    session: "user_session",
    key: "user_key"
  }),
  middleware: astro(),
  env: Object.assign({"BASE_URL":"/","MODE":"production","DEV":false,"PROD":true,"SSR":true,"SITE":undefined,"ASSETS_PREFIX":undefined}, {
    _: process.env._
  }) ? "DEV" : "PROD",
  getUserAttributes: (data) => {
    return {
      username: data.username,
      email: data.email,
      emailVerified: Boolean(data.email_verified)
    };
  }
});

const $$Astro$6 = createAstro();
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  const additionalAttributes = {};
  if (image.srcSet.values.length > 0) {
    additionalAttributes.srcset = image.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(additionalAttributes)}${spreadAttributes(image.attributes)}>`;
}, "/home/anders/webstuff/bryggepraten/node_modules/astro/components/Image.astro", void 0);

const $$Astro$5 = createAstro();
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Picture;
  const defaultFormats = ["webp"];
  const defaultFallbackFormat = "png";
  const specialFormatsFallback = ["gif", "svg", "jpg", "jpeg"];
  const { formats = defaultFormats, pictureAttributes = {}, fallbackFormat, ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  const optimizedImages = await Promise.all(
    formats.map(
      async (format) => await getImage({ ...props, format, widths: props.widths, densities: props.densities })
    )
  );
  let resultFallbackFormat = fallbackFormat ?? defaultFallbackFormat;
  if (!fallbackFormat && isESMImportedImage(props.src) && specialFormatsFallback.includes(props.src.format)) {
    resultFallbackFormat = props.src.format;
  }
  const fallbackImage = await getImage({
    ...props,
    format: resultFallbackFormat,
    widths: props.widths,
    densities: props.densities
  });
  const imgAdditionalAttributes = {};
  const sourceAdditionaAttributes = {};
  if (props.sizes) {
    sourceAdditionaAttributes.sizes = props.sizes;
  }
  if (fallbackImage.srcSet.values.length > 0) {
    imgAdditionalAttributes.srcset = fallbackImage.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<picture${spreadAttributes(pictureAttributes)}> ${Object.entries(optimizedImages).map(([_, image]) => {
    const srcsetAttribute = props.densities || !props.densities && !props.widths ? `${image.src}${image.srcSet.values.length > 0 ? ", " + image.srcSet.attribute : ""}` : image.srcSet.attribute;
    return renderTemplate`<source${addAttribute(srcsetAttribute, "srcset")}${addAttribute("image/" + image.options.format, "type")}${spreadAttributes(sourceAdditionaAttributes)}>`;
  })} <img${addAttribute(fallbackImage.src, "src")}${spreadAttributes(imgAdditionalAttributes)}${spreadAttributes(fallbackImage.attributes)}> </picture>`;
}, "/home/anders/webstuff/bryggepraten/node_modules/astro/components/Picture.astro", void 0);

const imageConfig = {"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":[],"remotePatterns":[]};
					new URL("file:///home/anders/webstuff/bryggepraten/dist/");
					const getImage = async (options) => await getImage$1(options, imageConfig);

const forlagsHerrer = new Proxy({"src":"/_astro/forlagsherrer.7bd0ddc9.jpg","width":2910,"height":2227,"format":"jpg","orientation":1}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							
							return target[name];
						}
					});

const bryggebenken = new Proxy({"src":"/_astro/bryggebenken.79408763.png","width":474,"height":285,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							
							return target[name];
						}
					});

const ThisYear = () => {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return jsx("span", {
    children: year
  });
};

const $$Astro$4 = createAstro();
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead()}<footer class="p-4 mt-52 md:mt-40 grid md:grid-cols-3 place-content-center text-center bg-[#efb261] text-black relative border-t-4 border-black"> <figure class="absolute right-0 bottom-full md:bottom-[13.5rem] overflow-hidden"> ${renderComponent($$result, "Image", $$Image, { "src": bryggebenken, "alt": "gutta p\xE5 brygga", "loading": "lazy" })} </figure> <nav class="my-8 text-left col-span-2 justify-self-center"> <h4 class="font-semibold">Lettlikte lenker</h4> <ul class="leading-loose"> <li> <a href="/bryggebutikken" class="underline hover:text-yellow-900">Kjøp bøkene her</a> </li> <li> <a href="/ruth-sjebane" class="underline hover:text-yellow-900">Ruth Sjebanes Artikler og Foredrag</a> </li> <li> <a href="/praten-i-pressa" class="underline hover:text-yellow-900">Praten i Pressa</a> </li> </ul> </nav> <div class="py-2 col-span-3 w-full justify-self-center z-10 text-sm"> <p>${renderComponent($$result, "ThisYear", ThisYear, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/anders/webstuff/bryggepraten/src/components/FooterYear.tsx", "client:component-export": "default" })} &copy; Bryggekanten Forlag</p> <p>
Nettsiden er laget av <a href="https://aolar.no" class="underline hover:text-yellow-900">Aolar.no</a> </p> </div> </footer>`;
}, "/home/anders/webstuff/bryggepraten/src/components/Footer.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$3 = createAstro();
const $$AdminNav = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$AdminNav;
  const pathname = new URL(Astro2.request.url).pathname;
  const currentPath = pathname.slice(1);
  return renderTemplate(_a || (_a = __template(["", '<nav class="justify-self-end z-50"> <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8"> <div class="flex h-16 items-center justify-between"> <div class="inset-y-0 left-0 flex items-center lg:hidden"> <!-- Mobile menu button--> <button type="button" class="inline-flex items-center justify-center rounded-sm p-2 text-gray-600 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false" id="navButton"> <span class="sr-only">\xC5pne meny</span> <!--\n            Icon when menu is closed.\n\n            Heroicon name: outline/bars-3           \n          --> <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" id="openMenuIcon"> <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path> </svg> <!--\n            Icon when menu is open.\n\n            Heroicon name: outline/x-mark\n          --> <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" id="closedMenuIcon"> <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path> </svg> </button> </div> <div class="hidden lg:flex flex-1 items-center justify-center lg:items-stretch lg:justify-start"> <div class="hidden lg:ml-6 lg:block"> <div class="flex space-x-4"> ', " ", " ", " ", ' <form method="POST" action="/bakrommet/logout"> <input type="submit" value="Logg ut" class="p-2 rounded-sm bg-[#efb261] text-black text-secondary cursor-pointer hover:text-amber-100 hover:bg-yellow-900"> </form> </div> </div> </div> </div> </div> <!-- Mobile menu, show/hide based on menu state. --> <div class="hidden relative h-min lg:hidden" id="mobileMenu"> <div class="absolute right-[-0.5vw] w-[95vw] md:w-[50vw] h-min flex flex-col gap-2 rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none-1 px-2 pt-2 pb-3 border-blue-800"> ', " ", " ", " ", ` <hr class="border-gray-200"> <form method="POST" action="/bakrommet/logout" class="w-full flex justify-center"> <input type="submit" value="Logg ut" class="p-2 w-full md:w-9/12 rounded-sm bg-[#efb261] text-black text-secondary cursor-pointer hover:text-amber-100 hover:bg-yellow-900"> </form> </div> </div> </nav> <script>
    const openMenuIcon = document.getElementById('openMenuIcon');
    const closedMenuIcon = document.getElementById('closedMenuIcon');
    const menuItems = document.getElementById('mobileMenu');

    const handleNav = () => {
        openMenuIcon.classList.contains('block')
            ? openMenuIcon.classList.replace('block', 'hidden')
            : openMenuIcon.classList.replace('hidden', 'block');
        closedMenuIcon.classList.contains('block')
            ? closedMenuIcon.classList.replace('block', 'hidden')
            : closedMenuIcon.classList.replace('hidden', 'block');
        menuItems.classList.contains('hidden')
            ? menuItems.classList.replace('hidden', 'block')
            : menuItems.classList.replace('block', 'hidden');
    };

    document.getElementById('navButton').addEventListener('click', handleNav);
<\/script>`])), maybeRenderHead(), currentPath === "" ? renderTemplate`<a href="/" class="bg-gray-900 text-white px-3 py-2 rounded-sm text-sm font-medium active:text-white" aria-current="page">
Forsiden
</a>` : renderTemplate`<a href="/" class="text-blue-600 hover:text-blue-200 focus:text-blue-800 hover:bg-gray-700  px-3 py-2 rounded-sm text-sm font-medium active:text-white">
Forsiden
</a>`, currentPath === "bakrommet/praten" ? renderTemplate`<a href="/bakrommet/praten" class="bg-gray-900 text-white px-3 py-2 rounded-sm text-sm font-medium active:text-white" aria-current="page">
Praten på bakrommet
</a>` : renderTemplate`<a href="/bakrommet/praten" class="text-blue-600 hover:text-blue-200 focus:text-blue-800 hover:bg-gray-700  px-3 py-2 rounded-sm text-sm font-medium active:text-white">
Praten på bakrommet
</a>`, currentPath === "bakrommet/nyhetsavdelingen" ? renderTemplate`<a href="/bakrommet/nyhetsavdelingen" class="bg-gray-900 text-white px-3 py-2 rounded-sm text-sm font-medium active:text-white" aria-current="page">
Nyhetsavedelingen
</a>` : renderTemplate`<a href="/bakrommet/nyhetsavdelingen" class="text-blue-600 hover:text-blue-200 focus:text-blue-800 hover:bg-gray-700  px-3 py-2 rounded-sm text-sm font-medium active:text-white">
Nyhetsavedelingen
</a>`, currentPath === "bakrommet/utgivelser" ? renderTemplate`<a href="bakrommet/utgivelser" class="bg-gray-900 text-white px-3 py-2 rounded-sm text-sm font-medium active:text-white" aria-current="page">
Utgivelser
</a>` : renderTemplate`<a href="bakrommet/utgivelser" class="text-blue-600 hover:text-blue-200 focus:text-blue-800 hover:bg-gray-700  px-3 py-2 rounded-sm text-sm font-medium active:text-white">
Utgivelser
</a>`, currentPath === "" ? renderTemplate`<a href="/" class="bg-gray-900 text-white px-3 py-2 rounded-sm text-sm font-medium active:text-white" aria-current="page">
Forsiden
</a>` : renderTemplate`<a href="/" class="text-blue-600 hover:text-blue-200 focus:text-blue-800 hover:bg-gray-700  px-3 py-2 rounded-sm text-sm font-medium active:text-white">
Forsiden
</a>`, currentPath === "bakrommet/praten" ? renderTemplate`<a href="/bakrommet/praten" class="bg-gray-900 text-white px-3 py-2 rounded-sm text-sm font-medium active:text-white" aria-current="page">
Praten på bakrommet
</a>` : renderTemplate`<a href="/bakrommet/praten" class="text-blue-600 hover:text-blue-200 focus:text-blue-800 hover:bg-gray-700  px-3 py-2 rounded-sm text-sm font-medium active:text-white">
Praten på bakrommet
</a>`, currentPath === "bakrommet/nyhetsavdelingen" ? renderTemplate`<a href="/bakrommet/nyhetsavdelingen" class="bg-gray-900 text-white px-3 py-2 rounded-sm text-sm font-medium active:text-white" aria-current="page">
Nyhetsavedelingen
</a>` : renderTemplate`<a href="/bakrommet/nyhetsavdelingen" class="text-blue-600 hover:text-blue-200 focus:text-blue-800 hover:bg-gray-700  px-3 py-2 rounded-sm text-sm font-medium active:text-white">
Nyhetsavedelingen
</a>`, currentPath === "bakrommet/utgivelser" ? renderTemplate`<a href="/bakrommet/utgivelser" class="bg-gray-900 text-white px-3 py-2 rounded-sm text-sm font-medium active:text-white" aria-current="page">
Utgivelser
</a>` : renderTemplate`<a href="/bakrommet/utgivelser" class="text-blue-600 hover:text-blue-200 focus:text-blue-800 hover:bg-gray-700  px-3 py-2 rounded-sm text-sm font-medium active:text-white">
Utgivelser
</a>`);
}, "/home/anders/webstuff/bryggepraten/src/components/navigation/AdminNav.astro", void 0);

const $$Astro$2 = createAstro();
const $$AdminHeader = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$AdminHeader;
  return renderTemplate`${maybeRenderHead()}<header class="p-2 md:p-7 lg:p-10 grid grid-cols-[auto,1fr,auto] lg:grid-cols-[auto,1fr,auto,auto] grid-rows-2 md:grid-rows-1 gap-2 md:gap-4"> <a href="/bakrommet" class="self-center w-16 md:w-full"> ${renderComponent($$result, "Image", $$Image, { "src": forlagsHerrer, "alt": "Logo Bryggepraten forlag", "width": "100" })} </a> <div class="grid grid-flow-col place-content-center md:place-content-start gap-2"> <a href="/bakrommet"> <h1 class="font-bold text-2xl md:text-3xl">Bryggepratens bakrom</h1> <p>Administrasjonskontoret</p> </a> </div> ${renderComponent($$result, "AdminNav", $$AdminNav, {})} </header>`;
}, "/home/anders/webstuff/bryggepraten/src/components/AdminHeader.astro", void 0);

const $$Astro$1 = createAstro();
const $$BakromLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BakromLayout;
  const { title } = Astro2.props;
  return renderTemplate`<html> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><meta name="robots" content="noindex"><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"><link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"><link rel="manifest" href="/site.webmanifest"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body class="min-h-screen bg-gray-200 bg-gradient-to-bl from-amber-200 via-sky-300 to-blue-900 leading-relaxed"> <div class="container min-h-screen front-wrap mx-auto text-slate-900 bg-slate-200 shadow-blue-100 shadow-md"> ${renderComponent($$result, "AdminHeader", $$AdminHeader, {})} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", $$Footer, {})} </div> </body></html>`;
}, "/home/anders/webstuff/bryggepraten/src/layouts/BakromLayout.astro", void 0);

const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  username: text("username").notNull(),
  email: text("email").notNull().unique(),
  email_verified: blob("email_verified", {
    mode: "bigint"
  }).notNull()
});
sqliteTable("user_session", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id),
  activeExpires: blob("active_expires", {
    mode: "bigint"
  }).notNull(),
  idleExpires: blob("idle_expires", {
    mode: "bigint"
  }).notNull()
});
sqliteTable("user_key", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id),
  hashedPassword: text("hashed_password")
});
const emailVerificationToken = sqliteTable("email_verification_token", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id),
  expires: blob("expires", {
    mode: "bigint"
  }).notNull()
});
const passwordResetToken = sqliteTable("password_reset_token", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id),
  expires: blob("expires", {
    mode: "bigint"
  }).notNull()
});

const EXPIRES_IN = 1e3 * 60 * 60 * 2;
const generateEmailVerificationToken = async (userId) => {
  const storedUserTokens = await db.select().from(emailVerificationToken).where(eq(emailVerificationToken.userId, userId));
  if (storedUserTokens.length > 0) {
    const reusableStoredToken = storedUserTokens.find((token2) => {
      return isWithinExpiration(Number(token2.expires) - EXPIRES_IN / 2);
    });
    if (reusableStoredToken)
      return reusableStoredToken.id;
  }
  const token = generateRandomString(63);
  await db.insert(emailVerificationToken).values({
    id: token,
    expires: BigInt((/* @__PURE__ */ new Date()).getTime()) + BigInt(EXPIRES_IN),
    userId
  });
  return token;
};
const validateEmailVerificationToken = async (token) => {
  const storedToken = await db.transaction(async (trx) => {
    const storedToken2 = await trx.select().from(emailVerificationToken).where(eq(emailVerificationToken.id, token));
    if (!storedToken2)
      throw new Error("Invalid token");
    await trx.delete(emailVerificationToken).where(eq(emailVerificationToken.id, token));
    return storedToken2;
  });
  const tokenExpires = Number(storedToken[0].expires);
  if (!isWithinExpiration(tokenExpires)) {
    throw new Error("Expired token");
  }
  return storedToken[0].userId;
};
const generatePasswordResetToken = async (userId) => {
  const storedUserTokens = await db.select().from(passwordResetToken).where(eq(passwordResetToken.userId, userId));
  if (storedUserTokens.length > 0) {
    const reusableStoredToken = storedUserTokens.find((token2) => {
      return isWithinExpiration(Number(token2.expires) - EXPIRES_IN / 2);
    });
    if (reusableStoredToken)
      return reusableStoredToken.id;
  }
  const token = generateRandomString(63);
  await db.insert(passwordResetToken).values({
    id: token,
    expires: BigInt((/* @__PURE__ */ new Date()).getTime()) + BigInt(EXPIRES_IN),
    userId
  });
  return token;
};
const validatePasswordResetToken = async (token) => {
  const storedToken = await db.transaction(async (trx) => {
    const storedToken2 = await trx.select().from(passwordResetToken).where(eq(passwordResetToken.id, token));
    if (!storedToken2)
      throw new Error("Invalid token");
    await trx.delete(passwordResetToken).where(eq(passwordResetToken.id, token));
    return storedToken2;
  });
  const tokenExpires = Number(storedToken[0].expires);
  if (!isWithinExpiration(tokenExpires)) {
    throw new Error("Expired token");
  }
  return storedToken[0].userId;
};

const $$Astro = createAstro();
const prerender = false;
const $$token = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$token;
  let errorMessage = "";
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const password = formData.get("password");
    const validatePassword = typeof password === "string" && password.length >= 6 && password.length <= 255;
    if (validatePassword) {
      try {
        const { token } = Astro2.params;
        console.log("----> token fra passordnullstilling-token", token);
        if (!token) {
          return new Response(null, { status: 400 });
        }
        const userId = await validatePasswordResetToken(token);
        console.log("----> userId fra passordnullstilling-token", userId);
        let user = await auth.getUser(userId);
        console.log("----> user fra passordnullstilling-token", user);
        console.log("----> user.userId fra passordnullstilling-token", user.userId);
        console.log("----> user.email fra passordnullstilling-token", user.email);
        await auth.invalidateAllUserSessions(user.userId);
        try {
          await auth.updateKeyPassword("email", user.email, password);
        } catch (e) {
          console.error(e);
        }
        if (!user.emailVerified) {
          user = await auth.updateUserAttributes(user.userId, {
            email_verified: Number(true)
          });
        }
        const session = await auth.createSession({
          userId: user.userId,
          attributes: {}
        });
        Astro2.locals.auth.setSession(session);
        return Astro2.redirect("/bakrommet");
      } catch (e) {
        console.error(e);
        errorMessage = "Feil eller utl\xF8pt passordlink";
        Astro2.response.status = 400;
      }
    } else {
      errorMessage = "Feil passord";
      Astro2.response.status = 400;
    }
  }
  return renderTemplate`${renderComponent($$result, "BakromLayout", $$BakromLayout, { "title": "Passordnullstilling" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="p-4 mx-auto max-w-2xl grid gap-8"> <h2>Reset password</h2> <form method="POST" class="grid gap-2 px-3 py-4 md:px-4"> <label for="password" class="flex flex-col w-full">Nytt passord
<input name="password" id="password" class="p-2 rounded-sm text-primary border invalid:border-rose-500 valid:border-green-600"></label> <input type="submit" class="py-2 rounded-sm bg-[#efb261] text-black text-secondary cursor-pointer hover:text-amber-100 hover:bg-yellow-900 md:w-1/2 md:justify-self-end"> </form> <p class="error">${errorMessage}</p> </main> ` })}`;
}, "/home/anders/webstuff/bryggepraten/src/pages/bakrommet/password-reset/[token].astro", void 0);

const $$file = "/home/anders/webstuff/bryggepraten/src/pages/bakrommet/password-reset/[token].astro";
const $$url = "/bakrommet/password-reset/[token]";

const _token_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$token,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$BakromLayout as $, _token_ as _, auth as a, generatePasswordResetToken as b, $$Image as c, db as d, $$Footer as e, forlagsHerrer as f, generateEmailVerificationToken as g, imageConfig as i, user as u, validateEmailVerificationToken as v };
