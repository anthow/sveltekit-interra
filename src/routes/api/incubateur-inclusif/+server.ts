import { json } from '@sveltejs/kit';
import { performRequest } from '$lib/datocms.js';

export async function GET() {
  try {
    const query = `
      query {
        incubateurInclusif {
          image {
            url
            alt
          }
          textePartieDeux
          textePartieUn
          titre
          titreIncubateurInclusif
        }
      }
    `;

    const data = await performRequest(query);
    return json(data);
  } catch (error) {
    console.error('Erreur lors de la récupération des données incubateur inclusif:', error);
    return json({ error: 'Erreur lors du chargement des données' }, { status: 500 });
  }
}
