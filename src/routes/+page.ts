import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  try {
    const response = await fetch('/api/homepage');
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Erreur lors du chargement des données');
    }
    
    return result;
  } catch (error) {
    console.error('Erreur dans load function:', error);
    return { error: error instanceof Error ? error.message : 'Erreur inconnue' };
  }
};
