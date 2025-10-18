import { json } from '@sveltejs/kit';
import { performRequest } from '$lib/datocms';

export async function GET() {
  try {
    const query = `
      query {
        presse {
          id
          extrait
          logoMedia {
            url
            alt
          }
          nomDeLArticle
          nomDuMDia
          urlArticle
        }
      }
    `;

    const data = await performRequest(query);
    return json(data);
  } catch (error) {
    console.error('Erreur lors de la récupération des données presse:', error);
    return json({ error: 'Erreur lors du chargement des données' }, { status: 500 });
  }
}