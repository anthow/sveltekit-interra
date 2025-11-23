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
const TABLE_NAME = 'Informations';

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
    return null;
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
    console.log('Aucun enregistrement trouvé, fichier vide créé');
    const informationsPath = join(__dirname, '..', 'src', 'lib', 'content', 'informations.ts');
    const emptyContent = `type Image = {
  url: string;
  alt: string;
};

export type Information = {
  id: string;
  titre: string;
  texte: string;
  image: Image | null;
  urlButton?: string;
  texteButton?: string;
  horsLigneEnLigne?: boolean;
};

export type InformationsContent = {
  allInformation: Information[];
};

export const informationsContent: InformationsContent = {
  allInformation: []
};
`;
    writeFileSync(informationsPath, emptyContent, 'utf-8');
    process.exit(0);
  }

  // Mapper tous les enregistrements
  const informations = data.records.map(record => {
    const fields = record.fields;
    return {
      id: record.id || fields.id || '',
      titre: fields.titre || '',
      texte: fields.texte || fields.texte_d_information || '',
      image: extractImage(fields.image || fields.photo),
      urlButton: fields.url_button || fields.urlButton || fields.url || '',
      texteButton: fields.texte_button || fields.texteButton || fields.bouton || '',
      horsLigneEnLigne: fields.hors_ligne_en_ligne === true || fields.horsLigneEnLigne === true
    };
  });

  // Filtrer pour ne garder que les informations où horsLigneEnLigne est true
  const informationsFiltrees = informations.filter(info => info.horsLigneEnLigne === true);

  // Trier les informations par ID dans l'ordre inverse (décroissant)
  informationsFiltrees.sort((a, b) => {
    const idA = a.id;
    const idB = b.id;
    
    // Si les deux sont numériques, trier numériquement en ordre décroissant
    const numA = Number(idA);
    const numB = Number(idB);
    if (!isNaN(numA) && !isNaN(numB)) {
      return numB - numA; // Inverse : numB - numA au lieu de numA - numB
    }
    
    // Sinon, trier alphabétiquement en ordre inverse
    return String(idB).localeCompare(String(idA)); // Inverse : idB avant idA
  });

  console.log('Champs disponibles (premier enregistrement):', Object.keys(data.records[0].fields).join(', '));
  console.log(`Total d'enregistrements: ${data.records.length}, Filtrés (hors_ligne_en_ligne=true): ${informationsFiltrees.length}`);

  // Formater les informations en TypeScript
  let informationsStr = '[\n';
  informationsFiltrees.forEach((info, index) => {
    informationsStr += '    {\n';
    informationsStr += `      id: ${JSON.stringify(info.id)},\n`;
    informationsStr += `      titre: ${JSON.stringify(info.titre)},\n`;
    informationsStr += `      texte: ${JSON.stringify(info.texte)},\n`;
    
    if (info.image && info.image.url) {
      informationsStr += '      image: {\n';
      informationsStr += `        url: ${JSON.stringify(info.image.url)},\n`;
      informationsStr += `        alt: ${JSON.stringify(info.image.alt || info.titre)}\n`;
      informationsStr += '      },\n';
    } else {
      informationsStr += '      image: null,\n';
    }
    
    if (info.urlButton) {
      informationsStr += `      urlButton: ${JSON.stringify(info.urlButton)},\n`;
    }
    if (info.texteButton) {
      informationsStr += `      texteButton: ${JSON.stringify(info.texteButton)}\n`;
    }
    
    informationsStr += '    }';
    if (index < informationsFiltrees.length - 1) informationsStr += ',';
    informationsStr += '\n';
  });
  informationsStr += '  ]';

  const content = `type Image = {
  url: string;
  alt: string;
};

export type Information = {
  id: string;
  titre: string;
  texte: string;
  image: Image | null;
  urlButton?: string;
  texteButton?: string;
};

export type InformationsContent = {
  allInformation: Information[];
};

export const informationsContent: InformationsContent = {
  allInformation: ${informationsStr}
};
`;

  const informationsPath = join(__dirname, '..', 'src', 'lib', 'content', 'informations.ts');
  writeFileSync(informationsPath, content, 'utf-8');
  console.log(`✅ ${informationsFiltrees.length} information(s) ajoutée(s) au fichier statique`);

} catch (error) {
  console.error('Erreur:', error);
  process.exit(1);
}

