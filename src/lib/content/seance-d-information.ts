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
  texteDInformation: `<p>Tu as envie de d&eacute;couvrir INTERRA et ses diff&eacute;rents projets ? Savoir comment t&rsquo;impliquer dans l'association ? Inscris-toi &agrave; l'une de nos s&eacute;ances d'information, par SMS au 0491 520 520 !</p>`,
  dateProchaineSAnceDInformation: "Chaque dernier mardi du mois !",
  adresseMailSAnceDInformation: "info@interra-asbl.be",
  lieuxSAnceDInformation: null
}
};
