import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  try {
    const response = await fetch('/api/inter-act');
    if (!response.ok) {
      throw new Error('Failed to fetch ateliers data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading ateliers data:', error);
    return { interAct: null };
  }
};