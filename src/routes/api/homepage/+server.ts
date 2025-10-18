import { json } from '@sveltejs/kit';
import { performRequest } from '$lib/datocms.js';

export async function GET() {
  try {
    const query = `
      query {
        accueil {
          imageAgir {
            id
            url
            alt
            responsiveImage {
              webpSrcSet
            }
          }
          imageAgirAvecNous {
            url
            alt
            responsiveImage {
              webpSrcSet
            }
          }
          texteAgir
          texteAgirAvecNous
          imageAiderLesMigrants {
            url
            alt
            responsiveImage {
              webpSrcSet
            }
          }
          imageEtiquetteUn {
            url
            alt
            responsiveImage {
              webpSrcSet
            }
          }
          imageHistoireDe {
            url
            alt
            responsiveImage {
              webpSrcSet
            }
          }
          imagePartieDeux {
            url
            alt
            responsiveImage {
              webpSrcSet
            }
          }
          imageSAnceDInformation {
            url
            alt
            responsiveImage {
              webpSrcSet
            }
          }
          imagesHeader {
            url
            alt
            responsiveImage {
              webpSrcSet
            }
          }
          informationDeuxEnLigneHorsLigne
          informationTroisEnLigneHorsLigne
          informationUnEnLigneHorsLigne
          textEtiquetteDeux
          texteAiderMigrant
          texteEntreprise
          texteHeader
          textePartieDeux
          texteSAnceDInformation
          texteTiquette
          titreAgir
          titreAgirAvecNous
          titreAiderMigrant
          titreEntreprise
          titreHeader
          titrePartieDeux
          titreSAnceDInformation
          titreTiquette
        }
        histoireDe {
          nomDeLActivit
          nomDeLaPersonne
          textePageDAccueil
          imageAccueil {
            url
            alt
          }
          url
        }
        allHistoireDes {
          id
          nomDeLActivit
          nomDeLaPersonne
          textePageDAccueil
          imageAccueil {
            url
            alt
          }
          url
        }
      }
    `;

    const data = await performRequest(query);
    return json(data);
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    return json({ error: 'Erreur lors du chargement des données' }, { status: 500 });
  }
}