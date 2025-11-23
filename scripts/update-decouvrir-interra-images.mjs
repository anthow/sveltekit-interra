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

const TABLE_NAME = 'Découvrir Interra';

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
    alt: img.filename || img.title || '',
    customData: null
  }));
}

const decouvrirInterraPath = join(__dirname, '..', 'src', 'lib', 'content', 'decouvrir-interra.ts');

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
  const imageAdn = extractImage(fields.Image_adn || fields.image_adn);
  const imageLien = extractImage(fields.image_lien);
  const imageMission = extractImage(fields.image_nos_missions);
  const imageValeurs = extractImage(fields.image_nos_valeurs);
  const imagesNosPartenaires = extractImages(fields.images_nos_partenaires || []);

  // Lire le fichier decouvrir-interra.ts existant
  const decouvrirInterraContent = readFileSync(decouvrirInterraPath, 'utf8');

  // Mettre à jour les images
  let updatedContent = decouvrirInterraContent;

  // Mettre à jour imageAdn
  if (imageAdn.url) {
    const imageAdnRegex = /imageAdn:\s*\{[\s\S]*?\}/;
    updatedContent = updatedContent.replace(
      imageAdnRegex,
      `imageAdn: {\n      url: "${imageAdn.url}",\n      alt: "${imageAdn.alt.replace(/"/g, '\\"')}"\n    }`
    );
  }

  // Mettre à jour imageLien
  if (imageLien.url) {
    const imageLienRegex = /imageLien:\s*\{[\s\S]*?\}/;
    updatedContent = updatedContent.replace(
      imageLienRegex,
      `imageLien: {\n      url: "${imageLien.url}",\n      alt: "${imageLien.alt.replace(/"/g, '\\"')}"\n    }`
    );
  }

  // Mettre à jour imageMission
  if (imageMission.url) {
    const imageMissionRegex = /imageMission:\s*\{[\s\S]*?\}/;
    updatedContent = updatedContent.replace(
      imageMissionRegex,
      `imageMission: {\n      url: "${imageMission.url}",\n      alt: "${imageMission.alt.replace(/"/g, '\\"')}"\n    }`
    );
  }

  // Mettre à jour imageValeurs
  if (imageValeurs.url) {
    const imageValeursRegex = /imageValeurs:\s*\{[\s\S]*?\}/;
    updatedContent = updatedContent.replace(
      imageValeursRegex,
      `imageValeurs: {\n      url: "${imageValeurs.url}",\n      alt: "${imageValeurs.alt.replace(/"/g, '\\"')}"\n    }`
    );
  }

  // Mettre à jour imagesNosPartenaires
  if (imagesNosPartenaires.length > 0) {
    const imagesNosPartenairesStr = imagesNosPartenaires.map(img => 
      `      { url: "${img.url}", alt: "${img.alt.replace(/"/g, '\\"')}", customData: null }`
    ).join(',\n');
    
    const imagesNosPartenairesRegex = /imagesNosPartenaires:\s*\[[\s\S]*?\]/;
    updatedContent = updatedContent.replace(
      imagesNosPartenairesRegex,
      `imagesNosPartenaires: [\n${imagesNosPartenairesStr}\n    ]`
    );
  }

  writeFileSync(decouvrirInterraPath, updatedContent, 'utf8');
  console.log('✅ Images de la page Découvrir Interra mises à jour');
} catch (error) {
  console.error('Erreur:', error);
  process.exit(1);
}
