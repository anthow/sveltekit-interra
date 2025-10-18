import { performRequest } from '$lib/datocms';

const QUERY = `
  query MyQuery {
    allPersonneContacts {
      nomPrNom
      numRoDeTLPhone
      photo {
        url
        alt
      }
      adresseMail
      fonction
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
    console.error('Error fetching Contact data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch Contact data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}