/* empty css                            */import { e as createAstro, f as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead } from '../astro_8c48c1cc.mjs';
import 'html-escaper';
import 'clsx';
import { a as auth, $ as $$BakromLayout } from './_token__e20fc514.mjs';
import { LuciaError } from 'lucia';
import { i as isValidEmail } from './bruker_859a8347.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  let errorMessage = "";
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const validPassword = typeof password === "string" && password.length >= 6 && password.length <= 255;
    if (isValidEmail(email) && validPassword) {
      try {
        const key = await auth.useKey("email", email.toLowerCase(), password);
        const session2 = await auth.createSession({
          userId: key.userId,
          attributes: {}
        });
        Astro2.locals.auth.setSession(session2);
        return Astro2.redirect("/bakrommet", 302);
      } catch (e) {
        console.log(e);
        if (e instanceof LuciaError && (e.message === "AUTH_INVALID_KEY_ID" || e.message === "AUTH_INVALID_PASSWORD")) {
          errorMessage = "Feil brukernavn eller passord";
          Astro2.response.status = 400;
        } else {
          errorMessage = "Oooops, her er det noe feil. Pr\xF8v igjen senere";
          Astro2.response.status = 500;
        }
      }
    } else {
      errorMessage = "Feil brukernavn eller passord";
      Astro2.response.status = 400;
    }
  }
  const session = await Astro2.locals.auth.validate();
  if (session) {
    if (!session.user.emailVerified) {
      return Astro2.redirect("/epost-verifisering");
    }
    return Astro2.redirect("/bakrommet");
  }
  return renderTemplate`${renderComponent($$result, "BakromLayout", $$BakromLayout, { "title": "Logg inn" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="p-4 mx-auto max-w-2xl grid gap-8"> <h2>Logg inn</h2> <form method="POST"> <!-- <label class='flex flex-col w-full' for='username'
                >Brukernavn
                <input
                    type='text'
                    name='username'
                    id='username'
                    class='p-2 rounded-sm text-primary border invalid:border-rose-500 valid:border-green-600'
                /></label
            > --> <label class="flex flex-col w-full" for="email">E-post
<input type="email" name="email" id="email" class="p-2 rounded-sm text-primary border invalid:border-rose-500 valid:border-green-600"></label> <label class="flex flex-col w-full" for="password">Passord
<input type="password" name="password" id="password" class="p-2 rounded-sm text-primary border invalid:border-rose-500 valid:border-green-600"></label> <br> <input name="Logg inn" type="submit" value="Logg inn" class="py-2 rounded-sm bg-[#efb261] text-black text-secondary cursor-pointer hover:text-amber-100 hover:bg-yellow-900 md:w-1/2 md:justify-self-end"> </form> <p class="error">${errorMessage}</p> </main> ` })}`;
}, "/home/anders/webstuff/bryggepraten/src/pages/bakrommet/login.astro", void 0);

const $$file = "/home/anders/webstuff/bryggepraten/src/pages/bakrommet/login.astro";
const $$url = "/bakrommet/login";

export { $$Login as default, $$file as file, prerender, $$url as url };
