import { json } from '@sveltejs/kit';
import { performRequest } from '$lib/datocms';

export async function GET() {
  try {
    const query = `
      query {
        accueil {
          titreHeader
        }
      }
    `;

    const data = await performRequest(query);
    return json(data);
  } catch (error) {
    console.error('Erreur test accueil:', error);
    return json({ error: error.message }, { status: 500 });
  }
}
