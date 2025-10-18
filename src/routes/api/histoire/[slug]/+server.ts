import { json } from '@sveltejs/kit';
import { performRequest } from '$lib/datocms';

export async function GET({ params }) {
  try {
    const query = `
      query getHistoire($url: String!) {
        histoireDe(url: { eq: $url }) {
          imageAccueil {
            url
            alt
          }
          passions {
            url
            alt
          }
          texteParcoursDeux
          nomDeLActivit
          nomDeLaPersonne
          textePageDAccueil
          url
          id
          imageActivit {
            url
            alt
          }
          imageParcours {
            url
            alt
          }
          imagePrSentation {
            url
            alt
          }
          imageSouhait {
            url
            alt
          }
          phraseDeFin
          texteActivit
          texteLiGe
          texteParcours
          texteParcoursDeux
          texteSouhait
          textesPassions
          textPassionsDeux
        }
      }
    `;

    const variables = {
      url: params.slug
    };

    const data = await performRequest(query, variables);
    return json(data);
  } catch (error) {
    console.error('Erreur lors de la récupération des données Histoire:', error);
    return json({ error: 'Erreur lors du chargement des données' }, { status: 500 });
  }
}
