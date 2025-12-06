import type { PageLoad } from './$types';
import { duoLangueContent } from '$lib/content/duo-langue';

export const load: PageLoad = async () => {
  return {
    duoLangue: duoLangueContent.duoLangue
  };
};
