export type SeanceDInformationContent = {
  sAncesDInformation: {
    titreSAnceDInformation: string;
    texteDInformation: string;
    dateProchaineSAnceDInformation: string;
    adresseMailSAnceDInformation: string;
    lieuxSAnceDInformation?: string;
  } | null;
};

export const seanceDInformationContent: SeanceDInformationContent = {
  sAncesDInformation: {
    titreSAnceDInformation: "Séance d'information ",
    texteDInformation: "Tu as envie de découvrir INTERRA et ses différents projets ? Savoir comment t’impliquer dans l'association ? \n\nInscris-toi à l'une de nos séances d'information, par SMS au 0491 520 520 !",
    dateProchaineSAnceDInformation: "Chaque dernier mardi du mois !",
    adresseMailSAnceDInformation: "info@interra-asbl.be",
    lieuxSAnceDInformation: ""
  }
};
