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
const TABLE_NAME = 'séances d\'informations';

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

  // Prendre le premier enregistrement (ou le plus récent)
  const record = data.records[0];
  const fields = record.fields;

  console.log('Champs disponibles:', Object.keys(fields).join(', '));

  // Mapper les champs Airtable vers la structure attendue
  const seanceData = {
    titreSAnceDInformation: fields.titre_s_ance_d_information || fields.titre_seance_d_information || fields.titre || '',
    texteDInformation: fields.texte_d_information || fields.texte || '',
    dateProchaineSAnceDInformation: fields.date_prochaine_s_ance_d_information || fields.date_prochaine_seance || fields.date || '',
    adresseMailSAnceDInformation: fields.adresse_mail_s_ance_d_information || fields.adresse_mail_seance || fields.email || fields.mail || '',
    lieuxSAnceDInformation: fields.lieux_s_ance_d_information || fields.lieux_seance || fields.lieu || fields.lieux || ''
  };

  // Formater le contenu TypeScript
  const content = `export type SeanceDInformationContent = {
  sAncesDInformation: {
    titreSAnceDInformation: string;
    texteDInformation: string;
    dateProchaineSAnceDInformation: string;
    adresseMailSAnceDInformation: string;
    lieuxSAnceDInformation?: string;
  } | null;
};

export const seanceDInformationContent: SeanceDInformationContent = {
  sAncesDInformation: {
    titreSAnceDInformation: ${JSON.stringify(seanceData.titreSAnceDInformation)},
    texteDInformation: ${JSON.stringify(seanceData.texteDInformation)},
    dateProchaineSAnceDInformation: ${JSON.stringify(seanceData.dateProchaineSAnceDInformation)},
    adresseMailSAnceDInformation: ${JSON.stringify(seanceData.adresseMailSAnceDInformation)},
    lieuxSAnceDInformation: ${JSON.stringify(seanceData.lieuxSAnceDInformation || '')}
  }
};
`;

  const seancePath = join(__dirname, '..', 'src', 'lib', 'content', 'seance-d-information.ts');
  writeFileSync(seancePath, content, 'utf-8');
  console.log('✅ Données de séance d\'information ajoutées au fichier statique');
  console.log(`   - Titre: ${seanceData.titreSAnceDInformation || 'Non défini'}`);
  console.log(`   - Date: ${seanceData.dateProchaineSAnceDInformation || 'Non définie'}`);
  console.log(`   - Email: ${seanceData.adresseMailSAnceDInformation || 'Non défini'}`);

} catch (error) {
  console.error('Erreur:', error);
  process.exit(1);
}

