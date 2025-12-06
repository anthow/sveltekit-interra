import type { PageLoad } from './$types';
import { interActContent } from '$lib/content/inter-act';

export const load: PageLoad = async () => {
  return {
    interAct: interActContent.interAct
  };
};
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
