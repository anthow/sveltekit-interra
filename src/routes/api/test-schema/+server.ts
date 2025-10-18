import { json } from '@sveltejs/kit';
import { performRequest } from '$lib/datocms';

export async function GET() {
  try {
    const query = `
      query {
        __schema {
          queryType {
            fields {
              name
              type {
                name
              }
            }
          }
        }
      }
    `;

    const data = await performRequest(query);
    return json(data);
  } catch (error) {
    console.error('Erreur test schema:', error);
    return json({ error: error.message }, { status: 500 });
  }
}
