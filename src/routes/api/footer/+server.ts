import { json } from '@sveltejs/kit';
import { performRequest } from '$lib/datocms';

export async function GET() {
  try {
    const query = `
      query {
        footer {
          soutiens {
            url
            alt
            customData
          }
        }
      }
    `;

    const data = await performRequest(query);
    return json(data);
  } catch (error) {
    console.error('Erreur lors de la récupération du footer:', error);
    return json({ error: 'Erreur lors du chargement du footer' }, { status: 500 });
  }
}
