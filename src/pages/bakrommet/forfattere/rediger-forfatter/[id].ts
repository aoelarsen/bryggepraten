export const prerender = false

import { contentDb } from '../../../../lib/db'
import { authors } from '../../../../lib/contentSchema'
import { eq } from 'drizzle-orm'

import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ params, request }) => {
  const authorId = Number(params.id)
  const authorParams = new URL(request.url)
  const authorName = authorParams.searchParams.get('forfatterNavn')
  const authorEmail = authorParams.searchParams.get('forfatterEpost')

  

  if (authorId && authorName && authorEmail) {
    console.log('---Start update---')
    try {
      
      console.log('selected id', authorId);
      console.log('authorParams: ', authorName, '|', authorEmail);
      const updateAuthor = await contentDb.update(authors).set({
        name: authorName,
        email: authorEmail,
      }).where(eq(authors.id, authorId)).returning({updatedId: authors.id})

      console.log('Update success',updateAuthor)


      
    } catch (error) {
      console.error(error)
      return new Response(null, {
        status: 500,
        headers: {
          Location: '/bakrommet/forfattere',
        }
      });
    }
    console.log('---End update---')
    console.log('---Start redirect---')
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/bakrommet/forfattere',
      },
    });
    
  } else {
    console.log('---If statement not fullfilled redirect---')
    return new Response(null, {
      status: 500,
      headers: {
        Location: '/bakrommet/forfattere',
      }
    });
  }
  
  
}