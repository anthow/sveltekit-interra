import { json } from '@sveltejs/kit';
import { performRequest } from '$lib/datocms';

export async function GET() {
  try {
    const query = `
      query {
        decouvrirInterra {
          deuxConstats
          imageAdn {
            url
            alt
          }
          imageLien {
            url
            alt
          }
          imageMission {
            url
            alt
          }
          imageValeurs {
            url
            alt
          }
          imagesNosPartenaires {
            url
            alt
            customData
          }
          introductionListeConstat
          listeDeuxConstats
          listeLien
          listeValeurs
          texteDeuxConstatsDeux
          texteDeuxConstatsUn
          texteLien
          texteNosMissions
          textePourquoiInterra
          texteQuiSommesNous
          titreAdn
          titreLien
          titreNosMissions
          titreNosPartenaires
          titreNosProjets
          titrePourquoiInterra
          titreQuiSommesNous
          titreValeurs
          phraseLien
          introductionLexique
          texteLexique
          titreLexique
        }
      }
    `;

    const data = await performRequest(query);
    return json(data);
  } catch (error) {
    console.error('Erreur lors de la récupération des données Découvrir Interra:', error);
    return json({ error: 'Erreur lors du chargement des données' }, { status: 500 });
  }
}
