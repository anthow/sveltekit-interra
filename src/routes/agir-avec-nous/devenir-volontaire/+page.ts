import { agirAvecNousContent } from '$lib/content/agir-avec-nous';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  return {
    agirAvecNou: agirAvecNousContent.agirAvecNou
  };
};
