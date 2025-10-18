import { performRequest } from '../../../lib/datocms';

export async function GET() {
  const QUERY = `
    query MyQuery {
      nosProjet {
        titreDeLaPage
        texteDeLaPage
        imageDeLaPage {
          alt
          url
        }
        urlPdf
      }
      duoLangue {
        chapeau
        imageListeProjets {
          alt
          url
        }
        titre
      }
      incubateurInclusif {
        chapeau
        imageListeProjets {
          alt
          url
        }
        titre
      }
      interAct {
        chapeau
        imageListe {
          alt
          url
        }
        titre
      }
      formationInterculturelle {
        chapeau
        imageListeProjets {
          alt
          url
        }
        titre
      }
    }
  `;

  try {
    const response = await performRequest(QUERY);
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching projets data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch projets data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}