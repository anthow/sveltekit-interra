import { executeQuery } from '@datocms/cda-client';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { Readable } from 'stream';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger le token DatoCMS depuis les variables d'environnement
let DATOCMS_TOKEN = process.env.DATOCMS_READONLY_TOKEN;

if (!DATOCMS_TOKEN) {
  // Essayer de le lire depuis .env
  try {
    const envPath = join(__dirname, '..', '.env');
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
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('DATOCMS_READONLY_TOKEN=')) {
        const match = trimmed.match(/DATOCMS_READONLY_TOKEN=(.+)/);
        if (match) {
          DATOCMS_TOKEN = match[1].trim().replace(/^["']|["']$/g, '');
          break;
        }
      }
    }
  } catch (error) {
    console.error('Erreur lors de la lecture de .env:', error.message);
  }
}

if (!DATOCMS_TOKEN) {
  console.error('❌ DATOCMS_READONLY_TOKEN n\'est pas défini dans les variables d\'environnement ou .env');
  process.exit(1);
}

const contentDir = join(__dirname, '..', 'src', 'lib', 'content');
const imagesDir = join(__dirname, '..', 'static', 'images');

// Créer les dossiers s'ils n'existent pas
if (!existsSync(contentDir)) {
  mkdirSync(contentDir, { recursive: true });
}
if (!existsSync(imagesDir)) {
  mkdirSync(imagesDir, { recursive: true });
}

// Fonction pour télécharger une image
async function downloadImage(url, filename) {
  if (!url || !url.includes('datocms-assets.com')) {
    return url; // Retourner l'URL originale si ce n'est pas une image DatoCMS
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`⚠️  Impossible de télécharger ${url}`);
      return url;
    }

    const filePath = join(imagesDir, filename);
    const fileStream = createWriteStream(filePath);
    await pipeline(Readable.fromWeb(response.body), fileStream);
    
    return `/images/${filename}`;
  } catch (error) {
    console.warn(`⚠️  Erreur lors du téléchargement de ${url}:`, error.message);
    return url;
  }
}

// Fonction pour formater une valeur en TypeScript
function formatValue(value, indent = 0, isHtmlBlock = false) {
  const spaces = '  '.repeat(indent);
  
  if (value === null || value === undefined) {
    return 'null';
  }
  
  if (typeof value === 'string') {
    // Pour les blocs HTML, utiliser des template literals
    if (isHtmlBlock || value.includes('<')) {
      const escaped = value
        .replace(/\\/g, '\\\\')
        .replace(/`/g, '\\`')
        .replace(/\${/g, '\\${');
      return `\`${escaped}\``;
    }
    // Pour les strings simples, utiliser JSON.stringify
    return JSON.stringify(value);
  }
  
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    const items = value.map(item => `${spaces}  ${formatValue(item, indent + 1)}`).join(',\n');
    return `[\n${items}\n${spaces}]`;
  }
  
  if (typeof value === 'object') {
    const entries = Object.entries(value)
      .map(([key, val]) => {
        const isHtml = key.includes('texte') || key.includes('Texte') || key.includes('html') || key.includes('Html');
        return `${spaces}  ${key}: ${formatValue(val, indent + 1, isHtml)}`;
      })
      .join(',\n');
    return `{\n${entries}\n${spaces}}`;
  }
  
  return JSON.stringify(value);
}

// Fonction pour extraire le nom de fichier depuis une URL
function getFilenameFromUrl(url, defaultName = 'image.jpg') {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const filename = pathname.split('/').pop() || defaultName;
    return filename.replace(/[^a-zA-Z0-9.-]/g, '_');
  } catch {
    return defaultName.replace(/[^a-zA-Z0-9.-]/g, '_');
  }
}

// Fonction pour traiter une image
async function processImage(image, prefix = 'image') {
  if (!image || !image.url) {
    return { url: '', alt: '' };
  }
  
  const filename = getFilenameFromUrl(image.url, `${prefix}.jpg`);
  const localUrl = await downloadImage(image.url, filename);
  
  return {
    url: localUrl,
    alt: image.alt || ''
  };
}

// Fonction pour traiter un tableau d'images
async function processImages(images, prefix = 'image') {
  if (!Array.isArray(images) || images.length === 0) {
    return [];
  }
  
  const processed = [];
  for (let i = 0; i < images.length; i++) {
    const img = await processImage(images[i], `${prefix}-${i}`);
    processed.push(img);
  }
  
  return processed;
}

console.log('🔄 Synchronisation des données depuis DatoCMS...\n');

// Variable globale pour stocker les données de projets (utilisée par les sections individuelles)
let projetsDataCache = null;

// 1. Homepage (nécessite les données du menu)
try {
  console.log('📥 Récupération de la homepage...');
  
  // Récupérer d'abord les données du menu pour les utiliser dans homepage
  const menuQueryForHomepage = `
    query {
      menu {
        sousMenuAgirAvecNousDevenirTalent
        sousMenuAgirAvecNousFormerUnduo
        sousMenuAgirAvecNousDevenirCoah
        sousMenuAgirAvecNousParticiperFormation
        sousMenuAgirAvecNousDevenirVolontaire
        sousMenuAgirAvecNousFaireDon
      }
    }
  `;
  const menuDataForHomepage = await executeQuery(menuQueryForHomepage, { token: DATOCMS_TOKEN });
  
  const homepageQuery = `
    query {
      accueil {
        imageAgir { url alt }
        imageAgirAvecNous { url alt }
        imageAiderLesMigrants { url alt }
        imageEtiquetteUn { url alt }
        imageHistoireDe { url alt }
        imagePartieDeux { url alt }
        imageSAnceDInformation { url alt }
        imagesHeader { url alt }
        informationDeuxEnLigneHorsLigne
        informationTroisEnLigneHorsLigne
        informationUnEnLigneHorsLigne
        textEtiquetteDeux
        texteAgir
        texteAgirAvecNous
        texteAiderMigrant
        texteEntreprise
        texteHeader
        textePartieDeux
        texteSAnceDInformation
        texteTiquette
        titreAgir
        titreAgirAvecNous
        titreAiderMigrant
        titreEntreprise
        titreHeader
        titrePartieDeux
        titreSAnceDInformation
        titreTiquette
      }
      histoireDe {
        nomDeLActivit
        nomDeLaPersonne
        textePageDAccueil
        imageAccueil { url alt }
        url
      }
      allInformation {
        id
        titre
        texte
        image { url alt }
        urlButton
        texteButton
        horsLigneEnLigne
      }
    }
  `;
  
  const homepageData = await executeQuery(homepageQuery, { token: DATOCMS_TOKEN });
  
  // Traiter les informations
  const homepageInformations = await Promise.all(
    (homepageData.allInformation || [])
      .filter(info => info.horsLigneEnLigne === true)
      .map(async (info) => ({
        id: info.id || '',
        titre: info.titre || '',
        texte: info.texte || '',
        image: await processImage(info.image, `info-${info.id}`),
        urlButton: info.urlButton || undefined,
        texteButton: info.texteButton || undefined
      }))
  );
  
  // Traiter les images
  const imagesHeader = await processImages(homepageData.accueil.imagesHeader, 'header');
  const imagePartieDeux = await processImage(homepageData.accueil.imagePartieDeux, 'partie-deux');
  const imageAgir = await processImage(homepageData.accueil.imageAgir, 'agir');
  const imageAgirAvecNous = await processImage(homepageData.accueil.imageAgirAvecNous, 'agir-avec-nous');
  const imageHistoireDe = await processImage(homepageData.accueil.imageHistoireDe, 'histoire-de');
  const imageEtiquetteUn = await processImage(homepageData.accueil.imageEtiquetteUn, 'etiquette-un');
  const imageAccueil = await processImage(homepageData.histoireDe.imageAccueil, 'accueil-histoire');
  
  const homepageContent = `type Image = {
  url: string;
  alt: string;
};

type HtmlBlock = string;

type Information = {
  id: string;
  titre: string;
  texte: string;
  image: Image | null;
  urlButton?: string;
  texteButton?: string;
};

type HomepageData = {
  accueil: {
    titreHeader: string;
    texteHeader: HtmlBlock;
    imagesHeader: Image[];
    titrePartieDeux: string;
    textePartieDeux: HtmlBlock;
    imagePartieDeux: Image;
    titreAgir: string;
    texteAgir: HtmlBlock;
    titreAgirAvecNous: string;
    texteAgirAvecNous: HtmlBlock;
    imageAgir: Image;
    imageAgirAvecNous: Image;
    informationUnEnLigneHorsLigne: boolean;
    informationTroisEnLigneHorsLigne: boolean;
    titreTiquette: string;
    texteTiquette: HtmlBlock;
    textEtiquetteDeux: HtmlBlock;
    imageEtiquetteUn: Image;
  };
  menu: {
    sousMenuAgirAvecNousDevenirTalent: string;
    sousMenuAgirAvecNousFormerUnduo: string;
    sousMenuAgirAvecNousDevenirCoah: string;
    sousMenuAgirAvecNousParticiperFormation: string;
    sousMenuAgirAvecNousDevenirVolontaire: string;
    sousMenuAgirAvecNousFaireDon: string;
  };
  histoireDe: {
    textePageDAccueil: HtmlBlock;
    imageAccueil: Image;
    imageHistoireDe: Image;
  };
  allInformation: Information[];
};

export const homepageContent: HomepageData = {
  accueil: {
    titreHeader: ${formatValue(homepageData.accueil.titreHeader)},
    texteHeader: ${formatValue(homepageData.accueil.texteHeader, 0, true)},
    imagesHeader: ${formatValue(imagesHeader)},
    titrePartieDeux: ${formatValue(homepageData.accueil.titrePartieDeux)},
    textePartieDeux: ${formatValue(homepageData.accueil.textePartieDeux, 0, true)},
    imagePartieDeux: ${formatValue(imagePartieDeux)},
    titreAgir: ${formatValue(homepageData.accueil.titreAgir)},
    texteAgir: ${formatValue(homepageData.accueil.texteAgir, 0, true)},
    titreAgirAvecNous: ${formatValue(homepageData.accueil.titreAgirAvecNous)},
    texteAgirAvecNous: ${formatValue(homepageData.accueil.texteAgirAvecNous, 0, true)},
    imageAgir: ${formatValue(imageAgir)},
    imageAgirAvecNous: ${formatValue(imageAgirAvecNous)},
    informationUnEnLigneHorsLigne: ${homepageData.accueil.informationUnEnLigneHorsLigne || false},
    informationTroisEnLigneHorsLigne: ${homepageData.accueil.informationTroisEnLigneHorsLigne || false},
    titreTiquette: ${formatValue(homepageData.accueil.titreTiquette || '')},
    texteTiquette: ${formatValue(homepageData.accueil.texteTiquette || '', 0, true)},
    textEtiquetteDeux: ${formatValue(homepageData.accueil.textEtiquetteDeux || '', 0, true)},
    imageEtiquetteUn: ${formatValue(imageEtiquetteUn)}
  },
  menu: {
    sousMenuAgirAvecNousDevenirTalent: ${formatValue(menuDataForHomepage.menu.sousMenuAgirAvecNousDevenirTalent || 'Devenir un talent InterAct')},
    sousMenuAgirAvecNousFormerUnduo: ${formatValue(menuDataForHomepage.menu.sousMenuAgirAvecNousFormerUnduo || 'Former un Duo2Change')},
    sousMenuAgirAvecNousDevenirCoah: ${formatValue(menuDataForHomepage.menu.sousMenuAgirAvecNousDevenirCoah || 'Rejoindre l\'InterLab')},
    sousMenuAgirAvecNousParticiperFormation: ${formatValue(menuDataForHomepage.menu.sousMenuAgirAvecNousParticiperFormation || 'Participer à nos formations Com\'Together')},
    sousMenuAgirAvecNousDevenirVolontaire: ${formatValue(menuDataForHomepage.menu.sousMenuAgirAvecNousDevenirVolontaire || 'Devenir volontaire INTERRA')},
    sousMenuAgirAvecNousFaireDon: ${formatValue(menuDataForHomepage.menu.sousMenuAgirAvecNousFaireDon || 'Faire un Don')}
  },
  histoireDe: {
    textePageDAccueil: ${formatValue(homepageData.histoireDe.textePageDAccueil, 0, true)},
    imageAccueil: ${formatValue(imageAccueil)},
    imageHistoireDe: ${formatValue(imageHistoireDe)}
  },
  allInformation: ${formatValue(homepageInformations)}
};
`;
  
  writeFileSync(join(contentDir, 'homepage.ts'), homepageContent, 'utf-8');
  console.log('✅ Homepage synchronisée\n');
} catch (error) {
  console.error('❌ Erreur homepage:', error.message);
}

// 2. Menu
try {
  console.log('📥 Récupération du menu...');
  const menuQuery = `
    query {
      menu {
        imageLogo { url alt }
        imageWallonie { url alt }
        menuPrincipalUnAccueil
        menuPrincipalDeuxDecouvrirInterra
        menuPrincipalTroisProjets
        menuPrincipalQuatreAgenda
        menuPrincipalCinqAgirAvecNous
        menuPrincipalSixContact
        sousMenuDecouvrirInterraAdn
        sousMenuDecouvrirInterraMission
        sousMenuDecouvrirInterraPartenaires
        sousMenuDecouvrirInterraValeurs
        sousMenuDecouvrirInterraLexique
        sousMenuProjetInteract
        sousMenuProjetDuo
        sousMenuProjetFormation
        sousMenuProjetInterlab
        sousMenuAgirAvecNousDevenirCoah
        sousMenuAgirAvecNousDevenirVolontaire
        sousMenuAgirAvecNousDevenirTalent
        sousMenuAgirAvecNousFaireDon
        sousMenuAgirAvecNousFormerUnduo
        sousMenuAgirAvecNousParticiperFormation
      }
    }
  `;
  
  const menuData = await executeQuery(menuQuery, { token: DATOCMS_TOKEN });
  const imageLogo = await processImage(menuData.menu.imageLogo, 'logo');
  const imageWallonie = await processImage(menuData.menu.imageWallonie, 'wallonie');
  
  const menuContent = `export const menuContent = {
  menu: {
    id: 141104585,
    imageLogo: ${formatValue(imageLogo)},
    imageWallonie: ${formatValue(imageWallonie)},
    menuPrincipalUnAccueil: ${formatValue(menuData.menu.menuPrincipalUnAccueil)},
    menuPrincipalDeuxDecouvrirInterra: ${formatValue(menuData.menu.menuPrincipalDeuxDecouvrirInterra)},
    menuPrincipalTroisProjets: ${formatValue(menuData.menu.menuPrincipalTroisProjets)},
    menuPrincipalQuatreAgenda: ${formatValue(menuData.menu.menuPrincipalQuatreAgenda)},
    menuPrincipalCinqAgirAvecNous: ${formatValue(menuData.menu.menuPrincipalCinqAgirAvecNous)},
    menuPrincipalSixContact: ${formatValue(menuData.menu.menuPrincipalSixContact)},
    sousMenuProjetInteract: ${formatValue(menuData.menu.sousMenuProjetInteract)},
    sousMenuAgirAvecNousDevenirTalent: ${formatValue(menuData.menu.sousMenuAgirAvecNousDevenirTalent)},
    sousMenuDecouvrirInterraAdn: ${formatValue(menuData.menu.sousMenuDecouvrirInterraAdn)},
    sousMenuProjetDuo: ${formatValue(menuData.menu.sousMenuProjetDuo)},
    sousMenuDecouvrirInterraMission: ${formatValue(menuData.menu.sousMenuDecouvrirInterraMission)},
    sousMenuAgirAvecNousFormerUnduo: ${formatValue(menuData.menu.sousMenuAgirAvecNousFormerUnduo)},
    sousMenuProjetInterlab: ${formatValue(menuData.menu.sousMenuProjetInterlab)},
    sousMenuDecouvrirInterraValeurs: ${formatValue(menuData.menu.sousMenuDecouvrirInterraValeurs)},
    sousMenuAgirAvecNousDevenirCoah: ${formatValue(menuData.menu.sousMenuAgirAvecNousDevenirCoah)},
    sousMenuAgirAvecNousParticiperFormation: ${formatValue(menuData.menu.sousMenuAgirAvecNousParticiperFormation)},
    sousMenuDecouvrirInterraLexique: ${formatValue(menuData.menu.sousMenuDecouvrirInterraLexique)},
    sousMenuProjetFormation: ${formatValue(menuData.menu.sousMenuProjetFormation)},
    sousMenuAgirAvecNousDevenirVolontaire: ${formatValue(menuData.menu.sousMenuAgirAvecNousDevenirVolontaire)},
    sousMenuDecouvrirInterraPartenaires: ${formatValue(menuData.menu.sousMenuDecouvrirInterraPartenaires)},
    sousMenuAgirAvecNousFaireDon: ${formatValue(menuData.menu.sousMenuAgirAvecNousFaireDon)}
  }
};
`;
  
  writeFileSync(join(contentDir, 'menu.ts'), menuContent, 'utf-8');
  console.log('✅ Menu synchronisé\n');
} catch (error) {
  console.error('❌ Erreur menu:', error.message);
}

// 3. Contact
try {
  console.log('📥 Récupération des contacts...');
  const contactQuery = `
    query {
      allPersonneContacts {
        nomPrNom
        numRoDeTLPhone
        photo { url alt }
        adresseMail
        fonction
      }
    }
  `;
  
  const contactData = await executeQuery(contactQuery, { token: DATOCMS_TOKEN });
  
  const contacts = await Promise.all(
    contactData.allPersonneContacts.map(async (contact) => ({
      nomPrNom: contact.nomPrNom || '',
      numRoDeTLPhone: contact.numRoDeTLPhone || '',
      photo: await processImage(contact.photo, `contact-${contact.nomPrNom?.replace(/[^a-zA-Z0-9]/g, '_') || 'unknown'}`),
      adresseMail: contact.adresseMail || '',
      fonction: contact.fonction || ''
    }))
  );
  
  const contactContent = `type Image = {
  url: string;
  alt: string;
};

export type Contact = {
  nomPrNom: string;
  numRoDeTLPhone: string;
  photo: Image;
  adresseMail: string;
  fonction: string;
};

export const contactContent = {
  contacts: ${formatValue(contacts)}
};
`;
  
  writeFileSync(join(contentDir, 'contact.ts'), contactContent, 'utf-8');
  console.log('✅ Contacts synchronisés\n');
} catch (error) {
  console.error('❌ Erreur contacts:', error.message);
}

// 4. Agir avec nous
try {
  console.log('📥 Récupération de "Agir avec nous"...');
  const agirQuery = `
    query {
      agirAvecNou {
        accrocheMembre
        imageBNVole { url alt }
        imageDon { url alt }
        imageDuoLange { url alt }
        imageMembre { url alt }
        imageTalent { url alt }
        imageParticiperFormation { url alt }
        texteParticiperFormation
        titreParticiperFormation
        numRoDeCompte
        texteBNVole
        texteDon
        texteDuoLangue
        texteMembre
        texteTalent
        titreBNVole
        titreDon
        titreDuoLangue
        titreMembre
        titreTalent
      }
    }
  `;
  
  const agirData = await executeQuery(agirQuery, { token: DATOCMS_TOKEN });
  
  const agirContent = `type Image = {
  url: string;
  alt: string;
};

export type AgirAvecNousContent = {
  agirAvecNou: {
    accrocheMembre: string;
    imageBNVole: Image;
    imageDon: Image;
    imageDuoLange: Image;
    imageMembre: Image;
    imageTalent: Image;
    imageParticiperFormation: Image;
    texteParticiperFormation: string;
    titreParticiperFormation: string;
    numRoDeCompte: string;
    texteBNVole: string;
    texteDon: string;
    texteDuoLangue: string;
    texteMembre: string;
    texteTalent: string;
    titreBNVole: string;
    titreDon: string;
    titreDuoLangue: string;
    titreMembre: string;
    titreTalent: string;
  };
};

export const agirAvecNousContent: AgirAvecNousContent = {
  agirAvecNou: {
    accrocheMembre: ${formatValue(agirData.agirAvecNou.accrocheMembre)},
    imageBNVole: ${formatValue(await processImage(agirData.agirAvecNou.imageBNVole, 'benevole'))},
    imageDon: ${formatValue(await processImage(agirData.agirAvecNou.imageDon, 'don'))},
    imageDuoLange: ${formatValue(await processImage(agirData.agirAvecNou.imageDuoLange, 'duo-langue'))},
    imageMembre: ${formatValue(await processImage(agirData.agirAvecNou.imageMembre, 'membre'))},
    imageTalent: ${formatValue(await processImage(agirData.agirAvecNou.imageTalent, 'talent'))},
    imageParticiperFormation: ${formatValue(await processImage(agirData.agirAvecNou.imageParticiperFormation, 'participer-formation'))},
    texteParticiperFormation: ${formatValue(agirData.agirAvecNou.texteParticiperFormation, 0, true)},
    titreParticiperFormation: ${formatValue(agirData.agirAvecNou.titreParticiperFormation)},
    numRoDeCompte: ${formatValue(agirData.agirAvecNou.numRoDeCompte)},
    texteBNVole: ${formatValue(agirData.agirAvecNou.texteBNVole, 0, true)},
    texteDon: ${formatValue(agirData.agirAvecNou.texteDon, 0, true)},
    texteDuoLangue: ${formatValue(agirData.agirAvecNou.texteDuoLangue, 0, true)},
    texteMembre: ${formatValue(agirData.agirAvecNou.texteMembre, 0, true)},
    texteTalent: ${formatValue(agirData.agirAvecNou.texteTalent, 0, true)},
    titreBNVole: ${formatValue(agirData.agirAvecNou.titreBNVole)},
    titreDon: ${formatValue(agirData.agirAvecNou.titreDon)},
    titreDuoLangue: ${formatValue(agirData.agirAvecNou.titreDuoLangue)},
    titreMembre: ${formatValue(agirData.agirAvecNou.titreMembre)},
    titreTalent: ${formatValue(agirData.agirAvecNou.titreTalent)}
  }
};
`;
  
  writeFileSync(join(contentDir, 'agir-avec-nous.ts'), agirContent, 'utf-8');
  console.log('✅ Agir avec nous synchronisé\n');
} catch (error) {
  console.error('❌ Erreur agir avec nous:', error.message);
}

// 5. Informations (pour la homepage)
try {
  console.log('📥 Récupération des informations...');
  const informationsQuery = `
    query {
      allInformation {
        id
        titre
        texte
        image { url alt }
        urlButton
        texteButton
        horsLigneEnLigne
      }
    }
  `;
  
  const informationsData = await executeQuery(informationsQuery, { token: DATOCMS_TOKEN });
  
  const informations = await Promise.all(
    informationsData.allInformation
      .filter(info => info.horsLigneEnLigne === true)
      .map(async (info) => ({
        id: info.id || '',
        titre: info.titre || '',
        texte: info.texte || '',
        image: await processImage(info.image, `info-${info.id}`),
        urlButton: info.urlButton || undefined,
        texteButton: info.texteButton || undefined
      }))
  );
  
  const informationsContent = `type Image = {
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
  allInformation: ${formatValue(informations)}
};
`;
  
  writeFileSync(join(contentDir, 'informations.ts'), informationsContent, 'utf-8');
  console.log('✅ Informations synchronisées\n');
} catch (error) {
  console.error('❌ Erreur informations:', error.message);
}

// 6. Séance d'information
try {
  console.log('📥 Récupération de la séance d\'information...');
  const seanceQuery = `
    query {
      sAncesDInformation {
        adresseMailSAnceDInformation
        dateProchaineSAnceDInformation
        lieuxSAnceDInformation
        texteDInformation
        titreSAnceDInformation
      }
    }
  `;
  
  const seanceData = await executeQuery(seanceQuery, { token: DATOCMS_TOKEN });
  
  const seanceContent = `export type SeanceDInformationContent = {
  sAncesDInformation: {
    titreSAnceDInformation: string;
    texteDInformation: string;
    dateProchaineSAnceDInformation: string;
    adresseMailSAnceDInformation: string;
    lieuxSAnceDInformation?: string;
  } | null;
};

export const seanceDInformationContent: SeanceDInformationContent = {
  sAncesDInformation: ${seanceData.sAncesDInformation ? formatValue({
    titreSAnceDInformation: seanceData.sAncesDInformation.titreSAnceDInformation || '',
    texteDInformation: seanceData.sAncesDInformation.texteDInformation || '',
    dateProchaineSAnceDInformation: seanceData.sAncesDInformation.dateProchaineSAnceDInformation || '',
    adresseMailSAnceDInformation: seanceData.sAncesDInformation.adresseMailSAnceDInformation || '',
    lieuxSAnceDInformation: seanceData.sAncesDInformation.lieuxSAnceDInformation || undefined
  }) : 'null'}
};
`;
  
  writeFileSync(join(contentDir, 'seance-d-information.ts'), seanceContent, 'utf-8');
  console.log('✅ Séance d\'information synchronisée\n');
} catch (error) {
  console.error('❌ Erreur séance d\'information:', error.message);
}

// 7. Footer
try {
  console.log('📥 Récupération du footer...');
  const footerQuery = `
    query {
      footer {
        soutiens { url alt customData }
      }
    }
  `;
  
  const footerData = await executeQuery(footerQuery, { token: DATOCMS_TOKEN });
  
  const soutiens = await Promise.all(
    (footerData.footer?.soutiens || []).map(async (soutien) => {
      const image = await processImage(soutien, 'soutien');
      return {
        ...image,
        customData: soutien.customData || null
      };
    })
  );
  
  const footerContent = `type Image = {
  url: string;
  alt: string;
  customData?: any;
};

export const footerContent = {
  footer: {
    soutiens: ${formatValue(soutiens)}
  }
};
`;
  
  writeFileSync(join(contentDir, 'footer.ts'), footerContent, 'utf-8');
  console.log('✅ Footer synchronisé\n');
} catch (error) {
  console.error('❌ Erreur footer:', error.message);
}

// 8. Découvrir Interra
try {
  console.log('📥 Récupération de "Découvrir Interra"...');
  const decouvrirQuery = `
    query {
      decouvrirInterra {
        deuxConstats
        imageAdn { url alt }
        imageLien { url alt }
        imageMission { url alt }
        imageValeurs { url alt }
        imagesNosPartenaires { url alt customData }
        introductionListeConstat
        listeDeuxConstats
        listeLien
        listeValeurs
        texteDeuxConstatsDeux
        texteDeuxConstatsUn
        texteLien
        texteNosMissions
        textePourquoiInterra
        texteQuiSommesNous
        titreAdn
        titreLien
        titreNosMissions
        titreNosPartenaires
        titreNosProjets
        titrePourquoiInterra
        titreQuiSommesNous
        titreValeurs
        phraseLien
        introductionLexique
        texteLexique
        titreLexique
      }
    }
  `;
  
  const decouvrirData = await executeQuery(decouvrirQuery, { token: DATOCMS_TOKEN });
  
  const imageAdn = await processImage(decouvrirData.decouvrirInterra.imageAdn, 'adn');
  const imageLien = await processImage(decouvrirData.decouvrirInterra.imageLien, 'lien');
  const imageMission = await processImage(decouvrirData.decouvrirInterra.imageMission, 'mission');
  const imageValeurs = await processImage(decouvrirData.decouvrirInterra.imageValeurs, 'valeurs');
  const imagesNosPartenaires = await processImages(decouvrirData.decouvrirInterra.imagesNosPartenaires, 'partenaire');
  
  const decouvrirContent = `type Image = {
  url: string;
  alt: string;
  customData?: any;
};

export const decouvrirInterraContent = {
  decouvrirInterra: {
    titreAdn: ${formatValue(decouvrirData.decouvrirInterra.titreAdn)},
    imageAdn: ${formatValue(imageAdn)},
    titreQuiSommesNous: ${formatValue(decouvrirData.decouvrirInterra.titreQuiSommesNous)},
    texteQuiSommesNous: ${formatValue(decouvrirData.decouvrirInterra.texteQuiSommesNous, 0, true)},
    deuxConstats: ${formatValue(decouvrirData.decouvrirInterra.deuxConstats)},
    texteDeuxConstatsUn: ${formatValue(decouvrirData.decouvrirInterra.texteDeuxConstatsUn, 0, true)},
    texteDeuxConstatsDeux: ${formatValue(decouvrirData.decouvrirInterra.texteDeuxConstatsDeux, 0, true)},
    introductionListeConstat: ${formatValue(decouvrirData.decouvrirInterra.introductionListeConstat, 0, true)},
    listeDeuxConstats: ${formatValue(decouvrirData.decouvrirInterra.listeDeuxConstats, 0, true)},
    titreLien: ${formatValue(decouvrirData.decouvrirInterra.titreLien)},
    texteLien: ${formatValue(decouvrirData.decouvrirInterra.texteLien, 0, true)},
    listeLien: ${formatValue(decouvrirData.decouvrirInterra.listeLien, 0, true)},
    phraseLien: ${formatValue(decouvrirData.decouvrirInterra.phraseLien, 0, true)},
    imageLien: ${formatValue(imageLien)},
    titreNosMissions: ${formatValue(decouvrirData.decouvrirInterra.titreNosMissions)},
    texteNosMissions: ${formatValue(decouvrirData.decouvrirInterra.texteNosMissions, 0, true)},
    imageMission: ${formatValue(imageMission)},
    titreValeurs: ${formatValue(decouvrirData.decouvrirInterra.titreValeurs)},
    listeValeurs: ${formatValue(decouvrirData.decouvrirInterra.listeValeurs, 0, true)},
    imageValeurs: ${formatValue(imageValeurs)},
    titrePourquoiInterra: ${formatValue(decouvrirData.decouvrirInterra.titrePourquoiInterra)},
    textePourquoiInterra: ${formatValue(decouvrirData.decouvrirInterra.textePourquoiInterra, 0, true)},
    titreLexique: ${formatValue(decouvrirData.decouvrirInterra.titreLexique)},
    introductionLexique: ${formatValue(decouvrirData.decouvrirInterra.introductionLexique, 0, true)},
    texteLexique: ${formatValue(decouvrirData.decouvrirInterra.texteLexique, 0, true)},
    titreNosPartenaires: ${formatValue(decouvrirData.decouvrirInterra.titreNosPartenaires)},
    imagesNosPartenaires: ${formatValue(imagesNosPartenaires)}
  }
};
`;
  
  writeFileSync(join(contentDir, 'decouvrir-interra.ts'), decouvrirContent, 'utf-8');
  console.log('✅ Découvrir Interra synchronisé\n');
} catch (error) {
  console.error('❌ Erreur découvrir Interra:', error.message);
}

// 9. Projets (nos-projets, inter-act, duo-langue, incubateur-inclusif, formation-interculturelle)
// Cette section doit être exécutée AVANT les sections individuelles pour fournir les données chapeau et imageListeProjets
try {
  console.log('📥 Récupération des projets...');
  const projetsQuery = `
    query {
      nosProjet {
        titreDeLaPage
        texteDeLaPage
        imageDeLaPage { url alt }
        urlPdf
      }
      duoLangue {
        chapeau
        imageListeProjets { url alt }
        titre
      }
      incubateurInclusif {
        chapeau
        imageListeProjets { url alt }
        titre
      }
      interAct {
        chapeau
        imageListe { url alt }
        titre
      }
      formationInterculturelle {
        chapeau
        imageListeProjets { url alt }
        titre
      }
    }
  `;
  
  projetsDataCache = await executeQuery(projetsQuery, { token: DATOCMS_TOKEN });
  
  // Nos projets
  const nosProjetsContent = `export type NosProjetsContent = {
  nosProjet: {
    titreDeLaPage: string;
    texteDeLaPage: string;
    urlPdf: string;
    imageDeLaPage: {
      url: string;
      alt: string;
    };
  };
};

export const nosProjetsContent: NosProjetsContent = {
  nosProjet: {
    titreDeLaPage: ${formatValue(projetsDataCache.nosProjet.titreDeLaPage)},
    texteDeLaPage: ${formatValue(projetsDataCache.nosProjet.texteDeLaPage, 0, true)},
    urlPdf: ${formatValue(projetsDataCache.nosProjet.urlPdf)},
    imageDeLaPage: ${formatValue(await processImage(projetsDataCache.nosProjet.imageDeLaPage, 'nos-projets'))}
  }
};
`;
  
  writeFileSync(join(contentDir, 'nos-projets.ts'), nosProjetsContent, 'utf-8');
  
  // Projets (agrégation)
  const projetsContent = `import { nosProjetsContent } from './nos-projets';
import { interActContent } from './inter-act';
import { duoLangueContent } from './duo-langue';
import { incubateurInclusifContent } from './incubateur-inclusif';
import { formationInterculturelleContent } from './formation-interculturelle';

export type ProjetsContent = {
  nosProjet: {
    titreDeLaPage: string;
    texteDeLaPage: string;
    urlPdf: string;
    imageDeLaPage: {
      url: string;
      alt: string;
    };
  };
  interAct: {
    titre: string;
    chapeau: string;
    imageListe: {
      url: string;
      alt: string;
    };
  };
  duoLangue: {
    titre: string;
    chapeau: string;
    imageListeProjets: {
      url: string;
      alt: string;
    };
  };
  incubateurInclusif: {
    titre: string;
    chapeau: string;
    imageListeProjets: {
      url: string;
      alt: string;
    };
  };
  formationInterculturelle: {
    titre: string;
    chapeau: string;
    imageListeProjets: {
      url: string;
      alt: string;
    };
  };
};

export const projetsContent: ProjetsContent = {
  nosProjet: nosProjetsContent.nosProjet,
  interAct: {
    titre: ${formatValue(projetsDataCache.interAct.titre)},
    chapeau: ${formatValue(projetsDataCache.interAct.chapeau || '', 0, true)},
    imageListe: ${formatValue(await processImage(projetsDataCache.interAct.imageListe, 'interact-liste'))}
  },
  duoLangue: {
    titre: ${formatValue(projetsDataCache.duoLangue.titre)},
    chapeau: ${formatValue(projetsDataCache.duoLangue.chapeau || '', 0, true)},
    imageListeProjets: ${formatValue(await processImage(projetsDataCache.duoLangue.imageListeProjets, 'duo-liste'))}
  },
  incubateurInclusif: {
    titre: ${formatValue(projetsDataCache.incubateurInclusif.titre)},
    chapeau: ${formatValue(projetsDataCache.incubateurInclusif.chapeau || '', 0, true)},
    imageListeProjets: ${formatValue(await processImage(projetsDataCache.incubateurInclusif.imageListeProjets, 'incubateur-liste'))}
  },
  formationInterculturelle: {
    titre: ${formatValue(projetsDataCache.formationInterculturelle.titre)},
    chapeau: ${formatValue(projetsDataCache.formationInterculturelle.chapeau || '', 0, true)},
    imageListeProjets: ${formatValue(await processImage(projetsDataCache.formationInterculturelle.imageListeProjets, 'formation-liste'))}
  }
};
`;
  
  writeFileSync(join(contentDir, 'projets.ts'), projetsContent, 'utf-8');
  console.log('✅ Projets synchronisés\n');
} catch (error) {
  console.error('❌ Erreur projets:', error.message);
}

// 10. Inter-Act
try {
  console.log('📥 Récupération d\'Inter-Act...');
  const interActQuery = `
    query {
      interAct {
        titre
        introduction
        chapeau
        imageListe { url alt }
      }
    }
  `;
  
  const interActData = await executeQuery(interActQuery, { token: DATOCMS_TOKEN });
  
  // Nettoyer l'introduction
  let introduction = interActData.interAct.introduction || '';
  introduction = introduction.replace(/\\s*PROGRAMME\\s+DU\\s+MOIS\\s*[-–—]?\\s*$/i, '').trim();
  
  // Récupérer chapeau et imageListe depuis projetsDataCache si disponible
  const interActChapeau = projetsDataCache?.interAct?.chapeau || interActData.interAct.chapeau || '';
  const interActImageListe = projetsDataCache?.interAct?.imageListe
    ? await processImage(projetsDataCache.interAct.imageListe, 'interact-liste')
    : await processImage(interActData.interAct.imageListe, 'interact-liste');
  
  const interActContent = `export type InterActContent = {
  interAct: {
    titre: string;
    introduction: string;
    chapeau: string;
    imageListe: {
      url: string;
      alt: string;
    };
  };
};

export const interActContent: InterActContent = {
  interAct: {
    titre: ${formatValue(interActData.interAct.titre)},
    introduction: ${formatValue(introduction, 0, true)},
    chapeau: ${formatValue(interActChapeau, 0, true)},
    imageListe: ${formatValue(interActImageListe)}
  }
};
`;
  
  writeFileSync(join(contentDir, 'inter-act.ts'), interActContent, 'utf-8');
  console.log('✅ Inter-Act synchronisé\n');
} catch (error) {
  console.error('❌ Erreur Inter-Act:', error.message);
}

// 11. Duo2Change (duo-langue)
try {
  console.log('📥 Récupération de Duo2Change...');
  const duoQuery = `
    query {
      duoLangue {
        imageRoleInterra { url alt }
        listeRoleInterra
        texteFinDImplication
        texteKSako
        texteOutilDeCommunication
        textePourQui
        titre
        titreFinDImplication
        titreKSako
        titrePourQui
        titreRoleInterra
        titreVotreImplication
        texteVotreImplication
        videoKSako {
          video {
            muxPlaybackId
            framerate
            duration
            streamingUrl
            thumbnailUrl
            mp4Url
          }
        }
      }
    }
  `;
  
  const duoData = await executeQuery(duoQuery, { token: DATOCMS_TOKEN });
  
  // Récupérer chapeau et imageListeProjets depuis projetsDataCache si disponible
  const duoChapeau = projetsDataCache?.duoLangue?.chapeau || '';
  const duoImageListe = projetsDataCache?.duoLangue?.imageListeProjets
    ? await processImage(projetsDataCache.duoLangue.imageListeProjets, 'duo-liste')
    : { url: '', alt: '' };
  
  const duoContent = `export type DuoLangueContent = {
  duoLangue: {
    titre: string;
    chapeau: string;
    imageListeProjets: {
      url: string;
      alt: string;
    };
    titreKSako: string;
    texteKSako: string;
    titrePourQui: string;
    textePourQui: string;
    titreRoleInterra: string;
    listeRoleInterra: string;
    imageRoleInterra: {
      url: string;
      alt: string;
    };
    titreVotreImplication: string;
    texteVotreImplication: string;
    titreFinDImplication: string;
    texteFinDImplication: string;
    videoKSako: {
      video: {
        mp4Url: string;
      };
    };
  };
};

export const duoLangueContent: DuoLangueContent = {
  duoLangue: {
    titre: ${formatValue(duoData.duoLangue.titre)},
    chapeau: ${formatValue(duoChapeau, 0, true)},
    imageListeProjets: ${formatValue(duoImageListe)},
    titreKSako: ${formatValue(duoData.duoLangue.titreKSako)},
    texteKSako: ${formatValue(duoData.duoLangue.texteKSako, 0, true)},
    titrePourQui: ${formatValue(duoData.duoLangue.titrePourQui)},
    textePourQui: ${formatValue(duoData.duoLangue.textePourQui, 0, true)},
    titreRoleInterra: ${formatValue(duoData.duoLangue.titreRoleInterra)},
    listeRoleInterra: ${formatValue(duoData.duoLangue.listeRoleInterra, 0, true)},
    imageRoleInterra: ${formatValue(await processImage(duoData.duoLangue.imageRoleInterra, 'duo-role'))},
    titreVotreImplication: ${formatValue(duoData.duoLangue.titreVotreImplication)},
    texteVotreImplication: ${formatValue(duoData.duoLangue.texteVotreImplication, 0, true)},
    titreFinDImplication: ${formatValue(duoData.duoLangue.titreFinDImplication)},
    texteFinDImplication: ${formatValue(duoData.duoLangue.texteFinDImplication, 0, true)},
    videoKSako: {
      video: {
        mp4Url: ${formatValue(duoData.duoLangue.videoKSako?.video?.mp4Url || '')}
      }
    }
  }
};
`;
  
  writeFileSync(join(contentDir, 'duo-langue.ts'), duoContent, 'utf-8');
  console.log('✅ Duo2Change synchronisé\n');
} catch (error) {
  console.error('❌ Erreur Duo2Change:', error.message);
}

// 12. InterLab (incubateur-inclusif)
try {
  console.log('📥 Récupération d\'InterLab...');
  const incubateurQuery = `
    query {
      incubateurInclusif {
        image { url alt }
        textePartieDeux
        textePartieUn
        titre
        titreIncubateurInclusif
      }
    }
  `;
  
  const incubateurData = await executeQuery(incubateurQuery, { token: DATOCMS_TOKEN });
  
  // Récupérer chapeau et imageListeProjets depuis projetsDataCache si disponible
  const incubateurChapeau = projetsDataCache?.incubateurInclusif?.chapeau || '';
  const incubateurImageListe = projetsDataCache?.incubateurInclusif?.imageListeProjets
    ? await processImage(projetsDataCache.incubateurInclusif.imageListeProjets, 'incubateur-liste')
    : { url: '', alt: '' };
  
  const incubateurContent = `export type IncubateurInclusifContent = {
  incubateurInclusif: {
    titre: string;
    titreIncubateurInclusif: string;
    chapeau: string;
    imageListeProjets: {
      url: string;
      alt: string;
    };
    textePartieUn: string;
    textePartieDeux: string;
    image: {
      url: string;
      alt: string;
    };
  };
};

export const incubateurInclusifContent: IncubateurInclusifContent = {
  incubateurInclusif: {
    titre: ${formatValue(incubateurData.incubateurInclusif.titre)},
    titreIncubateurInclusif: ${formatValue(incubateurData.incubateurInclusif.titreIncubateurInclusif)},
    chapeau: ${formatValue(incubateurChapeau, 0, true)},
    imageListeProjets: ${formatValue(incubateurImageListe)},
    textePartieUn: ${formatValue(incubateurData.incubateurInclusif.textePartieUn, 0, true)},
    textePartieDeux: ${formatValue(incubateurData.incubateurInclusif.textePartieDeux, 0, true)},
    image: ${formatValue(await processImage(incubateurData.incubateurInclusif.image, 'incubateur'))}
  }
};
`;
  
  writeFileSync(join(contentDir, 'incubateur-inclusif.ts'), incubateurContent, 'utf-8');
  console.log('✅ InterLab synchronisé\n');
} catch (error) {
  console.error('❌ Erreur InterLab:', error.message);
}

// 13. Formation interculturelle
try {
  console.log('📥 Récupération de la formation interculturelle...');
  const formationQuery = `
    query {
      formationInterculturelle {
        imageFormateurDeux { url alt }
        imageFormateurUn { url alt }
        imageFormateurs { url alt }
        nomFormateurDeux
        nomFormateurUn
        texteFormateurDeux
        texteFormateurUn
        imageDeuxOrganiser { url alt }
        imageUneOrganiser { url alt }
        imageTroisOrganiser { url alt }
        texteDeuxOrganiser
        texteTroisOrganiser
        texteUnOrganiser
        texteUnUn
        titre
        titreOrganiser
      }
    }
  `;
  
  const formationData = await executeQuery(formationQuery, { token: DATOCMS_TOKEN });
  
  // Récupérer chapeau et imageListeProjets depuis projetsDataCache si disponible
  const formationChapeau = projetsDataCache?.formationInterculturelle?.chapeau || '';
  const formationImageListe = projetsDataCache?.formationInterculturelle?.imageListeProjets
    ? await processImage(projetsDataCache.formationInterculturelle.imageListeProjets, 'formation-liste')
    : { url: '', alt: '' };
  
  const formationContent = `export const formationInterculturelleContent = {
  formationInterculturelle: {
    id: 69510086,
    titre: ${formatValue(formationData.formationInterculturelle.titre)},
    titreOrganiser: ${formatValue(formationData.formationInterculturelle.titreOrganiser)},
    chapeau: ${formatValue(formationChapeau, 0, true)},
    texteUnOrganiser: ${formatValue(formationData.formationInterculturelle.texteUnOrganiser, 0, true)},
    texteUnUn: ${formatValue(formationData.formationInterculturelle.texteUnUn, 0, true)},
    texteDeuxOrganiser: ${formatValue(formationData.formationInterculturelle.texteDeuxOrganiser, 0, true)},
    texteTroisOrganiser: ${formatValue(formationData.formationInterculturelle.texteTroisOrganiser, 0, true)},
    imageUneOrganiser: ${formatValue(await processImage(formationData.formationInterculturelle.imageUneOrganiser, 'formation-une'))},
    imageDeuxOrganiser: ${formatValue(formationData.formationInterculturelle.imageDeuxOrganiser ? await processImage(formationData.formationInterculturelle.imageDeuxOrganiser, 'formation-deux') : null)},
    imageTroisOrganiser: ${formatValue(await processImage(formationData.formationInterculturelle.imageTroisOrganiser, 'formation-trois'))},
    imageListeProjets: ${formatValue(formationImageListe)},
    nomFormateurUn: ${formatValue(formationData.formationInterculturelle.nomFormateurUn)},
    nomFormateurDeux: ${formatValue(formationData.formationInterculturelle.nomFormateurDeux)},
    texteFormateurUn: ${formatValue(formationData.formationInterculturelle.texteFormateurUn, 0, true)},
    texteFormateurDeux: ${formatValue(formationData.formationInterculturelle.texteFormateurDeux, 0, true)},
    imageFormateurUn: ${formatValue(formationData.formationInterculturelle.imageFormateurUn ? await processImage(formationData.formationInterculturelle.imageFormateurUn, 'formateur-un') : null)},
    imageFormateurDeux: ${formatValue(formationData.formationInterculturelle.imageFormateurDeux ? await processImage(formationData.formationInterculturelle.imageFormateurDeux, 'formateur-deux') : null)},
    imageFormateurs: ${formatValue(formationData.formationInterculturelle.imageFormateurs ? await processImage(formationData.formationInterculturelle.imageFormateurs, 'formateurs') : null)}
  }
};
`;
  
  writeFileSync(join(contentDir, 'formation-interculturelle.ts'), formationContent, 'utf-8');
  console.log('✅ Formation interculturelle synchronisée\n');
} catch (error) {
  console.error('❌ Erreur formation interculturelle:', error.message);
}

// 14. Presse
try {
  console.log('📥 Récupération de la presse...');
  const presseQuery = `
    query {
      presse {
        id
        extrait
        logoMedia { url alt }
        nomDeLArticle
        nomDuMDia
        urlArticle
      }
    }
  `;
  
  const presseData = await executeQuery(presseQuery, { token: DATOCMS_TOKEN });
  
  const presseContent = `type Image = {
  url: string;
  alt: string;
};

export type PresseContent = {
  presse: {
    id: string;
    extrait: string;
    logoMedia: Image;
    nomDeLArticle: string;
    nomDuMDia: string;
    urlArticle: string;
  } | null;
};

export const presseContent: PresseContent = {
  presse: ${presseData.presse ? formatValue({
    id: presseData.presse.id || '',
    extrait: presseData.presse.extrait || '',
    logoMedia: await processImage(presseData.presse.logoMedia, 'presse-logo'),
    nomDeLArticle: presseData.presse.nomDeLArticle || '',
    nomDuMDia: presseData.presse.nomDuMDia || '',
    urlArticle: presseData.presse.urlArticle || ''
  }) : 'null'}
};
`;
  
  writeFileSync(join(contentDir, 'presse.ts'), presseContent, 'utf-8');
  console.log('✅ Presse synchronisée\n');
} catch (error) {
  console.error('❌ Erreur presse:', error.message);
}

console.log('✅ Synchronisation terminée!');

