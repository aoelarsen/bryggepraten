/* empty css                            */import { e as createAstro, f as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead } from '../astro_8c48c1cc.mjs';
import 'html-escaper';
import 'clsx';
import { a as auth, $ as $$BakromLayout } from './_token__e20fc514.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Slettbruker = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Slettbruker;
  let errorMessage = "";
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const userId = formData.get("userId");
    console.log(userId);
    if (typeof userId === "string") {
      try {
        await auth.deleteUser(userId);
        console.log("Successfully deleted user");
        Astro2.redirect("/bakrommet");
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  }
  return renderTemplate`${renderComponent($$result, "BakromLayout", $$BakromLayout, { "title": "Slett bruker" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="p-4 mx-auto max-w-2xl grid gap-8"> <h2>Slett bruker</h2> <form method="POST" class="grid gap-2 px-3 py-4 md:px-4"> <label for="userId" class="flex flex-col w-full">userId
<input type="text" id="userId" name="userId" required class="p-2 rounded-sm text-primary border invalid:border-rose-500 valid:border-green-600"> </label> <input type="submit" value="Slett bruker" class="py-2 rounded-sm bg-[#efb261] text-black text-secondary cursor-pointer hover:text-amber-100 hover:bg-yellow-900 md:w-1/2 md:justify-self-end"> </form> <p>${errorMessage}</p> </main> ` })}`;
}, "/home/anders/webstuff/bryggepraten/src/pages/bakrommet/slettbruker.astro", void 0);

const $$file = "/home/anders/webstuff/bryggepraten/src/pages/bakrommet/slettbruker.astro";
const $$url = "/bakrommet/slettbruker";

export { $$Slettbruker as default, $$file as file, prerender, $$url as url };
