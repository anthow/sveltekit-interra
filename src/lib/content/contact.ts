type PersonneContact = {
  nomPrNom: string;
  numRoDeTLPhone: string;
  photo: {
    url: string;
    alt: string;
  } | null;
  adresseMail: string;
  fonction: string;
};

export const contactContent: { allPersonneContacts: PersonneContact[] } = {
  allPersonneContacts: [
    {
      nomPrNom: "Nathalie MOREAU",
      numRoDeTLPhone: "0493 93 83 04",
      photo: {
        url: "/images/7.png",
        alt: "7.png"
      },
      adresseMail: "nathalie@interra-asbl.be",
      fonction: "Responsable administrative et financière"
    },
    {
      nomPrNom: "Emilie LEMBRÉE",
      numRoDeTLPhone: "0493 37 76 24",
      photo: {
        url: "/images/2025-photos-indivuduelles-4.png",
        alt: "2025-photos-indivuduelles-4.png"
      },
      adresseMail: "emilie@interra-asbl.be",
      fonction: "Directrice"
    },
    {
      nomPrNom: "Elisa MOËS",
      numRoDeTLPhone: "0493 41 68 38",
      photo: {
        url: "/images/2025-photos-indivuduelles-3.png",
        alt: "2025-photos-indivuduelles-3.png"
      },
      adresseMail: "elisa.moes@interra-asbl.be",
      fonction: "Chargée de communication et chargée de projet Duo2Change"
    },
    {
      nomPrNom: "Sophiane SEYDOU ",
      numRoDeTLPhone: "",
      photo: {
        url: "/images/31.png",
        alt: "31.png"
      },
      adresseMail: "sophiane@interra-asbl.be",
      fonction: "Volontaire international (FR) pour InterAct"
    },
    {
      nomPrNom: "Kamanda MILELE ",
      numRoDeTLPhone: "0493 98 96 84",
      photo: {
        url: "/images/en-cours-2025-photos-equipe-indivuduelles-15.png",
        alt: "en-cours-2025-photos-equipe-indivuduelles-15.png"
      },
      adresseMail: "kamanda@interra-asbl.be",
      fonction: "Chargée d'accompagnement et de mobilisation InterLab"
    },
    {
      nomPrNom: "Karima ELMALKI",
      numRoDeTLPhone: "",
      photo: {
        url: "/images/2025-photos-indivuduelles-1.png",
        alt: "2025-photos-indivuduelles-1.png"
      },
      adresseMail: "karima@interra-asbl.be",
      fonction: "Assistante administrative"
    },
    {
      nomPrNom: "Djénéba GUÉRILLOT",
      numRoDeTLPhone: "0493 41 68 38",
      photo: {
        url: "/images/2025-photos-indivuduelles.png",
        alt: "2025-photos-indivuduelles.png"
      },
      adresseMail: "djeneba.guerillot@interra-asbl.be",
      fonction: "Volontaire internationale (FR) pour Duo2Change"
    },
    {
      nomPrNom: "Chiara ROSSI ",
      numRoDeTLPhone: "",
      photo: {
        url: "/images/46.png",
        alt: "46.png"
      },
      adresseMail: "chiara@interra-asbl.be",
      fonction: "Stagiaire internationale (IT) pour InterAct"
    },
    {
      nomPrNom: "Younes ESFANDIYAR ",
      numRoDeTLPhone: "0491 52 05 20",
      photo: {
        url: "/images/22.png",
        alt: "22.png"
      },
      adresseMail: "younes@interra-asbl.be",
      fonction: "Chargé de mobilisation InterAct"
    },
    {
      nomPrNom: "Nicolas VEZZOLI ",
      numRoDeTLPhone: "0493 98 96 84",
      photo: {
        url: "/images/16.png",
        alt: "16.png"
      },
      adresseMail: "nicolas@interra-asbl.be",
      fonction: "Chargé d'accompagnement et de mobilisation InterLab"
    }
  ]
};
