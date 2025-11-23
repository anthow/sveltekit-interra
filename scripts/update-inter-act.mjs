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

const BASE_ID = 'appYopHw9tC4B2Q5r';
const TABLE_NAME = 'Inter-act';

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

// Fonction pour extraire l'image depuis le tableau Airtable
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

// Fonction pour convertir les retours à la ligne en <br>
function convertNewlinesToBr(text) {
  if (!text) return '';
  return text.replace(/\n/g, '<br>');
}

const interActPath = join(__dirname, '..', 'src', 'lib', 'content', 'inter-act.ts');

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
    console.error('❌ Aucun enregistrement trouvé dans Inter-act');
    process.exit(1);
  }

  const record = data.records[0];
  const fields = record.fields;

  // Nettoyer l'introduction en retirant "PROGRAMME DU MOIS" à la fin
  let introduction = fields.introduction || '';
  // Retirer "PROGRAMME DU MOIS" et les espaces/tirets qui suivent
  introduction = introduction.replace(/\s*PROGRAMME\s+DU\s+MOIS\s*[-–—]?\s*$/i, '').trim();
  // Convertir les retours à la ligne en <br> pour l'affichage HTML
  introduction = introduction.replace(/\n/g, '<br>');

  const interActContent = {
    interAct: {
      titre: fields.titre || 'InterAct',
      introduction: introduction,
      chapeau: convertNewlinesToBr(fields.chapeau || ''),
      imageListe: extractImage(fields.image_liste),
      imageProgrameDuMois: extractImage(fields.image_programe_du_mois)
    }
  };

  // Formater le contenu en TypeScript
  let content = 'export type InterActContent = {\n';
  content += '  interAct: {\n';
  content += '    titre: string;\n';
  content += '    introduction: string;\n';
  content += '    chapeau: string;\n';
  content += '    imageListe: {\n';
  content += '      url: string;\n';
  content += '      alt: string;\n';
  content += '    };\n';
  content += '    imageProgrameDuMois: {\n';
  content += '      url: string;\n';
  content += '      alt: string;\n';
  content += '    };\n';
  content += '  };\n';
  content += '};\n\n';
  content += 'export const interActContent: InterActContent = {\n';
  content += '  interAct: {\n';
  content += `    titre: ${JSON.stringify(interActContent.interAct.titre)},\n`;
  content += `    introduction: ${JSON.stringify(interActContent.interAct.introduction)},\n`;
  content += `    chapeau: ${JSON.stringify(interActContent.interAct.chapeau)},\n`;
  content += '    imageListe: {\n';
  content += `      url: ${JSON.stringify(interActContent.interAct.imageListe.url)},\n`;
  content += `      alt: ${JSON.stringify(interActContent.interAct.imageListe.alt)}\n`;
  content += '    },\n';
  content += '    imageProgrameDuMois: {\n';
  content += `      url: ${JSON.stringify(interActContent.interAct.imageProgrameDuMois.url)},\n`;
  content += `      alt: ${JSON.stringify(interActContent.interAct.imageProgrameDuMois.alt)}\n`;
  content += '    }\n';
  content += '  }\n';
  content += '};\n';

  writeFileSync(interActPath, content, 'utf8');
  console.log('✅ Contenu Inter-act mis à jour');
} catch (error) {
  console.error('Erreur:', error);
  process.exit(1);
}
