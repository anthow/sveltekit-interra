import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  try {
    const response = await fetch('/api/duo2change');
    if (!response.ok) {
      throw new Error('Failed to fetch duo2change data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading duo2change data:', error);
    return { duoLangue: null };
  }
};
