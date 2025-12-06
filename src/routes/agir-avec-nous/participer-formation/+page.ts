import type { PageLoad } from './$types';
<<<<<<< Updated upstream
<<<<<<< Updated upstream

export const load: PageLoad = async ({ fetch }) => {
  try {
    const response = await fetch('/api/agir-avec-nous/formulaires');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading formulaires data:', error);
    return { agirAvecNou: null };
  }
};
=======
=======
>>>>>>> Stashed changes
import { agirAvecNousContent } from '$lib/content/agir-avec-nous';

export const load: PageLoad = async () => {
  return {
    agirAvecNou: agirAvecNousContent.agirAvecNou
  };
};

<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
