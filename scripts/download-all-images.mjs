import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Pas besoin de token, on lit directement depuis les fichiers de contenu
const imagesDir = join(__dirname, '..', 'static', 'images');
const imageMap = new Map(); // Pour éviter les doublons

// Créer le dossier images s'il n'existe pas
if (!existsSync(imagesDir)) {
  mkdirSync(imagesDir, { recursive: true });
}

// Fonction pour télécharger une image
async function downloadImage(airtableUrl, filename) {
  if (!airtableUrl || !airtableUrl.includes('airtableusercontent.com')) {
    return null;
  }

  // Vérifier si l'image a déjà été téléchargée
  if (imageMap.has(airtableUrl)) {
    return imageMap.get(airtableUrl);
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
    const extension = filename.split('.').pop() || 'jpg';
    const safeFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    const localPath = join(imagesDir, safeFilename);
    
    writeFileSync(localPath, Buffer.from(buffer));
    const localUrl = `/images/${safeFilename}`;
    
    imageMap.set(airtableUrl, localUrl);
    console.log(`✅ Téléchargé: ${safeFilename}`);
    
    return localUrl;
  } catch (error) {
    console.error(`❌ Erreur téléchargement ${filename}:`, error.message);
    return null;
  }
}

// Fonction pour extraire et télécharger les images d'un champ
async function processImageField(field, defaultAlt = '') {
  if (!field || !Array.isArray(field) || field.length === 0) {
    return null;
  }
  
  const image = field[0];
  const filename = image.filename || image.title || defaultAlt || 'image.jpg';
  const localUrl = await downloadImage(image.url, filename);
  
  if (localUrl) {
    return {
      url: localUrl,
      alt: image.filename || image.title || defaultAlt
    };
  }
  
  return null;
}

// Fonction pour traiter un tableau d'images
async function processImagesField(field) {
  if (!field || !Array.isArray(field) || field.length === 0) {
    return [];
  }
  
  const results = [];
  for (const img of field) {
    const filename = img.filename || img.title || 'image.jpg';
    const localUrl = await downloadImage(img.url, filename);
    if (localUrl) {
      results.push({
        url: localUrl,
        alt: img.filename || img.title || ''
      });
    }
  }
  
  return results;
}

// Fonction pour mettre à jour un fichier de contenu
function updateContentFile(filePath, replacements) {
  let content = readFileSync(filePath, 'utf8');
  
  for (const [pattern, replacement] of replacements) {
    content = content.replace(pattern, replacement);
  }
  
  writeFileSync(filePath, content, 'utf8');
}

// Traiter tous les fichiers de contenu
async function processAllContent() {
  console.log('📥 Téléchargement de toutes les images...\n');

  // 1. Contact
  try {
    const contactPath = join(__dirname, '..', 'src', 'lib', 'content', 'contact.ts');
    const contactContent = readFileSync(contactPath, 'utf8');
    const contactMatches = contactContent.matchAll(/url:\s*"([^"]+airtableusercontent[^"]+)"/g);
    const replacements = [];
    
    for (const match of contactMatches) {
      const airtableUrl = match[1];
      const altMatch = contactContent.substring(match.index).match(/alt:\s*"([^"]+)"/);
      const alt = altMatch ? altMatch[1] : 'contact.jpg';
      const filename = alt.replace(/[^a-zA-Z0-9.-]/g, '_') || 'contact.jpg';
      const localUrl = await downloadImage(airtableUrl, filename);
      if (localUrl) {
        replacements.push([new RegExp(airtableUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), localUrl]);
      }
    }
    
    if (replacements.length > 0) {
      updateContentFile(contactPath, replacements);
      console.log(`✅ Contact: ${replacements.length} image(s) mise(s) à jour\n`);
    }
  } catch (error) {
    console.error('❌ Erreur contact:', error.message);
  }

  // 2. Homepage
  try {
    const homepagePath = join(__dirname, '..', 'src', 'lib', 'content', 'homepage.ts');
    const homepageContent = readFileSync(homepagePath, 'utf8');
    const homepageMatches = homepageContent.matchAll(/url:\s*'([^']+airtableusercontent[^']+)'/g);
    const replacements = [];
    
    for (const match of homepageMatches) {
      const airtableUrl = match[1];
      const altMatch = homepageContent.substring(match.index).match(/alt:\s*'([^']+)'/);
      const alt = altMatch ? altMatch[1] : 'homepage.jpg';
      const filename = alt.replace(/[^a-zA-Z0-9.-]/g, '_') || 'homepage.jpg';
      const localUrl = await downloadImage(airtableUrl, filename);
      if (localUrl) {
        replacements.push([new RegExp(airtableUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), localUrl]);
      }
    }
    
    if (replacements.length > 0) {
      updateContentFile(homepagePath, replacements);
      console.log(`✅ Homepage: ${replacements.length} image(s) mise(s) à jour\n`);
    }
  } catch (error) {
    console.error('❌ Erreur homepage:', error.message);
  }

  // 3. Découvrir Interra
  try {
    const decouvrirPath = join(__dirname, '..', 'src', 'lib', 'content', 'decouvrir-interra.ts');
    const decouvrirContent = readFileSync(decouvrirPath, 'utf8');
    const decouvrirMatches = decouvrirContent.matchAll(/url:\s*"([^"]+airtableusercontent[^"]+)"/g);
    const replacements = [];
    
    for (const match of decouvrirMatches) {
      const airtableUrl = match[1];
      const altMatch = decouvrirContent.substring(match.index).match(/alt:\s*"([^"]+)"/);
      const alt = altMatch ? altMatch[1] : 'decouvrir.jpg';
      const filename = alt.replace(/[^a-zA-Z0-9.-]/g, '_') || 'decouvrir.jpg';
      const localUrl = await downloadImage(airtableUrl, filename);
      if (localUrl) {
        replacements.push([new RegExp(airtableUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), localUrl]);
      }
    }
    
    if (replacements.length > 0) {
      updateContentFile(decouvrirPath, replacements);
      console.log(`✅ Découvrir Interra: ${replacements.length} image(s) mise(s) à jour\n`);
    }
  } catch (error) {
    console.error('❌ Erreur découvrir:', error.message);
  }

  // 4. Inter-act
  try {
    const interActPath = join(__dirname, '..', 'src', 'lib', 'content', 'inter-act.ts');
    const interActContent = readFileSync(interActPath, 'utf8');
    const interActMatches = interActContent.matchAll(/url:\s*"([^"]+airtableusercontent[^"]+)"/g);
    const replacements = [];
    
    for (const match of interActMatches) {
      const airtableUrl = match[1];
      const altMatch = interActContent.substring(match.index).match(/alt:\s*"([^"]+)"/);
      const alt = altMatch ? altMatch[1] : 'interact.jpg';
      const filename = alt.replace(/[^a-zA-Z0-9.-]/g, '_') || 'interact.jpg';
      const localUrl = await downloadImage(airtableUrl, filename);
      if (localUrl) {
        replacements.push([new RegExp(airtableUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), localUrl]);
      }
    }
    
    if (replacements.length > 0) {
      updateContentFile(interActPath, replacements);
      console.log(`✅ Inter-act: ${replacements.length} image(s) mise(s) à jour\n`);
    }
  } catch (error) {
    console.error('❌ Erreur inter-act:', error.message);
  }

  // 5. Incubateur inclusif
  try {
    const incubateurPath = join(__dirname, '..', 'src', 'lib', 'content', 'incubateur-inclusif.ts');
    const incubateurContent = readFileSync(incubateurPath, 'utf8');
    const incubateurMatches = incubateurContent.matchAll(/url:\s*"([^"]+airtableusercontent[^"]+)"/g);
    const replacements = [];
    
    for (const match of incubateurMatches) {
      const airtableUrl = match[1];
      const altMatch = incubateurContent.substring(match.index).match(/alt:\s*"([^"]+)"/);
      const alt = altMatch ? altMatch[1] : 'incubateur.jpg';
      const filename = alt.replace(/[^a-zA-Z0-9.-]/g, '_') || 'incubateur.jpg';
      const localUrl = await downloadImage(airtableUrl, filename);
      if (localUrl) {
        replacements.push([new RegExp(airtableUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), localUrl]);
      }
    }
    
    if (replacements.length > 0) {
      updateContentFile(incubateurPath, replacements);
      console.log(`✅ Incubateur inclusif: ${replacements.length} image(s) mise(s) à jour\n`);
    }
  } catch (error) {
    console.error('❌ Erreur incubateur:', error.message);
  }

  // 6. Formation interculturelle - Récupérer directement depuis Airtable pour imageListeProjets
  try {
    // D'abord, essayer de télécharger depuis les URLs Airtable dans le fichier
    const formationPath = join(__dirname, '..', 'src', 'lib', 'content', 'formation-interculturelle.ts');
    const formationContent = readFileSync(formationPath, 'utf8');
    const formationMatches = formationContent.matchAll(/url:\s*"([^"]+airtableusercontent[^"]+)"/g);
    const replacements = [];
    
    for (const match of formationMatches) {
      const airtableUrl = match[1];
      const altMatch = formationContent.substring(match.index).match(/alt:\s*"([^"]+)"/);
      const alt = altMatch ? altMatch[1] : 'formation.jpg';
      const filename = alt.replace(/[^a-zA-Z0-9.-]/g, '_') || 'formation.jpg';
      const localUrl = await downloadImage(airtableUrl, filename);
      if (localUrl) {
        replacements.push([new RegExp(airtableUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), localUrl]);
      }
    }
    
    if (replacements.length > 0) {
      updateContentFile(formationPath, replacements);
      console.log(`✅ Formation interculturelle: ${replacements.length} image(s) mise(s) à jour\n`);
    }

    // Ensuite, récupérer imageListeProjets depuis Airtable si elle n'existe pas localement
    const imageListeMatch = formationContent.match(/imageListeProjets:\s*\{[^}]*url:\s*"([^"]+)"/);
    if (imageListeMatch && imageListeMatch[1].startsWith('/images/')) {
      const localImagePath = join(__dirname, '..', 'static', 'images', imageListeMatch[1].replace('/images/', ''));
      if (!existsSync(localImagePath)) {
        // Charger le token
        let FORMATION_AIRTABLE_PAT = null;
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
                FORMATION_AIRTABLE_PAT = match[1].trim();
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
                  FORMATION_AIRTABLE_PAT = match[1].trim();
                  break;
                }
              }
            }
          } catch (error2) {}
        }

        if (!FORMATION_AIRTABLE_PAT) {
          try {
            const tokenPath = join(__dirname, '..', 'temp_token.txt');
            FORMATION_AIRTABLE_PAT = readFileSync(tokenPath, 'utf-8').trim();
          } catch (e) {
            console.log('⚠️ Token non disponible pour Formation interculturelle\n');
            return;
          }
        }

        const BASE_ID = 'appYopHw9tC4B2Q5r';
        const TABLE_NAME = 'Formation interculturelle';
        const encodedTableName = encodeURIComponent(TABLE_NAME);
        const url = `https://api.airtable.com/v0/${BASE_ID}/${encodedTableName}?maxRecords=100`;

        console.log('Récupération imageListeProjets depuis Airtable...');
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${FORMATION_AIRTABLE_PAT}`,
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
      }
    }
  } catch (error) {
    console.error('❌ Erreur formation:', error.message);
  }

  // 7. Nos projets - Récupérer directement depuis Airtable
  try {
    // Charger le token
    let NOS_PROJETS_AIRTABLE_PAT = null;
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
            NOS_PROJETS_AIRTABLE_PAT = match[1].trim();
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
              NOS_PROJETS_AIRTABLE_PAT = match[1].trim();
              break;
            }
          }
        }
      } catch (error2) {}
    }

    if (!NOS_PROJETS_AIRTABLE_PAT) {
      try {
        const tokenPath = join(__dirname, '..', 'temp_token.txt');
        NOS_PROJETS_AIRTABLE_PAT = readFileSync(tokenPath, 'utf-8').trim();
      } catch (e) {
        console.log('⚠️ Token non disponible pour Nos projets\n');
        // Essayer de lire depuis le fichier
        const nosProjetsPath = join(__dirname, '..', 'src', 'lib', 'content', 'nos-projets.ts');
        const nosProjetsContent = readFileSync(nosProjetsPath, 'utf8');
        const nosProjetsMatches = nosProjetsContent.matchAll(/url:\s*'([^']+airtableusercontent[^']+)'/g);
        const replacements = [];
        
        for (const match of nosProjetsMatches) {
          const airtableUrl = match[1];
          const altMatch = nosProjetsContent.substring(match.index).match(/alt:\s*'([^']+)'/);
          const alt = altMatch ? altMatch[1] : 'nos-projets.jpg';
          const filename = alt.replace(/[^a-zA-Z0-9.-]/g, '_') || 'nos-projets.jpg';
          const localUrl = await downloadImage(airtableUrl, filename);
          if (localUrl) {
            replacements.push([new RegExp(airtableUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), localUrl]);
          }
        }
        
        if (replacements.length > 0) {
          updateContentFile(nosProjetsPath, replacements);
          console.log(`✅ Nos projets: ${replacements.length} image(s) mise(s) à jour\n`);
        }
        return;
      }
    }

    const BASE_ID = 'appYopHw9tC4B2Q5r';
    const TABLE_NAME = 'Nos projets';
    const encodedTableName = encodeURIComponent(TABLE_NAME);
    const url = `https://api.airtable.com/v0/${BASE_ID}/${encodedTableName}?maxRecords=100`;

    console.log('Récupération des images Nos projets depuis Airtable...');
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${NOS_PROJETS_AIRTABLE_PAT}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.log('⚠️ Impossible de récupérer Nos projets depuis Airtable\n');
      return;
    }

    const data = await response.json();
    if (data.records.length === 0) {
      console.log('⚠️ Aucun enregistrement Nos projets trouvé\n');
      return;
    }

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
  } catch (error) {
    console.error('❌ Erreur nos projets:', error.message);
  }

  // 8. Duo langue - Récupérer directement depuis Airtable pour vidéo et images
  try {
    // Charger le token
    let DUO_LANGUE_AIRTABLE_PAT = null;
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
            DUO_LANGUE_AIRTABLE_PAT = match[1].trim();
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
              DUO_LANGUE_AIRTABLE_PAT = match[1].trim();
              break;
            }
          }
        }
      } catch (error2) {}
    }

    if (!DUO_LANGUE_AIRTABLE_PAT) {
      try {
        const tokenPath = join(__dirname, '..', 'temp_token.txt');
        DUO_LANGUE_AIRTABLE_PAT = readFileSync(tokenPath, 'utf-8').trim();
      } catch (e) {
        console.log('⚠️ Token non disponible pour Duo langue, utilisation des URLs existantes\n');
        // Essayer de télécharger depuis les URLs dans le fichier
        const duoLanguePath = join(__dirname, '..', 'src', 'lib', 'content', 'duo-langue.ts');
        const duoLangueContent = readFileSync(duoLanguePath, 'utf8');
        const duoLangueMatches = duoLangueContent.matchAll(/url:\s*"([^"]+airtableusercontent[^"]+)"/g);
        const replacements = [];
        
        for (const match of duoLangueMatches) {
          const airtableUrl = match[1];
          const altMatch = duoLangueContent.substring(match.index).match(/alt:\s*"([^"]+)"/);
          const alt = altMatch ? altMatch[1] : 'duo-langue.jpg';
          const filename = alt.replace(/[^a-zA-Z0-9.-]/g, '_') || 'duo-langue.jpg';
          const localUrl = await downloadImage(airtableUrl, filename);
          if (localUrl) {
            replacements.push([new RegExp(airtableUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), localUrl]);
          }
        }
        
        if (replacements.length > 0) {
          updateContentFile(duoLanguePath, replacements);
          console.log(`✅ Duo langue: ${replacements.length} image(s) mise(s) à jour\n`);
        }
        return;
      }
    }

    const BASE_ID = 'appYopHw9tC4B2Q5r';
    const TABLE_NAME = 'Duo langue';
    const encodedTableName = encodeURIComponent(TABLE_NAME);
    const url = `https://api.airtable.com/v0/${BASE_ID}/${encodedTableName}?maxRecords=100`;

    console.log('Récupération des données Duo langue depuis Airtable...');
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${DUO_LANGUE_AIRTABLE_PAT}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.log('⚠️ Impossible de récupérer Duo langue depuis Airtable\n');
      return;
    }

    const data = await response.json();
    if (data.records.length === 0) {
      console.log('⚠️ Aucun enregistrement Duo langue trouvé\n');
      return;
    }

    const record = data.records[0];
    const fields = record.fields;
    const duoLanguePath = join(__dirname, '..', 'src', 'lib', 'content', 'duo-langue.ts');
    let content = readFileSync(duoLanguePath, 'utf8');
    let updated = false;

    // Télécharger la vidéo
    const videoKSako = fields.video_k_sako?.[0];
    if (videoKSako?.url) {
      const videosDir = join(__dirname, '..', 'static', 'videos');
      if (!existsSync(videosDir)) {
        mkdirSync(videosDir, { recursive: true });
      }
      
      const filename = videoKSako.filename || 'duo2change-intro.mp4';
      const safeFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
      const localPath = join(videosDir, safeFilename);
      
      try {
        const videoResponse = await fetch(videoKSako.url, {
          headers: {
            'Referer': 'https://airtable.com/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        
        if (videoResponse.ok) {
          const buffer = await videoResponse.arrayBuffer();
          writeFileSync(localPath, Buffer.from(buffer));
          const localUrl = `/videos/${safeFilename}`;
          content = content.replace(
            /mp4Url:\s*"[^"]*"/,
            `mp4Url: "${localUrl}"`
          );
          updated = true;
          console.log(`✅ Vidéo téléchargée: ${safeFilename}`);
        }
      } catch (error) {
        console.error(`❌ Erreur téléchargement vidéo:`, error.message);
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
        console.log(`✅ Image roleInterra téléchargée`);
      }
    }

    if (updated) {
      writeFileSync(duoLanguePath, content, 'utf8');
      console.log(`✅ Duo langue: ressources mises à jour\n`);
    }
  } catch (error) {
    console.error('❌ Erreur duo langue:', error.message);
  }

  // 9. Menu
  try {
    const menuPath = join(__dirname, '..', 'src', 'lib', 'content', 'menu.ts');
    const menuContent = readFileSync(menuPath, 'utf8');
    const menuMatches = menuContent.matchAll(/url:\s*"([^"]+airtableusercontent[^"]+)"/g);
    const replacements = [];
    
    for (const match of menuMatches) {
      const airtableUrl = match[1];
      const altMatch = menuContent.substring(match.index).match(/alt:\s*"([^"]+)"/);
      const alt = altMatch ? altMatch[1] : 'menu.jpg';
      const filename = alt.replace(/[^a-zA-Z0-9.-]/g, '_') || 'menu.jpg';
      const localUrl = await downloadImage(airtableUrl, filename);
      if (localUrl) {
        replacements.push([new RegExp(airtableUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), localUrl]);
      }
    }
    
    if (replacements.length > 0) {
      updateContentFile(menuPath, replacements);
      console.log(`✅ Menu: ${replacements.length} image(s) mise(s) à jour\n`);
    }
  } catch (error) {
    console.error('❌ Erreur menu:', error.message);
  }

  // 10. Footer - Récupérer directement depuis Airtable
  try {
    // Charger le token pour le footer
    let FOOTER_AIRTABLE_PAT = null;
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
            FOOTER_AIRTABLE_PAT = match[1].trim();
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
              FOOTER_AIRTABLE_PAT = match[1].trim();
              break;
            }
          }
        }
      } catch (error2) {}
    }

    if (!FOOTER_AIRTABLE_PAT) {
      try {
        const tokenPath = join(__dirname, '..', 'temp_token.txt');
        FOOTER_AIRTABLE_PAT = readFileSync(tokenPath, 'utf-8').trim();
      } catch (e) {
        console.log('⚠️ Token non disponible pour Footer, utilisation des images existantes\n');
        // Utiliser les images qui existent déjà
        const existingImages = ['fedasil.png', 'villedeliege.png', 'provincedeliege.png', 'wallonie_v.png', 'FWB_VERTI_RVB.png'];
        const footerPath = join(__dirname, '..', 'src', 'lib', 'content', 'footer.ts');
        let soutiensStr = '[\n';
        existingImages.forEach((img, index) => {
          const safeName = img.replace(/[^a-zA-Z0-9.-]/g, '_');
          soutiensStr += '      {\n';
          soutiensStr += `        url: "/images/${safeName}",\n`;
          soutiensStr += `        alt: "${safeName}",\n`;
          soutiensStr += '        customData: { url: null }\n';
          soutiensStr += '      }';
          if (index < existingImages.length - 1) soutiensStr += ',';
          soutiensStr += '\n';
        });
        soutiensStr += '    ]';
        const content = `export const footerContent = {\n  footer: {\n    soutiens: ${soutiensStr}\n  }\n};\n`;
        writeFileSync(footerPath, content, 'utf8');
        console.log(`✅ Footer: ${existingImages.length} image(s) mises à jour avec images existantes\n`);
        return;
      }
    }

    const BASE_ID = 'appYopHw9tC4B2Q5r';
    const TABLE_NAME = 'Footer';
    const encodedTableName = encodeURIComponent(TABLE_NAME);
    const url = `https://api.airtable.com/v0/${BASE_ID}/${encodedTableName}?maxRecords=100`;

    console.log('Récupération des images Footer depuis Airtable...');
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${FOOTER_AIRTABLE_PAT}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.log('⚠️ Impossible de récupérer Footer depuis Airtable, utilisation des images existantes\n');
      return;
    }

    const data = await response.json();
    if (data.records.length === 0) {
      console.log('⚠️ Aucun enregistrement Footer trouvé\n');
      return;
    }

    const images = data.records[0].fields.images_soutiens || [];
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
      }
    }

    if (soutiens.length > 0) {
      const footerPath = join(__dirname, '..', 'src', 'lib', 'content', 'footer.ts');
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
      const content = `export const footerContent = {\n  footer: {\n    soutiens: ${soutiensStr}\n  }\n};\n`;
      writeFileSync(footerPath, content, 'utf8');
      console.log(`✅ Footer: ${soutiens.length} image(s) mise(s) à jour\n`);
    }
  } catch (error) {
    console.error('❌ Erreur footer:', error.message);
  }

  // 11. Informations
  try {
    const informationsPath = join(__dirname, '..', 'src', 'lib', 'content', 'informations.ts');
    const informationsContent = readFileSync(informationsPath, 'utf8');
    const informationsMatches = informationsContent.matchAll(/url:\s*"([^"]+airtableusercontent[^"]+)"/g);
    const replacements = [];
    
    for (const match of informationsMatches) {
      const airtableUrl = match[1];
      const altMatch = informationsContent.substring(match.index).match(/alt:\s*"([^"]+)"/);
      const alt = altMatch ? altMatch[1] : 'information.jpg';
      const filename = alt.replace(/[^a-zA-Z0-9.-]/g, '_') || 'information.jpg';
      const localUrl = await downloadImage(airtableUrl, filename);
      if (localUrl) {
        replacements.push([new RegExp(airtableUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), localUrl]);
      }
    }
    
    if (replacements.length > 0) {
      updateContentFile(informationsPath, replacements);
      console.log(`✅ Informations: ${replacements.length} image(s) mise(s) à jour\n`);
    }
  } catch (error) {
    console.error('❌ Erreur informations:', error.message);
  }

  // 12. Agir avec nous
  try {
    const agirPath = join(__dirname, '..', 'src', 'lib', 'content', 'agir-avec-nous.ts');
    const agirContent = readFileSync(agirPath, 'utf8');
    const agirMatches = agirContent.matchAll(/url:\s*"([^"]+airtableusercontent[^"]+)"/g);
    const replacements = [];
    
    for (const match of agirMatches) {
      const airtableUrl = match[1];
      const altMatch = agirContent.substring(match.index).match(/alt:\s*"([^"]+)"/);
      const alt = altMatch ? altMatch[1] : 'agir.jpg';
      const filename = alt.replace(/[^a-zA-Z0-9.-]/g, '_') || 'agir.jpg';
      const localUrl = await downloadImage(airtableUrl, filename);
      if (localUrl) {
        replacements.push([new RegExp(airtableUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), localUrl]);
      }
    }
    
    if (replacements.length > 0) {
      updateContentFile(agirPath, replacements);
      console.log(`✅ Agir avec nous: ${replacements.length} image(s) mise(s) à jour\n`);
    }
  } catch (error) {
    console.error('❌ Erreur agir:', error.message);
  }

  // 13. Menu
  try {
    const menuPath = join(__dirname, '..', 'src', 'lib', 'content', 'menu.ts');
    const menuContent = readFileSync(menuPath, 'utf8');
    const menuMatches = menuContent.matchAll(/url:\s*"([^"]+airtableusercontent[^"]+)"/g);
    const replacements = [];
    
    for (const match of menuMatches) {
      const airtableUrl = match[1];
      const altMatch = menuContent.substring(match.index).match(/alt:\s*"([^"]+)"/);
      const alt = altMatch ? altMatch[1] : 'menu.jpg';
      const filename = alt.replace(/[^a-zA-Z0-9.-]/g, '_') || 'menu.jpg';
      const localUrl = await downloadImage(airtableUrl, filename);
      if (localUrl) {
        replacements.push([new RegExp(airtableUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), localUrl]);
      }
    }
    
    if (replacements.length > 0) {
      updateContentFile(menuPath, replacements);
      console.log(`✅ Menu: ${replacements.length} image(s) mise(s) à jour\n`);
    }
  } catch (error) {
    console.error('❌ Erreur menu:', error.message);
  }

  // 14. Footer
  try {
    const footerPath = join(__dirname, '..', 'src', 'lib', 'content', 'footer.ts');
    const footerContent = readFileSync(footerPath, 'utf8');
    const footerMatches = footerContent.matchAll(/url:\s*"([^"]+airtableusercontent[^"]+)"/g);
    const replacements = [];
    
    for (const match of footerMatches) {
      const airtableUrl = match[1];
      const altMatch = footerContent.substring(match.index).match(/alt:\s*"([^"]+)"/);
      const alt = altMatch ? altMatch[1] : 'footer.jpg';
      const filename = alt.replace(/[^a-zA-Z0-9.-]/g, '_') || 'footer.jpg';
      const localUrl = await downloadImage(airtableUrl, filename);
      if (localUrl) {
        replacements.push([new RegExp(airtableUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), localUrl]);
      }
    }
    
    if (replacements.length > 0) {
      updateContentFile(footerPath, replacements);
      console.log(`✅ Footer: ${replacements.length} image(s) mise(s) à jour\n`);
    }
  } catch (error) {
    console.error('❌ Erreur footer:', error.message);
  }

  console.log('\n✅ Toutes les images ont été téléchargées et mises à jour!');
}

processAllContent().catch(console.error);

