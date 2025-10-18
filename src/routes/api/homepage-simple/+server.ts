import { json } from '@sveltejs/kit';
import { performRequest } from '$lib/datocms.js';

export async function GET() {
  try {
    const query = `
      query {
        accueil {
          titreHeader
          texteHeader
          titrePartieDeux
          textePartieDeux
          imagePartieDeux {
            url
            alt
          }
          imagesHeader {
            url
            alt
          }
        }
        allInformation {
          id
          titre
          texte
          image {
            url
            alt
          }
        }
      }
    `;

    const data = await performRequest(query);
    return json(data);
  } catch (error) {
    console.error('Erreur homepage simple:', error);
    return json({ error: error.message }, { status: 500 });
  }
}
