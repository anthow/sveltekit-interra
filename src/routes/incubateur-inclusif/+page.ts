import { incubateurInclusifContent } from '$lib/content/incubateur-inclusif';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  return {
    incubateurInclusif: incubateurInclusifContent.incubateurInclusif
  };
};
