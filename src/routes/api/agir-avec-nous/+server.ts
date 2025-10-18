import { performRequest } from '$lib/datocms';

const QUERY = `
  query {
    agirAvecNou {
      accrocheMembre
      imageBNVole {
        alt
        url
      }
      imageDon {
        alt
        url
      }
      imageDuoLange {
        alt
        url
      }
      imageMembre {
        alt
        url
      }
      imageTalent {
        alt
        url
      }
      imageParticiperFormation {
        alt
        url
      }
      texteParticiperFormation
      titreParticiperFormation
      numRoDeCompte
      texteBNVole
      texteDon
      texteDuoLangue
      texteMembre
      texteTalent
      titreBNVole
      titreDon
      titreDuoLangue
      titreMembre
      titreTalent
      titreBNVole
      titreDon
      titreDuoLangue
      titreMembre
      titreTalent
      titreParticiperFormation
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
    console.error('Error fetching Agir avec nous data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch Agir avec nous data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}