import type { Information } from './informations';
import { informationsContent } from './informations';

type Image = {
  url: string;
  alt: string;
};

type HtmlBlock = string;

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
    titreInformationUn: string;
    texteInformationUn: HtmlBlock;
    imageInformationUn: Image;
    informationTroisEnLigneHorsLigne: boolean;
    titreInformationTrois: string;
    texteInformationTrois: HtmlBlock;
    imageInformationTrois: Image;
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
    titreHeader: 'Se réunir et s’enrichir',
    texteHeader:
      '<p>INTERRA veut créer des espaces de rencontre entre les personnes nouvellement arrivées en terre liégeoise et les personnes locales, via la mise en valeur de leurs talents, savoir-faire et passions, afin de créer une société plus inclusive.</p>',
    imagesHeader: [
      {
        url: '/images/221_anniversaireinterra.jpg',
        alt: '221_anniversaireinterra.jpg'
      },
      {
        url: '/images/163_interra.jpg',
        alt: '163_interra.jpg'
      },
      {
        url: '/images/79_anniversaireinterra.jpg',
        alt: '79_anniversaireinterra.jpg'
      },
      {
        url: '/images/03-09-2024-4-atelier-expression-artistique-justine-1.jpeg',
        alt: '03-09-2024-4-atelier-expression-artistique-justine-1.jpeg'
      },
      {
        url: '/images/480231956_1065284638964173_1550344876284952145_n.jpg',
        alt: '480231956_1065284638964173_1550344876284952145_n.jpg'
      },
      {
        url: '/images/photos-duo-4.jpeg',
        alt: 'photos-duo-4.jpeg'
      },
      {
        url: '/images/500812408_1149600903865879_8366366743393955798_n.jpg',
        alt: '500812408_1149600903865879_8366366743393955798_n.jpg'
      },
      {
        url: '/images/506086047_1158223193003650_1452334359499558543_n.jpg',
        alt: '506086047_1158223193003650_1452334359499558543_n.jpg'
      },
      {
        url: '/images/photos-duo-5.jpeg',
        alt: 'photos-duo-5.jpeg'
      },
      {
        url: '/images/505485163_1158223163003653_5108061113447176579_n.jpg',
        alt: '505485163_1158223163003653_5108061113447176579_n.jpg'
      },
      {
        url: '/images/501197083_1149600553865914_1108199081761878972_n.jpg',
        alt: '501197083_1149600553865914_1108199081761878972_n.jpg'
      }
    ],
    titrePartieDeux: 'L’asbl qui crée du lien entre les personnes migrantes et les Liégeois·es',
    textePartieDeux:
      '<p>Après un parcours migratoire souvent chaotique et violent, beaucoup de personnes se retrouvent isolées et sans réseau social. Notre volonté est que l’immigration ne soit plus perçue de manière négative par la société d’accueil, mais comme une richesse. Nous voulons aussi créer des opportunités de rencontres entre les personnes nouvellement arrivées et les personnes locales de manière participative et innovante, via la mise en valeur des connaissances, savoir-faire et passions de chacun·e.</p>',
    imagePartieDeux: {
      url: '/images/2024-06-01-anniv-interra-53.jpg',
      alt: '2024-06-01-anniv-interra-53.jpg'
    },
    titreAgir: 'Agir avec nous !',
    texteAgir:
      '<p>Vous souhaitez porter, soutenir et/ou participer à un atelier <strong>InterAct</strong> ? Constituer un duo dans le projet <strong>Duo2Change</strong> ? Lancer votre projet ou devenir coach pour l’<strong>InterLab</strong> ? Contactez-nous !</p><p>Les soutiens financiers sont également essentiels pour que INTERRA continue à vivre. Que votre don soit petit (même 1 €) ou grand, ponctuel ou régulier, il nous aidera beaucoup. Ensemble, agissons pour faire en sorte que l’immigration ne soit plus perçue comme une charge, mais comme une richesse pour la société d’accueil !</p>',
    titreAgirAvecNous: 'Agir avec nous !',
    texteAgirAvecNous:
      '<p>Vous souhaitez porter, soutenir et/ou participer à un atelier <strong>InterAct</strong> ? Constituer un duo dans le projet <strong>Duo2Change</strong> ? Lancer votre projet ou devenir expert pour l’<strong>InterLab</strong> ? Participer à nos <strong>formations</strong> sur la communication interculturelle ? Contactez-nous !</p><p>Les soutiens financiers sont également essentiels pour que INTERRA continue à vivre. Que votre don soit petit (même 1 €) ou grand, ponctuel ou régulier, il nous aidera beaucoup. Ensemble, agissons pour faire en sorte que l’immigration ne soit plus perçue comme une charge, mais comme une richesse pour la société d’accueil !</p>',
    imageAgir: {
      url: '/images/2024-06-01-anniv-interra-19.jpg',
      alt: '2024-06-01-anniv-interra-19.jpg'
    },
    imageAgirAvecNous: {
      url: '/images/2024-06-01-anniv-interra-19.jpg',
      alt: '2024-06-01-anniv-interra-19.jpg'
    },
    informationUnEnLigneHorsLigne: true,
    titreInformationUn: 'INTERRA fête ses 6 ans !',
    texteInformationUn:
      '<p>Parce qu’aujourd’hui plus que jamais, l’inclusion, la diversité et le vivre-ensemble ne peuvent pas attendre&nbsp;! Pour nos 6 ans, nous lançons une <strong>campagne de solidarité</strong> : donnez 6 €, 60 € et pourquoi pas 600 € ou 6000 € ! Chaque geste compte.</p><p>Participez via les QR codes présents sur nos visuels ou par virement sur le compte de Caritas <strong>BE04 2400 8007 6231</strong> avec la communication <strong>PROJET 732 371</strong>.</p><p>Merci d’être là, depuis 6 jours ou depuis 6 ans. L’aventure continuera, avec vous !</p>',
    imageInformationUn: {
      url: '/images/site-visuel-campagne-2025.png',
      alt: 'site-visuel-campagne-2025.png'
    },
    informationTroisEnLigneHorsLigne: true,
    titreInformationTrois: 'Campagne solidaire 2025',
    texteInformationTrois:
      '<p>INTERRA a besoin de vous pour écrire la suite de son histoire. Notre campagne solidaire permet à chacun·e de participer à hauteur de ses moyens, afin de préserver nos espaces de rencontre et nos projets.</p>',
    imageInformationTrois: {
      url: '/images/campagne-solidaire-2025-cover-fb.png',
      alt: 'campagne-solidaire-2025-cover-fb.png'
    }
  },
  menu: {
    sousMenuAgirAvecNousDevenirTalent: 'Devenir un talent InterAct',
    sousMenuAgirAvecNousFormerUnduo: 'Former un Duo2Change',
    sousMenuAgirAvecNousDevenirCoah: 'Rejoindre l’InterLab',
    sousMenuAgirAvecNousParticiperFormation: 'Participer à nos formations Com’Together',
    sousMenuAgirAvecNousDevenirVolontaire: 'Devenir volontaire INTERRA',
    sousMenuAgirAvecNousFaireDon: 'Faire un Don'
  },
  histoireDe: {
    textePageDAccueil:
      '<p>La communauté INTERRA est constituée d’une multitude de personnalités, chacune avec sa propre histoire. Tu souhaites partager la tienne&nbsp;? <a href="mailto:christine@interra-asbl.be">Contacte-nous&nbsp;!</a></p>',
    imageAccueil: {
      url: '/images/site-visuel-campagne-2025.png',
      alt: 'site-visuel-campagne-2025.png'
    },
    imageHistoireDe: {
      url: '/images/2024-06-01-anniv-interra-51.jpg',
      alt: '2024-06-01-anniv-interra-51.jpg'
    }
  },
  allInformation: informationsContent.allInformation
};



