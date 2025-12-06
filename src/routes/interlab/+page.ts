import type { PageLoad } from './$types';
import { incubateurInclusifContent } from '$lib/content/incubateur-inclusif';

export const load: PageLoad = async () => {
  return {
    incubateurInclusif: incubateurInclusifContent.incubateurInclusif
  };
};
