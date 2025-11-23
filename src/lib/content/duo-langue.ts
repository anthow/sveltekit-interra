export type DuoLangueContent = {
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
    titre: "Duo2Change",
    chapeau: "L'objectif de Duo2Change  est de favoriser l'inclusion des personnes nouvellement arrivée et changer les regard sur les migrations, en mettant en lien une personne nouvellement arrivée et une personne locale. <br><br>Les bînomes se rencontrent une fois par semaine pour partager un moment ensemble (discussion, découverte de la ville, d'un lieu, d'un sport, d'un jeu...) !",
    imageListeProjets: {
      url: "/images/301308969_2927457107547062_5119449953488155505_n.jpg",
      alt: "301308969_2927457107547062_5119449953488155505_n(1).jpg"
    },
    titreKSako: "Le projet Duo2Change",
    texteKSako: "Deux personnes se retrouvent pour parler ensemble : 1 heure, 1 fois par semaine !<br><br>L'objectif est de favoriser l'inclusion des primo-arrivant.e.s et changer les regard sur les migrations, en mettant en lien une personne primo-arrivante et une personne locale. Les bînomes se rencontrent une fois par semaine pour partager un moment ensemble (discussion, découverte de la ville, d'un lieu, d'un sport, d'un jeu...) !",
    titrePourQui: "Pour qui ?",
    textePourQui: "Vous avez envie de rencontrer une nouvelle personne ? Vous êtes ouvert et avide de découverte et ouvert à l'interculturalité ?<br><br>Alors le projet Duo2Change est fait pour vous !<br><br>En quoi consiste-t-il ? C'est un binôme qui se rencontre une fois par semaine pendant six mois, pour partager un moment ensemble (discussion, découverte de la ville, d'un lieu, d'un sport, d'un jeu...) !<br><br>Son objectif ? Favoriser l'inclusion des personnes primo-arrivant.e.s et changer les regards sur les migrations, en mettant en lien une personne primo-arrivante et une personne locale.<br><br>Pour qui? Chaque Duo est composé d'une personne locale et d'une personne nouvellement arrivée sur le territoire désireuse de pratiquer le français.",
    titreRoleInterra: " Le rôle d’INTERRA dans ce Duo2Change",
    listeRoleInterra: "- Rencontrer individuellement chacun.e des participants<br><br>- Faire la mise en lien selon le niveau de langue et les éventuels désidératas de chacun.e<br><br>- Soutenir les duos et les outiller si nécessaire<br><br>- Mettre à disposition un document pour faciliter le lancement des conversations<br><br>- Donner des conseils<br><br>- Aider les duos s'ils ont des quetions<br><br>- Réaliser une évaluation avec les duos",
    imageRoleInterra: {
      url: "/images/roleinterraduolangue.jpg",
      alt: "roleinterraduolangue.jpg"
    },
    titreVotreImplication: "Partenaires INTERRA CORNER",
    texteVotreImplication: "Nous avons noué des partenariats avec une série de lieux culturels et de cafés, au sein desquels les Duos peuvent se rencontrer gratuitement : Gwali, Madame Boverie, Thrinkhall, Café Montjoie, DariusCafé...<br><br>Les binômes peuvent également bénéficier d'Articles 27, qui donnent accès à des activités culturelles à moindre prix.",
    titreFinDImplication: "Témoignage",
    texteFinDImplication: "\"Vous aussi, faites-le : vous en retirerez quelques fragments d'une culture que vous ne connaissez pas, des échanges hyper sympas, et le plaisir de rencontrer une nouvelle personne et une autre expérience de vie. Que du positif !\" (Sarah, en binôme avec Zuheir)",
    videoKSako: {
      video: {
        mp4Url: "/videos/video-duo2change-site.mp4"
      }
    }
  }
};
