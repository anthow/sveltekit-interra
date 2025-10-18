import { performRequest } from '$lib/datocms';

const QUERY = `
  query {
    agirAvecNou {
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
    console.error('Error fetching formulaires data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch formulaires data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
