import { nosProjetsContent } from './nos-projets';
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
    titre: interActContent.interAct.titre,
    chapeau: interActContent.interAct.chapeau,
    imageListe: interActContent.interAct.imageListe
  },
  duoLangue: {
    titre: duoLangueContent.duoLangue.titre,
    chapeau: duoLangueContent.duoLangue.chapeau,
    imageListeProjets: duoLangueContent.duoLangue.imageListeProjets
  },
  incubateurInclusif: {
    titre: incubateurInclusifContent.incubateurInclusif.titre,
    chapeau: incubateurInclusifContent.incubateurInclusif.chapeau,
    imageListeProjets: incubateurInclusifContent.incubateurInclusif.imageListeProjets
  },
  formationInterculturelle: {
    titre: formationInterculturelleContent.formationInterculturelle.titre,
    chapeau: formationInterculturelleContent.formationInterculturelle.chapeau.replace(/\n/g, '<br>'),
    imageListeProjets: formationInterculturelleContent.formationInterculturelle.imageListeProjets
  }
};

