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
    console.error('AIRTABLE_PAT n\'est pas défini');
    process.exit(1);
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

const TABLE_NAME = 'Footer';
const imagesDir = join(__dirname, '..', 'static', 'images');
const footerPath = join(__dirname, '..', 'src', 'lib', 'content', 'footer.ts');

// Créer le dossier images s'il n'existe pas
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
    const localUrl = `/images/${safeFilename}`;
    
    console.log(`✅ Téléchargé: ${safeFilename}`);
    
    return localUrl;
  } catch (error) {
    console.error(`❌ Erreur téléchargement ${filename}:`, error.message);
    return null;
  }
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
    console.error('❌ Aucun enregistrement trouvé dans Footer');
    process.exit(1);
  }

  const images = data.records[0].fields.images_soutiens || [];
  console.log(`Nombre d'images: ${images.length}`);

  // Télécharger toutes les images et créer le tableau de soutiens
  const soutiens = [];
  for (const img of images) {
    const filename = img.filename || img.title || 'logo-partenaire.jpg';
    const localUrl = await downloadImage(img.url, filename);
    
    if (localUrl) {
      soutiens.push({
        url: localUrl,
        alt: img.filename || img.title || 'Logo partenaire',
        customData: { url: null }
      });
    } else {
      // Si le téléchargement échoue, utiliser quand même l'URL locale basée sur le nom
      const safeFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
      soutiens.push({
        url: `/images/${safeFilename}`,
        alt: img.filename || img.title || 'Logo partenaire',
        customData: { url: null }
      });
    }
  }

  // Formater le tableau de soutiens en TypeScript
  let soutiensStr = '[\n';
  soutiens.forEach((soutien, index) => {
    soutiensStr += '      {\n';
    soutiensStr += `        url: "${soutien.url}",\n`;
    soutiensStr += `        alt: "${soutien.alt.replace(/"/g, '\\"')}",\n`;
    soutiensStr += '        customData: { url: null }\n';
    soutiensStr += '      }';
    if (index < soutiens.length - 1) soutiensStr += ',';
    soutiensStr += '\n';
  });
  soutiensStr += '    ]';

  const content = `export const footerContent = {
  footer: {
    soutiens: ${soutiensStr}
  }
};
`;

  writeFileSync(footerPath, content, 'utf8');
  console.log(`\n✅ ${soutiens.length} image(s) de soutiens ajoutées au footer`);
} catch (error) {
  console.error('Erreur:', error);
  process.exit(1);
}

