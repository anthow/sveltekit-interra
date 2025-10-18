// Configuration DatoCMS pour SvelteKit
export const DATOCMS_API_TOKEN = import.meta.env.VITE_DATOCMS_API_TOKEN || '70922149b5b6ab9f2cbf4f2a23171a';

export const DATOCMS_CONFIG = {
  API_TOKEN: DATOCMS_API_TOKEN,
  ENVIRONMENT: 'main',
  PREVIEW_MODE: false,
  DISABLE_LIVE_RELOAD: true
};

// Configuration de l'application
export const APP_CONFIG = {
  SITE_URL: 'https://www.interra-asbl.be',
  SITE_NAME: 'INTERRA',
  LANGUAGE: 'fr'
};
