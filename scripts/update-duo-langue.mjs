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
const TABLE_NAME = 'Duo langue';

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

// Fonction pour extraire la vidéo depuis le tableau Airtable
function extractVideo(field) {
  if (!field || !Array.isArray(field) || field.length === 0) {
    return { mp4Url: '' };
  }
  const video = field[0];
  return {
    mp4Url: video.url || ''
  };
}

// Fonction pour convertir les retours à la ligne en <br>
function convertNewlinesToBr(text) {
  if (!text) return '';
  return text.replace(/\n/g, '<br>');
}

const duoLanguePath = join(__dirname, '..', 'src', 'lib', 'content', 'duo-langue.ts');

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
    console.error('❌ Aucun enregistrement trouvé dans duo langue');
    process.exit(1);
  }

  const record = data.records[0];
  const fields = record.fields;

  const duoLangueContent = {
    duoLangue: {
      titre: fields.titre || 'Duo2Change',
      chapeau: convertNewlinesToBr(fields.chapeau || ''),
      imageListeProjets: extractImage(fields.image_liste_projets),
      titreKSako: fields.titre_k_sako || '',
      texteKSako: convertNewlinesToBr(fields.texte_k_sako || ''),
      titrePourQui: fields.titre_pour_qui || '',
      textePourQui: convertNewlinesToBr(fields.texte_pour_qui || ''),
      titreRoleInterra: fields.titre_role_interra || '',
      listeRoleInterra: convertNewlinesToBr(fields.liste_role_interra || ''),
      imageRoleInterra: extractImage(fields.image_role_interra),
      titreVotreImplication: fields.titre_votre_implication || '',
      texteVotreImplication: convertNewlinesToBr(fields.texte_votre_implication || ''),
      titreFinDImplication: fields.titre_fin_d_implication || '',
      texteFinDImplication: convertNewlinesToBr(fields.texte_fin_d_implication || ''),
      videoKSako: {
        video: extractVideo(fields.video_k_sako)
      }
    }
  };

  // Formater le contenu en TypeScript
  let content = 'export type DuoLangueContent = {\n';
  content += '  duoLangue: {\n';
  content += '    titre: string;\n';
  content += '    chapeau: string;\n';
  content += '    imageListeProjets: {\n';
  content += '      url: string;\n';
  content += '      alt: string;\n';
  content += '    };\n';
  content += '    titreKSako: string;\n';
  content += '    texteKSako: string;\n';
  content += '    titrePourQui: string;\n';
  content += '    textePourQui: string;\n';
  content += '    titreRoleInterra: string;\n';
  content += '    listeRoleInterra: string;\n';
  content += '    imageRoleInterra: {\n';
  content += '      url: string;\n';
  content += '      alt: string;\n';
  content += '    };\n';
  content += '    titreVotreImplication: string;\n';
  content += '    texteVotreImplication: string;\n';
  content += '    titreFinDImplication: string;\n';
  content += '    texteFinDImplication: string;\n';
  content += '    videoKSako: {\n';
  content += '      video: {\n';
  content += '        mp4Url: string;\n';
  content += '      };\n';
  content += '    };\n';
  content += '  };\n';
  content += '};\n\n';
  content += 'export const duoLangueContent: DuoLangueContent = {\n';
  content += '  duoLangue: {\n';
  content += `    titre: ${JSON.stringify(duoLangueContent.duoLangue.titre)},\n`;
  content += `    chapeau: ${JSON.stringify(duoLangueContent.duoLangue.chapeau)},\n`;
  content += '    imageListeProjets: {\n';
  content += `      url: ${JSON.stringify(duoLangueContent.duoLangue.imageListeProjets.url)},\n`;
  content += `      alt: ${JSON.stringify(duoLangueContent.duoLangue.imageListeProjets.alt)}\n`;
  content += '    },\n';
  content += `    titreKSako: ${JSON.stringify(duoLangueContent.duoLangue.titreKSako)},\n`;
  content += `    texteKSako: ${JSON.stringify(duoLangueContent.duoLangue.texteKSako)},\n`;
  content += `    titrePourQui: ${JSON.stringify(duoLangueContent.duoLangue.titrePourQui)},\n`;
  content += `    textePourQui: ${JSON.stringify(duoLangueContent.duoLangue.textePourQui)},\n`;
  content += `    titreRoleInterra: ${JSON.stringify(duoLangueContent.duoLangue.titreRoleInterra)},\n`;
  content += `    listeRoleInterra: ${JSON.stringify(duoLangueContent.duoLangue.listeRoleInterra)},\n`;
  content += '    imageRoleInterra: {\n';
  content += `      url: ${JSON.stringify(duoLangueContent.duoLangue.imageRoleInterra.url)},\n`;
  content += `      alt: ${JSON.stringify(duoLangueContent.duoLangue.imageRoleInterra.alt)}\n`;
  content += '    },\n';
  content += `    titreVotreImplication: ${JSON.stringify(duoLangueContent.duoLangue.titreVotreImplication)},\n`;
  content += `    texteVotreImplication: ${JSON.stringify(duoLangueContent.duoLangue.texteVotreImplication)},\n`;
  content += `    titreFinDImplication: ${JSON.stringify(duoLangueContent.duoLangue.titreFinDImplication)},\n`;
  content += `    texteFinDImplication: ${JSON.stringify(duoLangueContent.duoLangue.texteFinDImplication)},\n`;
  content += '    videoKSako: {\n';
  content += '      video: {\n';
  content += `        mp4Url: ${JSON.stringify(duoLangueContent.duoLangue.videoKSako.video.mp4Url)}\n`;
  content += '      }\n';
  content += '    }\n';
  content += '  }\n';
  content += '};\n';

  writeFileSync(duoLanguePath, content, 'utf8');
  console.log('✅ Contenu duo langue mis à jour');
} catch (error) {
  console.error('Erreur:', error);
  process.exit(1);
}
