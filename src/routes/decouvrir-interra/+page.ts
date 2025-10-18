import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  try {
    const response = await fetch('/api/decouvrir-interra');
    const result = await response.json();
    
    if (result.error) {
      console.error('Erreur API:', result.error);
      return { 
        decouvrirInterra: null 
      };
    }
    
    return result;
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error);
    return { 
      decouvrirInterra: null 
    };
  }
};
