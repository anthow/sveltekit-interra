import { json } from '@sveltejs/kit';

export async function GET() {
  // Cette route API n'est plus utilisée - le site utilise maintenant du contenu statique
  return json({ error: 'Cette route API n\'est plus disponible. Le site utilise maintenant du contenu statique.' }, { status: 410 });
}
