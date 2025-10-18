import { performRequest } from '../../../lib/datocms';

const QUERY = `
  query MyQuery {
    incubateurInclusif {
      image {
        url
        alt
      }
      textePartieDeux
      textePartieUn
      titre
      titreIncubateurInclusif
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
    console.error('Error fetching InterLab data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch InterLab data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}