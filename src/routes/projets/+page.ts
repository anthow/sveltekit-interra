import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  try {
    const response = await fetch('/api/projets');
    if (!response.ok) {
      throw new Error('Failed to fetch projets data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading projets data:', error);
    return { 
      nosProjet: null,
      duoLangue: null,
      incubateurInclusif: null,
      interAct: null,
      formationInterculturelle: null
    };
  }
};