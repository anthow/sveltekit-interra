import { json } from '@sveltejs/kit';
import { performRequest } from '$lib/datocms';

export async function GET() {
  try {
    const query = `
      query {
        menu {
          imageLogo {
            url
            alt
          }
          imageWallonie {
            url
            alt
          }
          menuPrincipalUnAccueil
          menuPrincipalDeuxDecouvrirInterra
          menuPrincipalTroisProjets
          menuPrincipalQuatreAgenda
          menuPrincipalCinqAgirAvecNous
          menuPrincipalSixContact
          sousMenuDecouvrirInterraAdn
          sousMenuDecouvrirInterraMission
          sousMenuDecouvrirInterraPartenaires
          sousMenuDecouvrirInterraValeurs
          sousMenuDecouvrirInterraLexique
          sousMenuProjetInteract
          sousMenuProjetDuo
          sousMenuProjetFormation
          sousMenuProjetInterlab
          sousMenuAgirAvecNousDevenirCoah
          sousMenuAgirAvecNousDevenirVolontaire
          sousMenuAgirAvecNousDevenirTalent
          sousMenuAgirAvecNousFaireDon
          sousMenuAgirAvecNousFormerUnduo
          sousMenuAgirAvecNousParticiperFormation
        }
      }
    `;

    const data = await performRequest(query);
    return json(data);
  } catch (error) {
    console.error('Erreur lors de la récupération du menu:', error);
    return json({ error: 'Erreur lors du chargement du menu' }, { status: 500 });
  }
}