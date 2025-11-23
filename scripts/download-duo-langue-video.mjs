import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger les variables d'environnement depuis .env ou .env.local
let AIRTABLE_PAT = process.env.AIRTABLE_PAT || process.env.VITE_AIRTABLE_PAT || null;

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
  
  // Essayer d'abord avec une regex globale sur tout le contenu
  const globalMatch = envFile.match(/AIRTABLE_PAT\s*=\s*([^\r\n#]+)/);
  if (globalMatch) {
    AIRTABLE_PAT = globalMatch[1].trim();
    // Nettoyer les guillemets si présents
    AIRTABLE_PAT = AIRTABLE_PAT.replace(/^["']|["']$/g, '');
    console.log('Token AIRTABLE_PAT trouvé dans .env');
  } else {
    // Fallback: lire ligne par ligne
    const lines = envFile.split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      // Ignorer les lignes vides et les commentaires
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('AIRTABLE_PAT=')) {
        const match = trimmed.match(/AIRTABLE_PAT\s*=\s*(.+)/);
        if (match) {
          AIRTABLE_PAT = match[1].trim();
          AIRTABLE_PAT = AIRTABLE_PAT.replace(/^["']|["']$/g, '');
          console.log('Token AIRTABLE_PAT trouvé dans .env');
          break;
        }
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

const videosDir = join(__dirname, '..', 'static', 'videos');
const imagesDir = join(__dirname, '..', 'static', 'images');

if (!existsSync(videosDir)) {
  mkdirSync(videosDir, { recursive: true });
}

// Fonction pour télécharger une vidéo
async function downloadVideo(airtableUrl, filename) {
  if (!airtableUrl || !airtableUrl.includes('airtableusercontent.com')) {
    return null;
  }

  try {
    const response = await fetch(airtableUrl, {
      headers: {
        'Referer': 'https://airtable.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      console.error(`❌ Erreur téléchargement vidéo ${filename}: ${response.status}`);
      return null;
    }

    const buffer = await response.arrayBuffer();
    const safeFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    const localPath = join(videosDir, safeFilename);
    
    writeFileSync(localPath, Buffer.from(buffer));
    console.log(`✅ Vidéo téléchargée: ${safeFilename}`);
    
    return `/videos/${safeFilename}`;
  } catch (error) {
    console.error(`❌ Erreur téléchargement vidéo ${filename}:`, error.message);
    return null;
  }
}

// Fonction pour télécharger une image
async function downloadImage(airtableUrl, filename) {
  if (!airtableUrl || !airtableUrl.includes('airtableusercontent.com')) {
    return null;
  }

  try {
    const response = await fetch(airtableUrl, {
      headers: {
        'Referer': 'https://airtable.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      console.error(`❌ Erreur téléchargement image ${filename}: ${response.status}`);
      return null;
    }

    const buffer = await response.arrayBuffer();
    const safeFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    const localPath = join(imagesDir, safeFilename);
    
    writeFileSync(localPath, Buffer.from(buffer));
    console.log(`✅ Image téléchargée: ${safeFilename}`);
    
    return `/images/${safeFilename}`;
  } catch (error) {
    console.error(`❌ Erreur téléchargement image ${filename}:`, error.message);
    return null;
  }
}

try {
  const encodedTableName = encodeURIComponent(TABLE_NAME);
  const url = `https://api.airtable.com/v0/${BASE_ID}/${encodedTableName}?maxRecords=100`;

  console.log('Récupération des données Duo langue depuis Airtable...');
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
    console.error('❌ Aucun enregistrement trouvé dans Duo langue');
    process.exit(1);
  }

  const record = data.records[0];
  const fields = record.fields;
  const duoLanguePath = join(__dirname, '..', 'src', 'lib', 'content', 'duo-langue.ts');
  let content = readFileSync(duoLanguePath, 'utf8');
  let updated = false;

  // Télécharger la vidéo
  const videoKSako = fields.video_k_sako?.[0];
  if (videoKSako?.url) {
    const filename = videoKSako.filename || 'duo2change-intro.mp4';
    const localUrl = await downloadVideo(videoKSako.url, filename);
    
    if (localUrl) {
      content = content.replace(
        /mp4Url:\s*"[^"]*"/,
        `mp4Url: "${localUrl}"`
      );
      updated = true;
      console.log(`✅ Vidéo mise à jour: ${localUrl}`);
    }
  }

  // Télécharger l'image roleInterra
  const imageRoleInterra = fields.image_role_interra?.[0];
  if (imageRoleInterra?.url) {
    const filename = imageRoleInterra.filename || 'roleinterraduolangue.jpg';
    const localUrl = await downloadImage(imageRoleInterra.url, filename);
    
    if (localUrl) {
      content = content.replace(
        /imageRoleInterra:\s*\{[^}]*url:\s*"\/images\/[^"]+"/,
        `imageRoleInterra: {\n      url: "${localUrl}"`
      );
      updated = true;
      console.log(`✅ Image roleInterra mise à jour: ${localUrl}`);
    }
  }

  if (updated) {
    writeFileSync(duoLanguePath, content, 'utf8');
    console.log('\n✅ Téléchargement terminé!');
  } else {
    console.log('\n⚠️ Aucune mise à jour nécessaire');
  }
} catch (error) {
  console.error('Erreur:', error);
  process.exit(1);
}
