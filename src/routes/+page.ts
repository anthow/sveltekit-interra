import type { PageLoad } from './$types';
import { homepageContent } from '$lib/content/homepage';

export const load: PageLoad = async () => {
  return homepageContent;
};
