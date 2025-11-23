import { duoLangueContent } from '$lib/content/duo-langue';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  return {
    duoLangue: duoLangueContent.duoLangue
  };
};
