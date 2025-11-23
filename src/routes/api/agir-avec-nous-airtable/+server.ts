import { json } from '@sveltejs/kit';

const BASE_ID = 'appYopHw9tC4B2Q5r';
const TABLE_NAME = 'Agir avec nous';

// Fonction pour extraire l'image depuis le tableau Airtable
function extractImage(field: any[] | null | undefined): { url: string; alt: string } {
  if (!field || !Array.isArray(field) || field.length === 0) {
    return { url: '', alt: '' };
  }
  const image = field[0];
  return {
    url: image.url || '',
    alt: image.filename || image.title || ''
  };
}

export async function GET() {
  try {
    const AIRTABLE_PAT = process.env.AIRTABLE_PAT;
    if (!AIRTABLE_PAT) {
      console.error('AIRTABLE_PAT not found in process.env');
      return json({ error: 'AIRTABLE_PAT not configured' }, { status: 500 });
    }

    const encodedTableName = encodeURIComponent(TABLE_NAME);
    const url = `https://api.airtable.com/v0/${BASE_ID}/${encodedTableName}?maxRecords=100`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_PAT}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Airtable API error:', response.status, errorText);
      return json({ error: 'Failed to fetch from Airtable', details: errorText }, { status: response.status });
    }

    const data = await response.json();
    
    // Convertir les données Airtable au format attendu
    if (!data.records || data.records.length === 0) {
      return json({ error: 'No records found' }, { status: 404 });
    }

    const record = data.records[0];
    const fields = record.fields;

    // Mapper les champs Airtable (snake_case) vers camelCase
    const mappedData = {
      agirAvecNou: {
        accrocheMembre: fields.accroche_membre || '',
        imageBNVole: extractImage(fields.image_b_n_vole || fields.image_bnvole),
        imageDon: extractImage(fields.image_don),
        imageDuoLange: extractImage(fields.image_duo_lange || fields.image_duo_langue),
        imageMembre: extractImage(fields.image_membre),
        imageTalent: extractImage(fields.image_talent),
        imageParticiperFormation: extractImage(fields.image_participer_formation),
        texteParticiperFormation: fields.texte_participer_formation || '',
        titreParticiperFormation: fields.titre_participer_formation || '',
        numRoDeCompte: fields.num_ro_de_compte || fields.numero_de_compte || '',
        texteBNVole: fields.texte_b_n_vole || fields.texte_bnvole || '',
        texteDon: fields.texte_don || '',
        texteDuoLangue: fields.texte_duo_lange || fields.texte_duo_langue || '',
        texteMembre: fields.texte_membre || '',
        texteTalent: fields.texte_talent || '',
        titreBNVole: fields.titre_b_n_vole || fields.titre_bnvole || '',
        titreDon: fields.titre_don || '',
        titreDuoLangue: fields.titre_duo_lange || fields.titre_duo_langue || '',
        titreMembre: fields.titre_membre || '',
        titreTalent: fields.titre_talent || ''
      }
    };

    return json(mappedData);
  } catch (error) {
    console.error('Error fetching Agir avec nous data from Airtable:', error);
    return json({ error: 'Failed to fetch data', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
