type Image = {
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
  contacts: [
  {
    nomPrNom: "Emilie LEMBRÉE",
    numRoDeTLPhone: "0493 37 76 24",
    photo: {
      url: "/images/1758527257-2025-photos-indivuduelles-4.png",
      alt: ""
    },
    adresseMail: "emilie@interra-asbl.be",
    fonction: "Directrice"
  },
  {
    nomPrNom: "Nathalie MOREAU",
    numRoDeTLPhone: "0493 93 83 04",
    photo: {
      url: "/images/1738682810-7.png",
      alt: ""
    },
    adresseMail: "nathalie@interra-asbl.be",
    fonction: "Responsable administrative et financière"
  },
  {
    nomPrNom: "Karima ELMALKI",
    numRoDeTLPhone: "",
    photo: {
      url: "/images/1758526839-2025-photos-indivuduelles-1.png",
      alt: ""
    },
    adresseMail: "karima@interra-asbl.be",
    fonction: "Assistante administrative"
  },
  {
    nomPrNom: "Nicolas VEZZOLI ",
    numRoDeTLPhone: "0493 98 96 84",
    photo: {
      url: "/images/1738682494-16.png",
      alt: ""
    },
    adresseMail: "nicolas@interra-asbl.be",
    fonction: "Chargé d'accompagnement et de mobilisation InterLab"
  },
  {
    nomPrNom: "Younes ESFANDIYAR ",
    numRoDeTLPhone: "0491 52 05 20",
    photo: {
      url: "/images/1738682543-22.png",
      alt: ""
    },
    adresseMail: "younes@interra-asbl.be",
    fonction: "Chargé de mobilisation InterAct"
  },
  {
    nomPrNom: "Sophiane SEYDOU ",
    numRoDeTLPhone: "",
    photo: {
      url: "/images/1738682287-31.png",
      alt: ""
    },
    adresseMail: "sophiane@interra-asbl.be",
    fonction: "Volontaire international (FR) pour InterAct"
  },
  {
    nomPrNom: "Chiara ROSSI ",
    numRoDeTLPhone: "",
    photo: {
      url: "/images/1738682246-46.png",
      alt: ""
    },
    adresseMail: "chiara@interra-asbl.be",
    fonction: "Stagiaire internationale (IT) pour InterAct"
  },
  {
    nomPrNom: "Elisa MOËS",
    numRoDeTLPhone: "0493 41 68 38",
    photo: {
      url: "/images/1758527017-2025-photos-indivuduelles-3.png",
      alt: ""
    },
    adresseMail: "elisa.moes@interra-asbl.be",
    fonction: "Chargée de communication et chargée de projet Duo2Change"
  },
  {
    nomPrNom: "Djénéba GUÉRILLOT",
    numRoDeTLPhone: "0493 41 68 38",
    photo: {
      url: "/images/1761553888-2025-photos-indivuduelles.png",
      alt: ""
    },
    adresseMail: "djeneba.guerillot@interra-asbl.be",
    fonction: "Volontaire internationale (FR) pour Duo2Change"
  }
]
};
