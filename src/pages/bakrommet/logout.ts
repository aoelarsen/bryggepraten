export const prerender = false;
import { auth } from "../../lib/lucia";

import type { APIRoute } from "astro";

export const post: APIRoute = async (context) => {
  const session = await context.locals.auth.validate();
  if (!session) {
    return new Response("Unauthorized", { status: 401 }); 
  }
  // Sikre at gjeldene session blir ugyldig
  await auth.invalidateSession(session.sessionId);
	// Slett session cookie
	context.locals.auth.setSession(null);
	return context.redirect("/", 302);
}