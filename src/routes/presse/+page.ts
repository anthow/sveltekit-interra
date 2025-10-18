import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  try {
    const response = await fetch('/api/presse');
    const result = await response.json();
    
    if (result.error) {
      console.error('Erreur API:', result.error);
      return { 
        presse: null 
      };
    }
    
    return result;
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error);
    return { 
      presse: null 
    };
  }
};
