import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger les variables d'environnement depuis .env ou .env.local
let AIRTABLE_PAT = null;

// Essayer d'abord .env (peut être en UTF-16)
const envPath = join(__dirname, '..', '.env');
try {
  // Essayer UTF-8 d'abord
  let envFile;
  try {
    envFile = readFileSync(envPath, 'utf-8');
  } catch {
    // Si ça échoue, essayer UTF-16
    envFile = readFileSync(envPath, 'utf-16le');
    // Nettoyer les caractères null qui peuvent apparaître en UTF-16
    envFile = envFile.replace(/\0/g, '');
  }
  
  const lines = envFile.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    // Ignorer les lignes vides et les commentaires
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('AIRTABLE_PAT=')) {
      const match = trimmed.match(/AIRTABLE_PAT=(.+)/);
      if (match) {
        AIRTABLE_PAT = match[1].trim();
        console.log('Token AIRTABLE_PAT trouvé dans .env');
        break;
      }
    }
  }
} catch (error) {
  console.log('Erreur lors de la lecture de .env:', error.message);
  // Essayer .env.local
  const envLocalPath = join(__dirname, '..', '.env.local');
  try {
    const envFile = readFileSync(envLocalPath, 'utf-8');
    const lines = envFile.split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('AIRTABLE_PAT=')) {
        const match = trimmed.match(/AIRTABLE_PAT=(.+)/);
        if (match) {
          AIRTABLE_PAT = match[1].trim();
          console.log('Token AIRTABLE_PAT trouvé dans .env.local');
          break;
        }
      }
    }
  } catch (error2) {
    console.error('Erreur lors de la lecture de .env.local:', error2.message);
  }
}
// Charger BASE_ID depuis les variables d'environnement
let BASE_ID = process.env.AIRTABLE_BASE_ID;
if (!BASE_ID) {
  try {
    const envPath = join(__dirname, '..', '.env');
    let envFile;
    try {
      envFile = readFileSync(envPath, 'utf-8');
    } catch {
      envFile = readFileSync(envPath, 'utf-16le');
      envFile = envFile.replace(/\0/g, '');
    }
    const globalMatch = envFile.match(/AIRTABLE_BASE_ID\s*=\s*([^\r\n#]+)/);
    if (globalMatch) {
      BASE_ID = globalMatch[1].trim();
      BASE_ID = BASE_ID.replace(/^["'\s]+|["'\s]+$/g, '');
      BASE_ID = BASE_ID.replace(/\0/g, '');
    }
  } catch (e) {
    // Ignorer
  }
}

if (!BASE_ID) {
  console.error('AIRTABLE_BASE_ID n\'est pas défini dans les variables d\'environnement ou .env');
  process.exit(1);
}

const TABLE_NAME = 'Agir avec nous';

// Si le token n'a pas été trouvé, essayer de le lire depuis un fichier temporaire
if (!AIRTABLE_PAT) {
  try {
    const tokenPath = join(__dirname, '..', 'temp_token.txt');
    AIRTABLE_PAT = readFileSync(tokenPath, 'utf-8').trim();
    console.log('Token lu depuis temp_token.txt');
  } catch (e) {
    console.error('AIRTABLE_PAT n\'est pas défini dans .env, .env.local ou temp_token.txt');
    process.exit(1);
  }
}

function extractImage(field) {
  if (!field || !Array.isArray(field) || field.length === 0) {
    return { url: '', alt: '' };
  }
  const image = field[0];
  return {
    url: image.url || '',
    alt: image.filename || image.title || ''
  };
}

try {
  const encodedTableName = encodeURIComponent(TABLE_NAME);
  const url = `https://api.airtable.com/v0/${BASE_ID}/${encodedTableName}?maxRecords=100`;

  console.log('Récupération des données depuis Airtable...');
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${AIRTABLE_PAT}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Erreur API Airtable:', response.status, errorText);
    process.exit(1);
  }

  const data = await response.json();
  console.log(`Nombre d'enregistrements: ${data.records.length}`);

  if (data.records.length === 0) {
    console.error('Aucun enregistrement trouvé');
    process.exit(1);
  }

  const record = data.records[0];
  const fields = record.fields;

  console.log('Champs disponibles:', Object.keys(fields).join(', '));

  // Mapper les champs
  const mappedData = {
    agirAvecNou: {
      accrocheMembre: fields.accroche_membre || '',
      imageBNVole: extractImage(fields.image_benevole || fields.image_b_n_vole || fields.image_bnvole),
      imageDon: extractImage(fields.image_don),
      imageDuoLange: extractImage(fields.image_duo_langue || fields.image_duo_lange),
      imageMembre: extractImage(fields.image_membre),
      imageTalent: extractImage(fields.image_talent),
      imageParticiperFormation: extractImage(fields.image_participer_formation),
      texteParticiperFormation: fields.texte_participer_formation || '',
      titreParticiperFormation: fields.titre_participer_formation || '',
      numRoDeCompte: fields.num_ro_de_compte || fields.numero_de_compte || '',
      texteBNVole: fields.texte_benevole || fields.texte_b_n_vole || fields.texte_bnvole || '',
      texteDon: fields.texte_don || '',
      texteDuoLangue: fields.texte_duo_langue || fields.texte_duo_lange || '',
      texteMembre: fields.texte_membre || '',
      texteTalent: fields.texte_talent || '',
      titreBNVole: fields.titre_benevole || fields.titre_b_n_vole || fields.titre_bnvole || '',
      titreDon: fields.titre_don || '',
      titreDuoLangue: fields.titre_duo_langue || fields.titre_duo_lange || '',
      titreMembre: fields.titre_membre || '',
      titreTalent: fields.titre_talent || ''
    }
  };

  // Lire le fichier de contenu statique existant
  const contentPath = join(__dirname, '..', 'src', 'lib', 'content', 'agir-avec-nous.ts');
  let contentFile = readFileSync(contentPath, 'utf-8');

  // Fonction pour formater une image en TypeScript (sans guillemets autour des clés)
  function formatImage(image) {
    if (!image || !image.url) {
      return 'null';
    }
    const url = image.url.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    const alt = (image.alt || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    return `{\n      url: "${url}",\n      alt: "${alt}"\n    }`;
  }

  // Remplacer les valeurs vides par les données récupérées
  // Gérer les images qui sont sur plusieurs lignes (format avec ou sans guillemets autour des clés)
  const imageReplacements = [
    { pattern: /imageBNVole:\s*\{[\s\S]*?\}/s, replacement: `imageBNVole: ${formatImage(mappedData.agirAvecNou.imageBNVole)}` },
    { pattern: /imageDon:\s*\{[\s\S]*?\}/s, replacement: `imageDon: ${formatImage(mappedData.agirAvecNou.imageDon)}` },
    { pattern: /imageDuoLange:\s*\{[\s\S]*?\}/s, replacement: `imageDuoLange: ${formatImage(mappedData.agirAvecNou.imageDuoLange)}` },
    { pattern: /imageMembre:\s*\{[\s\S]*?\}/s, replacement: `imageMembre: ${formatImage(mappedData.agirAvecNou.imageMembre)}` },
    { pattern: /imageTalent:\s*\{[\s\S]*?\}/s, replacement: `imageTalent: ${formatImage(mappedData.agirAvecNou.imageTalent)}` },
    { pattern: /imageParticiperFormation:\s*\{[\s\S]*?\}/s, replacement: `imageParticiperFormation: ${formatImage(mappedData.agirAvecNou.imageParticiperFormation)}` }
  ];

  for (const { pattern, replacement } of imageReplacements) {
    contentFile = contentFile.replace(pattern, replacement);
  }

  // Remplacer les autres champs
  const replacements = {
    "accrocheMembre: ''": `accrocheMembre: ${JSON.stringify(mappedData.agirAvecNou.accrocheMembre)}`,
    "texteParticiperFormation: ''": `texteParticiperFormation: ${JSON.stringify(mappedData.agirAvecNou.texteParticiperFormation)}`,
    "titreParticiperFormation: ''": `titreParticiperFormation: ${JSON.stringify(mappedData.agirAvecNou.titreParticiperFormation)}`,
    "numRoDeCompte: ''": `numRoDeCompte: ${JSON.stringify(mappedData.agirAvecNou.numRoDeCompte)}`,
    "texteBNVole: ''": `texteBNVole: ${JSON.stringify(mappedData.agirAvecNou.texteBNVole)}`,
    "texteDon: ''": `texteDon: ${JSON.stringify(mappedData.agirAvecNou.texteDon)}`,
    "texteDuoLangue: ''": `texteDuoLangue: ${JSON.stringify(mappedData.agirAvecNou.texteDuoLangue)}`,
    "texteMembre: ''": `texteMembre: ${JSON.stringify(mappedData.agirAvecNou.texteMembre)}`,
    "texteTalent: ''": `texteTalent: ${JSON.stringify(mappedData.agirAvecNou.texteTalent)}`,
    "titreBNVole: ''": `titreBNVole: ${JSON.stringify(mappedData.agirAvecNou.titreBNVole)}`,
    "titreDon: ''": `titreDon: ${JSON.stringify(mappedData.agirAvecNou.titreDon)}`,
    "titreDuoLangue: ''": `titreDuoLangue: ${JSON.stringify(mappedData.agirAvecNou.titreDuoLangue)}`,
    "titreMembre: ''": `titreMembre: ${JSON.stringify(mappedData.agirAvecNou.titreMembre)}`,
    "titreTalent: ''": `titreTalent: ${JSON.stringify(mappedData.agirAvecNou.titreTalent)}`
  };

  for (const [old, new_] of Object.entries(replacements)) {
    contentFile = contentFile.replace(old, new_);
  }

  writeFileSync(contentPath, contentFile, 'utf-8');
  console.log('Fichier de contenu statique mis à jour avec succès!');
  console.log('Images récupérées:');
  console.log(`  - Image Membre: ${mappedData.agirAvecNou.imageMembre.url ? 'Oui' : 'Non'}`);
  console.log(`  - Image Talent: ${mappedData.agirAvecNou.imageTalent.url ? 'Oui' : 'Non'}`);
  console.log(`  - Image Don: ${mappedData.agirAvecNou.imageDon.url ? 'Oui' : 'Non'}`);

} catch (error) {
  console.error('Erreur:', error);
  process.exit(1);
}

