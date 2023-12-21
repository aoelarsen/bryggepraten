import { a as auth } from './_token__e20fc514.mjs';

const prerender = false;
const post = async (context) => {
  const session = await context.locals.auth.validate();
  if (!session) {
    return new Response("Unauthorized", {
      status: 401
    });
  }
  await auth.invalidateSession(session.sessionId);
  context.locals.auth.setSession(null);
  return context.redirect("/", 302);
};

export { post, prerender };
