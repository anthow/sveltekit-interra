// import { performRequest } from '$lib/datocms';

export async function GET() {
  // Données statiques temporaires avec le bon nom de modèle
  const staticData = {
    interAct: {
      titre: "InterAct",
      introduction: "<p>InterAct a pour objectif de <strong>valoriser les passions et le savoir-faire d'une personne nouvellement arrivée ou locale</strong>. Pour se faire, chacun·e a la possibilité de proposer une activité qu'il ou elle souhaiterait organiser au sein d'INTERRA.</p>\n<p>Notre rôle est de : </p>\n<ul>\n<li>Recevoir les personnes désireuses de proposer un atelier. </li>\n<li>Les accompagner dans la conception et l'organisation de leur atelier, les aider à trouver une salle, le matériel, le public...</li>\n<li>Réaliser ensemble une évaluation de l'atelier.</li>\n</ul>\n<div class=\"x11i5rnm xat24cr x1mh8g0r x1vvkbs xtlvy1s x126k92a\">\n<div dir=\"auto\">\n<div class=\"x11i5rnm xat24cr x1mh8g0r x1vvkbs xtlvy1s x126k92a\">\n<div dir=\"auto\"><span style=\"font-size: 0.9375rem; letter-spacing: 0px;\">Pour en savoir plus sur InterAct et/ou pour recevoir le programme de chaque semaine :</span></div>\n</div>\n</div>\n</div>\n<div class=\"x11i5rnm xat24cr x1mh8g0r x1vvkbs xtlvy1s x126k92a\">\n<div dir=\"auto\">Contactez l'équipe InterAct ! <span class=\"html-span xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs x3nfvp2 x1j61x8r x1fcty0u xdj266r xat24cr xgzva0m xhhsvwb xxymvpz xlup9mm x1kky2od\"><img height=\"16\" width=\"16\" alt=\"📱\" class=\"xz74otr x168nmei x13lgxp2 x5pf9jr xo71vjh\" referrerpolicy=\"origin-when-cross-origin\" src=\"https://static.xx.fbcdn.net/images/emoji.php/v9/t57/1/16/1f4f1.png\" /></span> 0491 520 520  <span class=\"html-span xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs x3nfvp2 x1j61x8r x1fcty0u xdj266r xat24cr xgzva0m xhhsvwb xxymvpz xlup9mm x1kky2od\"><img height=\"16\" width=\"16\" alt=\"📧\" class=\"xz74otr x168nmei x13lgxp2 x5pf9jr xo71vjh\" referrerpolicy=\"origin-when-cross-origin\" src=\"https://static.xx.fbcdn.net/images/emoji.php/v9/tbe/1/16/1f4e7.png\" /></span> interact@interra-asbl.be</div>\n<div dir=\"auto\"><strong>PROGRAMME DU MOIS</strong></div>\n</div>",
      imageProgrameDuMois: {
        url: "",
        alt: "Programme du mois"
      }
    }
  };

  try {
    return new Response(JSON.stringify(staticData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching Inter-act data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch Inter-act data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}