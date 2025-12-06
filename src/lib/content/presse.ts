type Image = {
  url: string;
  alt: string;
};

export type PresseContent = {
  presse: {
    id: string;
    extrait: string;
    logoMedia: Image;
    nomDeLArticle: string;
    nomDuMDia: string;
    urlArticle: string;
  } | null;
};

export const presseContent: PresseContent = {
  presse: {
  id: "79207482",
  extrait: `<p>"La plus-value du projet, c&rsquo;est clairement de permettre aux personnes primo-arrivantes d&rsquo;&ecirc;tre actrices du projet"</p>`,
  logoMedia: {
    url: "/images/1638120150-cpcp.png",
    alt: "Logo cpcp"
  },
  nomDeLArticle: "Interview-interra",
  nomDuMDia: "Cpcp",
  urlArticle: "http://www.cpcp.be/wp-content/uploads/2020/05/20200525-interview-interra.pdf"
}
};
