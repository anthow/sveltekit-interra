import '../app.css';
import type { LayoutLoad } from './$types';

// Active le pré-rendu pour toutes les pages (mode statique/headless)
export const prerender = true;

export const load: LayoutLoad = async () => {
  return {};
};

