/* empty css                            */import { e as createAstro, f as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead } from '../astro_8c48c1cc.mjs';
import 'html-escaper';
import 'clsx';
import { a as auth, g as generateEmailVerificationToken, $ as $$BakromLayout } from './_token__e20fc514.mjs';
import { LibsqlError } from '@libsql/client';

const currentUrl = Object.assign({"BASE_URL":"/","MODE":"production","DEV":false,"PROD":true,"SSR":true,"SITE":undefined,"ASSETS_PREFIX":undefined}, {}) ? "localhost:4321/bakrommet" : "https://bryggeprate.no/bakrommet";
const sendEmailVerificationLink = async (token) => {
  const url = `${currentUrl}/epost-verifisering/${token}`;
  console.log(`Your email verification link is: ${url}`);
};
const sendPasswordResetLink = async (token) => {
  const url = `${currentUrl}/password-reset/${token}`;
  console.log(`Your password reset link: ${url}`);
};
const isValidEmail = (maybeEmail) => {
  if (typeof maybeEmail !== "string")
    return false;
  if (maybeEmail.length > 255)
    return false;
  const emailRegexp = /^.+@.+$/;
  return emailRegexp.test(maybeEmail);
};

const $$Astro = createAstro();
const prerender = false;
const $$Bruker = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Bruker;
  let errorMessage = "";
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const validUsername = typeof username === "string" && username.length >= 4 && username.length <= 31;
    const validPassword = typeof password === "string" && password.length >= 6 && password.length <= 255;
    if (validUsername && validPassword && isValidEmail(email)) {
      try {
        const user = await auth.createUser({
          key: {
            providerId: "email",
            // auth method
            providerUserId: email.toLowerCase(),
            // unique id when using "email" auth method
            password
            // hashed by Lucia
          },
          attributes: {
            username,
            email: email.toLowerCase(),
            email_verified: Number(false)
          }
        });
        const session2 = await auth.createSession({
          userId: user.userId,
          attributes: {}
        });
        Astro2.locals.auth.setSession(session2);
        const token = await generateEmailVerificationToken(user.userId);
        await sendEmailVerificationLink(token);
        return Astro2.redirect("/bakrommet/epost-verifisering", 302);
      } catch (e) {
        console.error(e);
        if (e instanceof LibsqlError && e.code === "SERVER_ERROR") {
          console.error(e);
          errorMessage = e.code;
        }
        if (e instanceof LibsqlError && e.code === "LIBSQL_CONSTRAINT_UNIQUE") {
          errorMessage = "Brukernavnet er allerede i bruk.";
          Astro2.response.status = 400;
        } else {
          errorMessage = "Ukjent feil. Sjekk konsollen.";
          Astro2.response.status = 500;
        }
      }
    }
  } else {
    errorMessage = "Feil i input.";
    Astro2.response.status = 400;
  }
  const session = await Astro2.locals.auth.validate();
  if (!session)
    return Astro2.redirect("/bakrommet/login", 302);
  if (!session.user.emailVerified) {
    return Astro2.redirect("/bakrommet/epost-verifisering");
  }
  return renderTemplate`${renderComponent($$result, "BakromLayout", $$BakromLayout, { "title": "Lag bruker" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="p-4 mx-auto max-w-2xl grid gap-8"> <h2>Opprett nye brukere</h2> <form method="POST" class="grid gap-2 px-3 py-4 md:px-4"> <label class="flex flex-col w-full" for="username">Brukernavn
<input type="text" name="username" id="username" class="p-2 rounded-sm text-primary border invalid:border-rose-500 valid:border-green-600"></label> <label class="flex flex-col w-full" for="email">Epost
<input type="email" name="email" id="email" class="p-2 rounded-sm text-primary border invalid:border-rose-500 valid:border-green-600"></label> <label class="flex flex-col w-full" for="password">Passord
<input type="password" name="password" id="password" class="p-2 rounded-sm text-primary border invalid:border-rose-500 valid:border-green-600"></label> <br> <input name="Opprett bruker" type="submit" value="Opprett bruker" class="py-2 rounded-sm bg-[#efb261] text-black text-secondary cursor-pointer hover:text-amber-100 hover:bg-yellow-900 md:w-1/2 md:justify-self-end"> </form> <p class="error">${errorMessage}</p> </main> ` })}`;
}, "/home/anders/webstuff/bryggepraten/src/pages/bakrommet/bruker.astro", void 0);

const $$file = "/home/anders/webstuff/bryggepraten/src/pages/bakrommet/bruker.astro";
const $$url = "/bakrommet/bruker";

const bruker = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Bruker,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { sendPasswordResetLink as a, bruker as b, isValidEmail as i, sendEmailVerificationLink as s };
