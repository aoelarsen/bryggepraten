/* empty css                            */import { e as createAstro, f as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead, h as addAttribute } from '../astro_8c48c1cc.mjs';
import 'html-escaper';
import 'clsx';
import { $ as $$BakromLayout, g as generateEmailVerificationToken, d as db, u as user, a as auth, b as generatePasswordResetToken } from './_token__e20fc514.mjs';
import { s as sendEmailVerificationLink, i as isValidEmail, a as sendPasswordResetLink } from './bruker_859a8347.mjs';
import { eq } from 'drizzle-orm';

const $$Astro$2 = createAstro();
const prerender$2 = false;
const $$Index$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Index$2;
  const session = await Astro2.locals.auth.validate();
  if (!session)
    return Astro2.redirect("/bakrommet/login", 302);
  if (!session.user.emailVerified) {
    return Astro2.redirect("/bakrommet/epost-verifisering");
  }
  return renderTemplate`${renderComponent($$result, "BakromLayout", $$BakromLayout, { "title": "Bakrommet" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="p-4 mx-auto max-w-2xl grid gap-8"> <h2 class="text-center">Bakrommet</h2> <p>Velkommen, ${session.user.username}!</p> <p></p><pre class="p-2 bg-white border rounded-sm font-mono">                ${JSON.stringify(session, null, 2)}
            </pre> </main>  ` })}`;
}, "/home/anders/webstuff/bryggepraten/src/pages/bakrommet/index.astro", void 0);

const $$file$2 = "/home/anders/webstuff/bryggepraten/src/pages/bakrommet/index.astro";
const $$url$2 = "/bakrommet";

const index$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$2,
    file: $$file$2,
    prerender: prerender$2,
    url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro();
const prerender$1 = false;
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index$1;
  let success = false;
  let errorMessage = null;
  const session = await Astro2.locals.auth.validate();
  if (!session)
    Astro2.redirect("/bakrommet/login");
  if (session.user.emailVerified)
    Astro2.redirect("/bakrommet");
  if (Astro2.request.method === "POST") {
    try {
      const token = await generateEmailVerificationToken(session.user.userId);
      await sendEmailVerificationLink(token);
      success = true;
    } catch (e) {
      errorMessage = "Noe gikk galt";
      Astro2.response.status = 500;
      console.error(e);
    }
  }
  return renderTemplate`${renderComponent($$result, "BakromLayout", $$BakromLayout, { "title": "Epost verifisering" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="p-4 mx-auto max-w-2xl grid gap-8"> <h2>Epost verifisering</h2> <p>Your email verification link was sent to your inbox (i.e. console).</p> <h2>Send epost-verifiseringslink på nytt</h2> <form method="POST" class="grid gap-2 px-3 py-4 md:px-4"> <input type="submit" value="Send på nytt" class="py-2 mt-4 rounded-sm bg-[#efb261] text-black text-secondary cursor-pointer hover:text-amber-100 hover:bg-yellow-900 md:w-1/2 md:justify-self-start uppercase"> </form> ${success && renderTemplate`<p>Your verification link was resent</p>`} <p class="error">${errorMessage}</p> </main> ` })}`;
}, "/home/anders/webstuff/bryggepraten/src/pages/bakrommet/epost-verifisering/index.astro", void 0);

const $$file$1 = "/home/anders/webstuff/bryggepraten/src/pages/bakrommet/epost-verifisering/index.astro";
const $$url$1 = "/bakrommet/epost-verifisering";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$1,
    file: $$file$1,
    prerender: prerender$1,
    url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  let emailInput = "";
  let success = false;
  let errorMessage = null;
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const email = formData.get("email");
    if (typeof email === "string") {
      emailInput = email;
    }
    if (isValidEmail(email)) {
      try {
        const storedUser = await db.select().from(user).where(eq(user.email, email)).execute();
        console.log("storedeUser", storedUser);
        if (storedUser) {
          const user2 = await auth.transformDatabaseUser(storedUser[0]);
          console.log("userId", user2.userId);
          const token = await generatePasswordResetToken(user2.userId);
          await sendPasswordResetLink(token);
          success = true;
        } else {
          errorMessage = "User does not exist";
          Astro2.response.status = 400;
        }
      } catch (e) {
        console.error(e);
        errorMessage = "Noe gikk galt. Pr\xF8v igjen senere.";
        Astro2.response.status = 500;
      }
    } else {
      errorMessage = "Ugyldig epost";
      Astro2.response.status = 400;
    }
  }
  return renderTemplate`${renderComponent($$result, "BakromLayout", $$BakromLayout, { "title": "Nullstill bakrom" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="p-4 mx-auto max-w-2xl grid gap-8"> <h2>Nullstill passord</h2> <form method="POST" class="grid gap-2 px-3 py-4 md:px-4"> <label for="email" class="flex flex-col w-full">Epost
<input name="email" id="email"${addAttribute(emailInput, "value")} class="p-2 rounded-sm text-primary border invalid:border-rose-500 valid:border-green-600"></label> <input type="submit" value="Nullstill passord" class="py-2 rounded-sm bg-[#efb261] text-black text-secondary cursor-pointer hover:text-amber-100 hover:bg-yellow-900 md:w-1/2 md:justify-self-end"> </form> <p class="error">${errorMessage}</p> ${success ? renderTemplate`<p>Link for å nullstille passordet har blitt sendt til din epostadresse</p>` : null} <!-- <a href='/bakrommet'>Sign in</a> --> </main> ` })}
../../../lib/authSchema`;
}, "/home/anders/webstuff/bryggepraten/src/pages/bakrommet/password-reset/index.astro", void 0);

const $$file = "/home/anders/webstuff/bryggepraten/src/pages/bakrommet/password-reset/index.astro";
const $$url = "/bakrommet/password-reset";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { index$1 as a, index as b, index$2 as i };
