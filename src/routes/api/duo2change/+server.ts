import { performRequest } from '../../../lib/datocms';

export async function GET() {
  const QUERY = `
    query MyQuery {
      duoLangue {
        imageRoleInterra {
          alt
          url
        }
        listeRoleInterra
        texteFinDImplication
        texteKSako
        texteOutilDeCommunication
        textePourQui
        titre
        titreFinDImplication
        titreKSako
        titrePourQui
        titreRoleInterra
        titreVotreImplication
        texteVotreImplication
        videoKSako {
          video {
            muxPlaybackId
            framerate
            duration
            streamingUrl
            thumbnailUrl
            mp4Url
          }
        }
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
    console.error('Error fetching duo2change data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch duo2change data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}