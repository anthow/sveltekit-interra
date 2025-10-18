import { json } from '@sveltejs/kit';
import { performRequest } from '$lib/datocms.js';

export async function GET() {
  try {
           const query = `
             query {
               histoireDe {
                 id
                 nomDeLActivit
                 nomDeLaPersonne
                 textePageDAccueil
                 url
                 imageAccueil {
                   url
                   alt
                 }
               }
             }
           `;

    const data = await performRequest(query);
    return json(data);
  } catch (error) {
    console.error('Erreur lors de la récupération des données histoires:', error);
    return json({ error: 'Erreur lors du chargement des données' }, { status: 500 });
  }
}