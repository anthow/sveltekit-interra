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
const TABLE_NAME = 'Accueil';

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

// Fonction pour extraire un tableau d'images
function extractImages(field) {
  if (!field || !Array.isArray(field) || field.length === 0) {
    return [];
  }
  return field.map(img => ({
    url: img.url || '',
    alt: img.filename || img.title || ''
  }));
}

const homepagePath = join(__dirname, '..', 'src', 'lib', 'content', 'homepage.ts');

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

  const fields = data.records[0].fields;

  // Extraire les images
  const imagesHeader = extractImages(fields.images_header || []);
  const imagePartieDeux = extractImage(fields['Image partie deux'] || fields.image_partie_deux);
  const imageAgir = extractImage(fields.image_agir);
  const imageAgirAvecNous = extractImage(fields.image_agir_avec_nous);
  const imageHistoireDe = extractImage(fields.image_histoire_de);
  const imageInformationUn = extractImage(fields.image_information_un);
  const imageInformationTrois = extractImage(fields.image_information_trois);

  // Lire le fichier homepage.ts existant
  const homepageContent = readFileSync(homepagePath, 'utf8');

  // Mettre à jour les images
  let updatedContent = homepageContent;

  // Mettre à jour imagesHeader
  if (imagesHeader.length > 0) {
    const imagesHeaderStr = imagesHeader.map(img => 
      `      {\n        url: '${img.url}',\n        alt: '${img.alt.replace(/'/g, "\\'")}'\n      }`
    ).join(',\n');
    
    const imagesHeaderRegex = /imagesHeader:\s*\[[\s\S]*?\]/;
    updatedContent = updatedContent.replace(
      imagesHeaderRegex,
      `imagesHeader: [\n${imagesHeaderStr}\n    ]`
    );
  }

  // Mettre à jour imagePartieDeux
  if (imagePartieDeux.url) {
    const imagePartieDeuxRegex = /imagePartieDeux:\s*\{[\s\S]*?\}/;
    updatedContent = updatedContent.replace(
      imagePartieDeuxRegex,
      `imagePartieDeux: {\n      url: '${imagePartieDeux.url}',\n      alt: '${imagePartieDeux.alt.replace(/'/g, "\\'")}'\n    }`
    );
  }

  // Mettre à jour imageAgir
  if (imageAgir.url) {
    const imageAgirRegex = /imageAgir:\s*\{[\s\S]*?\}/;
    updatedContent = updatedContent.replace(
      imageAgirRegex,
      `imageAgir: {\n      url: '${imageAgir.url}',\n      alt: '${imageAgir.alt.replace(/'/g, "\\'")}'\n    }`
    );
  }

  // Mettre à jour imageAgirAvecNous
  if (imageAgirAvecNous.url) {
    const imageAgirAvecNousRegex = /imageAgirAvecNous:\s*\{[\s\S]*?\}/;
    updatedContent = updatedContent.replace(
      imageAgirAvecNousRegex,
      `imageAgirAvecNous: {\n      url: '${imageAgirAvecNous.url}',\n      alt: '${imageAgirAvecNous.alt.replace(/'/g, "\\'")}'\n    }`
    );
  }

  // Mettre à jour imageHistoireDe (dans histoireDe)
  if (imageHistoireDe.url) {
    const imageHistoireDeRegex = /imageHistoireDe:\s*\{[\s\S]*?\}/;
    updatedContent = updatedContent.replace(
      imageHistoireDeRegex,
      `imageHistoireDe: {\n      url: '${imageHistoireDe.url}',\n      alt: '${imageHistoireDe.alt.replace(/'/g, "\\'")}'\n    }`
    );
  }

  // Mettre à jour imageAccueil (dans histoireDe)
  const imageAccueil = extractImage(fields.image_information_un);
  if (imageAccueil.url) {
    const imageAccueilRegex = /imageAccueil:\s*\{[\s\S]*?\}/;
    updatedContent = updatedContent.replace(
      imageAccueilRegex,
      `imageAccueil: {\n      url: '${imageAccueil.url}',\n      alt: '${imageAccueil.alt.replace(/'/g, "\\'")}'\n    }`
    );
  }

  // Mettre à jour imageInformationUn
  if (imageInformationUn.url) {
    const imageInformationUnRegex = /imageInformationUn:\s*\{[\s\S]*?\}/;
    updatedContent = updatedContent.replace(
      imageInformationUnRegex,
      `imageInformationUn: {\n      url: '${imageInformationUn.url}',\n      alt: '${imageInformationUn.alt.replace(/'/g, "\\'")}'\n    }`
    );
  }

  // Mettre à jour imageInformationTrois
  if (imageInformationTrois.url) {
    const imageInformationTroisRegex = /imageInformationTrois:\s*\{[\s\S]*?\}/;
    updatedContent = updatedContent.replace(
      imageInformationTroisRegex,
      `imageInformationTrois: {\n      url: '${imageInformationTrois.url}',\n      alt: '${imageInformationTrois.alt.replace(/'/g, "\\'")}'\n    }`
    );
  }

  writeFileSync(homepagePath, updatedContent, 'utf8');
  console.log('✅ Images de la page d\'accueil mises à jour');
} catch (error) {
  console.error('Erreur:', error);
  process.exit(1);
}
