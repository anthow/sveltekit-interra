import type { PageLoad } from './$types';
import { contactContent } from '$lib/content/contact';

export const load: PageLoad = async () => {
  return {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    contacts: contactContent.contacts
=======
    allPersonneContacts: contactContent.contacts
>>>>>>> Stashed changes
=======
    allPersonneContacts: contactContent.contacts
>>>>>>> Stashed changes
  };
};
