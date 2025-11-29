import { json } from '@sveltejs/kit';

// Cette route API n'est plus utilisée - le site est maintenant entièrement statique
export const prerender = false;

export async function GET() {
  return json({ error: 'Cette route API n\'est plus disponible. Le site utilise maintenant du contenu statique.' }, { status: 410 });
}
