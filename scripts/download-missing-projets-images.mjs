import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger le token Airtable
let AIRTABLE_PAT = null;
const envPath = join(__dirname, '..', '.env');
try {
  let envFile;
  try {
    envFile = readFileSync(envPath, 'utf-8');
  } catch {
    envFile = readFileSync(envPath, 'utf-16le');
    envFile = envFile.replace(/\0/g, '');
  }
  
  const lines = envFile.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('AIRTABLE_PAT=')) {
      const match = trimmed.match(/AIRTABLE_PAT=(.+)/);
      if (match) {
        AIRTABLE_PAT = match[1].trim();
        break;
      }
    }
  }
} catch (error) {
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
          break;
        }
      }
    }
  } catch (error2) {}
}

if (!AIRTABLE_PAT) {
  try {
    const tokenPath = join(__dirname, '..', 'temp_token.txt');
    AIRTABLE_PAT = readFileSync(tokenPath, 'utf-8').trim();
  } catch (e) {
    console.error('❌ AIRTABLE_PAT n\'est pas défini');
    process.exit(1);
  }
}

const BASE_ID = 'appYopHw9tC4B2Q5r';
const imagesDir = join(__dirname, '..', 'static', 'images');

if (!existsSync(imagesDir)) {
  mkdirSync(imagesDir, { recursive: true });
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
      console.error(`❌ Erreur téléchargement ${filename}: ${response.status}`);
      return null;
    }

    const buffer = await response.arrayBuffer();
    const safeFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    const localPath = join(imagesDir, safeFilename);
    
    writeFileSync(localPath, Buffer.from(buffer));
    console.log(`✅ Téléchargé: ${safeFilename}`);
    
    return `/images/${safeFilename}`;
  } catch (error) {
    console.error(`❌ Erreur téléchargement ${filename}:`, error.message);
    return null;
  }
}

// 1. Télécharger l'image de "Nos projets"
try {
  const TABLE_NAME = 'Nos projets';
  const encodedTableName = encodeURIComponent(TABLE_NAME);
  const url = `https://api.airtable.com/v0/${BASE_ID}/${encodedTableName}?maxRecords=100`;

  console.log('Récupération de l\'image "Nos projets" depuis Airtable...');
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${AIRTABLE_PAT}`,
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    const data = await response.json();
    if (data.records.length > 0) {
      const record = data.records[0];
      const fields = record.fields;
      const imageDeLaPage = fields.image_de_la_page?.[0];

      if (imageDeLaPage?.url) {
        const filename = imageDeLaPage.filename || 'dossier-de-presentation-interra.png';
        const localUrl = await downloadImage(imageDeLaPage.url, filename);
        
        if (localUrl) {
          const nosProjetsPath = join(__dirname, '..', 'src', 'lib', 'content', 'nos-projets.ts');
          let content = readFileSync(nosProjetsPath, 'utf8');
          content = content.replace(
            /url:\s*'\/images\/[^']+'/,
            `url: '${localUrl}'`
          );
          writeFileSync(nosProjetsPath, content, 'utf8');
          console.log(`✅ Nos projets: image mise à jour\n`);
        }
      }
    }
  }
} catch (error) {
  console.error('❌ Erreur Nos projets:', error.message);
}

// 2. Télécharger l'image de "Formation interculturelle" (imageListeProjets)
try {
  const TABLE_NAME = 'Formation interculturelle';
  const encodedTableName = encodeURIComponent(TABLE_NAME);
  const url = `https://api.airtable.com/v0/${BASE_ID}/${encodedTableName}?maxRecords=100`;

  console.log('Récupération de l\'image "Formation interculturelle" depuis Airtable...');
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${AIRTABLE_PAT}`,
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    const data = await response.json();
    if (data.records.length > 0) {
      const record = data.records[0];
      const fields = record.fields;
      const imageListeProjets = fields.image_liste_projets?.[0];

      if (imageListeProjets?.url) {
        const filename = imageListeProjets.filename || '235367262_2672861786339930_2018903492249853222_n.jpg';
        const localUrl = await downloadImage(imageListeProjets.url, filename);
        
        if (localUrl) {
          const formationPath = join(__dirname, '..', 'src', 'lib', 'content', 'formation-interculturelle.ts');
          let content = readFileSync(formationPath, 'utf8');
          content = content.replace(
            /imageListeProjets:\s*\{[^}]*url:\s*"\/images\/[^"]+"/,
            `imageListeProjets: {\n      url: "${localUrl}"`
          );
          writeFileSync(formationPath, content, 'utf8');
          console.log(`✅ Formation interculturelle: imageListeProjets mise à jour\n`);
        }
      }
    }
  }
} catch (error) {
  console.error('❌ Erreur Formation interculturelle:', error.message);
}

console.log('\n✅ Téléchargement terminé!');

