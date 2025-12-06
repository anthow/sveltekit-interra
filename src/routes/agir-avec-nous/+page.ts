import type { PageLoad } from './$types';
import { agirAvecNousContent } from '$lib/content/agir-avec-nous';

export const load: PageLoad = async () => {
  return {
    agirAvecNou: agirAvecNousContent.agirAvecNou
  };
};
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
