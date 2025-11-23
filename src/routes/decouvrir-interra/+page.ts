import type { PageLoad } from './$types';
import { decouvrirInterraContent } from '$lib/content/decouvrir-interra';

export const load: PageLoad = async () => {
  return decouvrirInterraContent;
};
