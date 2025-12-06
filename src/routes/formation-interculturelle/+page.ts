import type { PageLoad } from './$types';
import { formationInterculturelleContent } from '$lib/content/formation-interculturelle';

export const load: PageLoad = async () => {
  return {
    formationInterculturelle: formationInterculturelleContent.formationInterculturelle
  };
};
