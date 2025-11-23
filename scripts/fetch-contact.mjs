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
const TABLE_NAME = 'Personne contact';

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
    console.error('Aucun enregistrement trouvé');
    process.exit(1);
  }

  // Mapper tous les enregistrements avec leur ID
  const contacts = data.records.map(record => {
    const fields = record.fields;
    return {
      id: fields.id || record.id || 0, // Utiliser le champ id des fields, sinon record.id
      nomPrNom: fields.nom_pr_nom || fields.nomPrNom || fields.nom || '',
      numRoDeTLPhone: fields.num_ro_de_t_l_phone || fields.numRoDeTLPhone || fields.telephone || fields.t_l_phone || '',
      photo: extractImage(fields.photo || fields.image),
      adresseMail: fields.adresse_mail || fields.adresseMail || fields.email || fields.mail || '',
      fonction: fields.fonction || ''
    };
  });

  // Trier les contacts par ID dans l'ordre inverse (décroissant)
  contacts.sort((a, b) => {
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

  // Formater les contacts en TypeScript
  let contactsStr = '[\n';
  contacts.forEach((contact, index) => {
    contactsStr += '    {\n';
    contactsStr += `      nomPrNom: ${JSON.stringify(contact.nomPrNom)},\n`;
    contactsStr += `      numRoDeTLPhone: ${JSON.stringify(contact.numRoDeTLPhone)},\n`;
    
    if (contact.photo && contact.photo.url) {
      contactsStr += '      photo: {\n';
      contactsStr += `        url: ${JSON.stringify(contact.photo.url)},\n`;
      contactsStr += `        alt: ${JSON.stringify(contact.photo.alt || contact.nomPrNom)}\n`;
      contactsStr += '      },\n';
    } else {
      contactsStr += '      photo: null,\n';
    }
    
    contactsStr += `      adresseMail: ${JSON.stringify(contact.adresseMail)},\n`;
    contactsStr += `      fonction: ${JSON.stringify(contact.fonction)}\n`;
    contactsStr += '    }';
    if (index < contacts.length - 1) contactsStr += ',';
    contactsStr += '\n';
  });
  contactsStr += '  ]';

  const content = `type PersonneContact = {
  nomPrNom: string;
  numRoDeTLPhone: string;
  photo: {
    url: string;
    alt: string;
  } | null;
  adresseMail: string;
  fonction: string;
};

export const contactContent: { allPersonneContacts: PersonneContact[] } = {
  allPersonneContacts: ${contactsStr}
};
`;

  const contactPath = join(__dirname, '..', 'src', 'lib', 'content', 'contact.ts');
  writeFileSync(contactPath, content, 'utf-8');
  console.log(`✅ ${contacts.length} personne(s) de contact ajoutée(s) au fichier statique`);

} catch (error) {
  console.error('Erreur:', error);
  process.exit(1);
}

