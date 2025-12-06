import type { PageLoad } from './$types';
import { homepageContent } from '$lib/content/homepage';

export const load: PageLoad = async () => {
  return {
    accueil: homepageContent.accueil,
    menu: homepageContent.menu,
    histoireDe: homepageContent.histoireDe,
    allInformation: homepageContent.allInformation
  };
};
