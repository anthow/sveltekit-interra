import { performRequest } from '../../../lib/datocms';

const QUERY = `
  query MyQuery {
    formationInterculturelle {
        imageFormateurDeux {
            alt
            url
          }
          imageFormateurUn {
            alt
            url
          }
          imageFormateurs {
            alt
            url
          }
          nomFormateurDeux
          nomFormateurUn
          texteFormateurDeux
          texteFormateurUn

      imageDeuxOrganiser {
        url
        alt
      }
      imageUneOrganiser {
        url
        alt
      }
      imageTroisOrganiser {
        url
        alt
      }
      texteDeuxOrganiser
      texteTroisOrganiser
      texteUnOrganiser
      texteUnUn
      titre
      titreOrganiser
    }
  }
`;

export async function GET() {
  try {
    const response = await performRequest(QUERY);
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching Formation Interculturelle data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch Formation Interculturelle data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}