import { interActContent } from '$lib/content/inter-act';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  return {
    interAct: interActContent.interAct
  };
};