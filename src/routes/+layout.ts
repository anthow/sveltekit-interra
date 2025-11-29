import '../app.css';
import type { LayoutLoad } from './$types';

// Configuration pour le prerendering - site entièrement statique
export const prerender = true;

export const load: LayoutLoad = async () => {
  return {};
};

