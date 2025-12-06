import type { PageLoad } from './$types';
import { homepageContent } from '$lib/content/homepage';

export const load: PageLoad = async () => {
  return {
    accueil: {
      titreTiquette: homepageContent.accueil.titreTiquette,
      texteTiquette: homepageContent.accueil.texteTiquette,
      textEtiquetteDeux: homepageContent.accueil.textEtiquetteDeux,
      imageEtiquetteUn: homepageContent.accueil.imageEtiquetteUn
    }
  };
};
