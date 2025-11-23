import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, request }) => {
  const imageUrl = url.searchParams.get('url');
  
  if (!imageUrl) {
    throw error(400, 'URL parameter is required');
  }

  try {
    // Décoder l'URL
    let decodedUrl: string;
    try {
      decodedUrl = decodeURIComponent(imageUrl);
    } catch (e) {
      // Si le décodage échoue, utiliser l'URL telle quelle
      decodedUrl = imageUrl;
    }
    
    // Vérifier que l'URL est bien une URL Airtable
    if (!decodedUrl.includes('airtableusercontent.com')) {
      console.error('Invalid image URL (not Airtable):', decodedUrl);
      throw error(400, 'Invalid image URL');
    }

    // Récupérer l'image depuis Airtable
    const response = await fetch(decodedUrl, {
      headers: {
        'Referer': 'https://airtable.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7'
      },
      redirect: 'follow'
    });

    if (!response.ok) {
      const statusText = response.statusText || 'Unknown error';
      console.error(`Failed to fetch image: ${response.status} ${statusText}`, decodedUrl.substring(0, 100) + '...');
      
      // Si l'image a expiré (410) ou est introuvable (404), retourner une erreur 404
      if (response.status === 410 || response.status === 404) {
        throw error(404, 'Image not found or expired');
      }
      throw error(response.status, `Failed to fetch image: ${statusText}`);
    }

    // Récupérer le type de contenu
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    
    // Vérifier que c'est bien une image
    if (!contentType.startsWith('image/')) {
      console.error('Response is not an image:', contentType, decodedUrl.substring(0, 100));
      throw error(400, 'Response is not an image');
    }
    
    const imageBuffer = await response.arrayBuffer();

    // Retourner l'image avec les bons en-têtes CORS
    return new Response(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  } catch (err: any) {
    // Si c'est déjà une erreur SvelteKit, la relancer
    if (err?.status && err?.body) {
      throw err;
    }
    const errorMessage = err?.message || String(err) || 'Unknown error';
    console.error('Error proxying image:', errorMessage, imageUrl?.substring(0, 100));
    throw error(500, `Failed to proxy image: ${errorMessage}`);
  }
};

