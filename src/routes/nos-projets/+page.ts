import type { PageLoad } from './$types';
import { nosProjetsContent } from '$lib/content/nos-projets';

export const load: PageLoad = async () => {
  return {
    nosProjet: nosProjetsContent.nosProjet
  };
};
