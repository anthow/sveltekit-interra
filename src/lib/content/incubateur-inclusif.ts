export type IncubateurInclusifContent = {
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
    titre: "InterLab",
    titreIncubateurInclusif: "Interlab",
    chapeau: "L'InterLab accompagne les personnes nouvellement arrivées, ou les personnes locales favorisant l'innovation issue des migrations, à la création d'organisation d'entreprises, ONG, ASBL...",
    imageListeProjets: {
      url: "/images/327164752_1386885585183714_8131270433918108794_n.jpg",
      alt: "327164752_1386885585183714_8131270433918108794_n.jpg"
    },
    textePartieUn: "Au fil de notre accompagnement avec les porteurs d’ateliers du projet InterAct, nous nous apercevons qu'ils et elles disposent de véritables talents, et d'assez de passion et de résilience pour devenir entrepreneur·euses. Malheureusement, les réfugié·es rencontrent des défis spécifiques liés à leur situation.",
    textePartieDeux: "Au-delà de ne pas toujours maîtriser parfaitement la langue du pays d’accueil, les réfugié·es sont confronté·es à des réglementations complexes, une nouvelle culture, des codes et un environnement d’affaires méconnu. Ils et elles manquent aussi de réseaux, d'outils et de ressources nécessaires.<br><br>La création de liens interculturels autour de l’entrepreneuriat permet un enrichissement culturel, la création d’emploi une société plus inclusive. Grâce au soutien de l'InterLab, nous voulons leur permettre de croire en leur rêve en développant leur propre structure !<br><br><br><br><br>Notre rôle au sein de l'InterLab :<br><br>Accompagner les personnes en co-construisant un parcours d'accompagnement sur mesure, adapté aux besoins de chaque individu.<br>Mettre à disposition les ressources nécessaires à la réussite du projet en s'appuyant sur un réseau de partenaires.<br>Sensibiliser à l'entrepreunariat et ouvrir le champ des possibles des personnes primo-arrivantes.<br><br>InterLab est un projet réalisé avec le soutien du Fonds SD WORX, géré par la Fondation Roi Baudouin et avec le soutien de la Région Wallonne. ",
    image: {
      url: "/images/327164752_1386885585183714_8131270433918108794_n.jpg",
      alt: "327164752_1386885585183714_8131270433918108794_n.jpg"
    }
  }
};
