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

const TABLE_NAME = 'Menu';

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

const menuPath = join(__dirname, '..', 'src', 'lib', 'content', 'menu.ts');

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
    console.error('❌ Aucun enregistrement trouvé dans Menu');
    process.exit(1);
  }

  const record = data.records[0];
  const fields = record.fields;

  console.log('image_logo trouvé:', !!fields.image_logo);
  console.log('image_wallonie trouvé:', !!fields.image_wallonie);
  if (fields.image_logo && fields.image_logo[0]) {
    console.log('imageLogo URL (premiers 100 chars):', fields.image_logo[0].url.substring(0, 100));
  }

  const menuContent = {
    menu: {
      id: fields.id || 141104585,
      imageLogo: extractImage(fields.image_logo),
      imageWallonie: extractImage(fields.image_wallonie),
      menuPrincipalUnAccueil: fields.menu_principal_un_accueil || 'Accueil',
      menuPrincipalDeuxDecouvrirInterra: fields.menu_principal_deux_decouvrir_interra || 'Découvrir Interra',
      menuPrincipalTroisProjets: fields.menu_principal_trois_projets || 'Projets',
      menuPrincipalQuatreAgenda: fields.menu_principal_quatre_agenda || 'Agenda',
      menuPrincipalCinqAgirAvecNous: fields.menu_principal_cinq_agir_avec_nous || 'Agir avec nous',
      menuPrincipalSixContact: fields.menu_principal_six_contact || 'Contact',
      sousMenuProjetInteract: fields.sous_menu_projet_interact || 'InterAct',
      sousMenuAgirAvecNousDevenirTalent: fields.sous_menu_agir_avec_nous_devenir_talent || 'Devenir un talent InterAct',
      sousMenuDecouvrirInterraAdn: fields.sous_menu_decouvrir_interra_adn || 'Notre ADN',
      sousMenuProjetDuo: fields.sous_menu_projet_duo || 'Duo2Change',
      sousMenuDecouvrirInterraMission: fields.sous_menu_decouvrir_interra_mission || 'Nos missions',
      sousMenuAgirAvecNousFormerUnduo: fields.sous_menu_agir_avec_nous_former_unduo || 'Former un Duo2Change',
      sousMenuProjetInterlab: fields.sous_menu_projet_interlab || 'InterLab',
      sousMenuDecouvrirInterraValeurs: fields.sous_menu_decouvrir_interra_valeurs || 'Nos valeurs',
      sousMenuAgirAvecNousDevenirCoah: fields.sous_menu_agir_avec_nous_devenir_coah || 'Rejoindre l\'InterLab',
      sousMenuAgirAvecNousParticiperFormation: fields.sous_menu_agir_avec_nous_participer_formation || 'Participer à nos formations Com\'Together',
      sousMenuDecouvrirInterraLexique: fields.sous_menu_decouvrir_interra_lexique || 'Lexique',
      sousMenuProjetFormation: fields.sous_menu_projet_formation || 'Com\'Together',
      sousMenuAgirAvecNousDevenirVolontaire: fields.sous_menu_agir_avec_nous_devenir_volontaire || 'Devenir volontaire INTERRA',
      sousMenuDecouvrirInterraPartenaires: fields.sous_menu_decouvrir_interra_partenaires || 'Nos partenaires',
      sousMenuAgirAvecNousFaireDon: fields.sous_menu_agir_avec_nous_faire_don || 'Faire un Don'
    }
  };

  // Formater le contenu en TypeScript avec formatage manuel
  let content = 'export const menuContent = {\n';
  content += '  menu: {\n';
  content += `    id: ${menuContent.menu.id},\n`;
  content += '    imageLogo: {\n';
  content += `      url: "${menuContent.menu.imageLogo.url}",\n`;
  content += `      alt: "${menuContent.menu.imageLogo.alt}"\n`;
  content += '    },\n';
  content += '    imageWallonie: {\n';
  content += `      url: "${menuContent.menu.imageWallonie.url}",\n`;
  content += `      alt: "${menuContent.menu.imageWallonie.alt}"\n`;
  content += '    },\n';
  content += `    menuPrincipalUnAccueil: "${menuContent.menu.menuPrincipalUnAccueil}",\n`;
  content += `    menuPrincipalDeuxDecouvrirInterra: "${menuContent.menu.menuPrincipalDeuxDecouvrirInterra}",\n`;
  content += `    menuPrincipalTroisProjets: "${menuContent.menu.menuPrincipalTroisProjets}",\n`;
  content += `    menuPrincipalQuatreAgenda: "${menuContent.menu.menuPrincipalQuatreAgenda}",\n`;
  content += `    menuPrincipalCinqAgirAvecNous: "${menuContent.menu.menuPrincipalCinqAgirAvecNous}",\n`;
  content += `    menuPrincipalSixContact: "${menuContent.menu.menuPrincipalSixContact}",\n`;
  content += `    sousMenuProjetInteract: "${menuContent.menu.sousMenuProjetInteract}",\n`;
  content += `    sousMenuAgirAvecNousDevenirTalent: "${menuContent.menu.sousMenuAgirAvecNousDevenirTalent}",\n`;
  content += `    sousMenuDecouvrirInterraAdn: "${menuContent.menu.sousMenuDecouvrirInterraAdn}",\n`;
  content += `    sousMenuProjetDuo: "${menuContent.menu.sousMenuProjetDuo}",\n`;
  content += `    sousMenuDecouvrirInterraMission: "${menuContent.menu.sousMenuDecouvrirInterraMission}",\n`;
  content += `    sousMenuAgirAvecNousFormerUnduo: "${menuContent.menu.sousMenuAgirAvecNousFormerUnduo}",\n`;
  content += `    sousMenuProjetInterlab: "${menuContent.menu.sousMenuProjetInterlab}",\n`;
  content += `    sousMenuDecouvrirInterraValeurs: "${menuContent.menu.sousMenuDecouvrirInterraValeurs}",\n`;
  content += `    sousMenuAgirAvecNousDevenirCoah: "${menuContent.menu.sousMenuAgirAvecNousDevenirCoah}",\n`;
  content += `    sousMenuAgirAvecNousParticiperFormation: "${menuContent.menu.sousMenuAgirAvecNousParticiperFormation}",\n`;
  content += `    sousMenuDecouvrirInterraLexique: "${menuContent.menu.sousMenuDecouvrirInterraLexique}",\n`;
  content += `    sousMenuProjetFormation: "${menuContent.menu.sousMenuProjetFormation}",\n`;
  content += `    sousMenuAgirAvecNousDevenirVolontaire: "${menuContent.menu.sousMenuAgirAvecNousDevenirVolontaire}",\n`;
  content += `    sousMenuDecouvrirInterraPartenaires: "${menuContent.menu.sousMenuDecouvrirInterraPartenaires}",\n`;
  content += `    sousMenuAgirAvecNousFaireDon: "${menuContent.menu.sousMenuAgirAvecNousFaireDon}"\n`;
  content += '  }\n';
  content += '};\n';

  console.log('URL imageLogo générée:', menuContent.menu.imageLogo.url.substring(0, 100));
  console.log('URL imageWallonie générée:', menuContent.menu.imageWallonie.url.substring(0, 100));
  writeFileSync(menuPath, content, 'utf8');
  console.log('✅ Images du menu mises à jour');
} catch (error) {
  console.error('Erreur:', error);
  process.exit(1);
}
