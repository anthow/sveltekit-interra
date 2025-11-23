import { json } from '@sveltejs/kit';

export async function GET() {
  return json({ error: 'Cette route API n\'est plus disponible. Le site utilise maintenant du contenu statique.' }, { status: 410 });
}
