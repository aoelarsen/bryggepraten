export const prerender = false

import { auth } from "../../../lib/lucia";
import { validateEmailVerificationToken } from "../../../lib/token";

import type { APIRoute } from "astro";

export const GET: APIRoute = async ({params, locals}) => {
  const {token} = params;
  console.log('----> api-route verifiseringslink token.',token);
  if (!token) {
    return new Response(null, {
      status: 400
    });
  }

  try {
    const userId = await validateEmailVerificationToken(token);
    console.log('----> userId from api-route',userId);
    const user = await auth.getUser(userId);
    console.log('----> user from api-route',user);
    if (userId === user.userId) {
      console.log('----> userId === user.userId', userId, user.userId)
    } else {console.log('----> userId !== user.userId', userId, user.userId)};

    await auth.invalidateAllUserSessions(user.userId);
    await auth.updateUserAttributes(user.userId, {
			email_verified: Number(true)
		});

    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });
    locals.auth.setSession(session);
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/bakrommet',
      },
      
    });


  } catch (e) {
    console.error('Feil i api-route-component', e)
    return new Response('Ugyldig epost-verifiseringslink', {
      status: 400
    });
  }
}