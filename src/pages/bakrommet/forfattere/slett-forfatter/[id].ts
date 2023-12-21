export const prerender = false

import { contentDb } from '../../../../lib/db'
import { authors } from '../../../../lib/contentSchema'
import { eq } from 'drizzle-orm'

import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ params }) => {
  const authorId = Number(params.id)
  console.log('deleted id', authorId);

  try {
    const deleteAuthor = await contentDb.delete(authors).where(eq(authors.id, authorId)).returning({deletedId: authors.id})
    console.log('deleteAuthor', deleteAuthor);
  } catch (error) {
    console.error(error)
    return new Response(null, {
      status: 500,
      headers: {
        Location: '/bakrommet/forfattere',
      }
    });
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: '/bakrommet/forfattere',
    },
  });
}