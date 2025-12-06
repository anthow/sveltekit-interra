import type { PageLoad } from './$types';
import { presseContent } from '$lib/content/presse';

export const load: PageLoad = async () => {
  return {
    presse: presseContent.presse
  };
};
