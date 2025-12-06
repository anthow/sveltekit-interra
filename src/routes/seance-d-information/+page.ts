import type { PageLoad } from './$types';
import { seanceDInformationContent } from '$lib/content/seance-d-information';

export const load: PageLoad = async () => {
  return {
    sAncesDInformation: seanceDInformationContent.sAncesDInformation
  };
};
