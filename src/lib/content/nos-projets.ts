export type NosProjetsContent = {
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
    titreDeLaPage: "Nos projets",
    texteDeLaPage: `<p>Vous souhaitez tout savoir sur les projets d'INTERRA ? Consultez le Dossier de pr&eacute;sentation !</p>`,
    urlPdf: " https://miniurl.be/r-4lo4",
    imageDeLaPage: {
  url: "/images/1686571989-dossier-de-presentation-interra.png",
  alt: ""
}
  }
};
