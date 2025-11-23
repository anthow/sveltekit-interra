import { projetsContent } from '$lib/content/projets';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  return projetsContent;
};