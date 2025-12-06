import type { PageLoad } from './$types';
import { contactContent } from '$lib/content/contact';

export const load: PageLoad = async () => {
  return {
    allPersonneContacts: contactContent.contacts
  };
};
