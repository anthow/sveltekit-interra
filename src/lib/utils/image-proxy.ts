/**
 * Génère une URL proxy pour une image Airtable
 * @param airtableUrl L'URL originale de l'image Airtable
 * @returns L'URL proxy qui contourne les problèmes CORS
 */
export function getProxiedImageUrl(airtableUrl: string | null | undefined): string | null {
  if (!airtableUrl) {
    return null;
  }

  // Si c'est déjà une URL proxy, la retourner telle quelle
  if (airtableUrl.includes('/api/image-proxy')) {
    return airtableUrl;
  }

  // Si ce n'est pas une URL Airtable, la retourner telle quelle
  if (!airtableUrl.includes('airtableusercontent.com')) {
    return airtableUrl;
  }

  // Encoder l'URL pour l'utiliser comme paramètre de requête
  const encodedUrl = encodeURIComponent(airtableUrl);
  return `/api/image-proxy?url=${encodedUrl}`;
}

