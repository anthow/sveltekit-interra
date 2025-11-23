export type InterActContent = {
  interAct: {
    titre: string;
    introduction: string;
    chapeau: string;
    imageListe: {
      url: string;
      alt: string;
    };
    imageProgrameDuMois: {
      url: string;
      alt: string;
    };
  };
};

export const interActContent: InterActContent = {
  interAct: {
    titre: "InterAct",
    introduction: "InterAct a pour objectif de valoriser les passions et le savoir-faire d'une personne nouvellement arrivée ou locale. Pour se faire, chacun·e a la possibilité de proposer une activité qu'il ou elle souhaiterait organiser au sein d'INTERRA.<br><br>Notre rôle est de : <br><br>- Recevoir les personnes désireuses de proposer un atelier. <br>- Les accompagner dans la conception et l'organisation de leur <br>- atelier, les aider à trouver une salle, le matériel, le public...<br>- Réaliser ensemble une évaluation de l'atelier.<br><br>Pour en savoir plus sur InterAct et/ou pour recevoir le programme de chaque semaine :<br>Contactez l'équipe InterAct !  0491 520 520   interact@interra-asbl.be",
    chapeau: "L'objectif d'InterAct est d'accompagner une personne nouvellement arrivée ou locale dans l'organisation d'un atelier en fonction de son savoir-faire et de sa passion à un groupe de participants mixte (personnes primo-arrivants et locales).<br>",
    imageListe: {
      url: "/images/92afe8ff-57f9-4482-8fc1-a7e100f93c23.jpg",
      alt: "92afe8ff-57f9-4482-8fc1-a7e100f93c23.jpg"
    },
    imageProgrameDuMois: {
      url: "/images/agenda-novembre-2025.png",
      alt: "agenda-novembre-2025.png"
    }
  }
};
