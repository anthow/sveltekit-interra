type Image = {
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
  allInformation: [
  ]
};
