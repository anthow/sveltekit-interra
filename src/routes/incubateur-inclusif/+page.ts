import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  try {
    const response = await fetch('/api/incubateur-inclusif');
    const result = await response.json();
    
    if (result.error) {
      console.error('Erreur API:', result.error);
      return { 
        incubateurInclusif: null 
      };
    }
    
    return result;
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error);
    return { 
      incubateurInclusif: null 
    };
  }
};
