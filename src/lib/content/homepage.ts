type Image = {
  url: string;
  alt: string;
};

type HtmlBlock = string;

type Information = {
  id: string;
  titre: string;
  texte: string;
  image: Image | null;
  urlButton?: string;
  texteButton?: string;
};

type HomepageData = {
  accueil: {
    titreHeader: string;
    texteHeader: HtmlBlock;
    imagesHeader: Image[];
    titrePartieDeux: string;
    textePartieDeux: HtmlBlock;
    imagePartieDeux: Image;
    titreAgir: string;
    texteAgir: HtmlBlock;
    titreAgirAvecNous: string;
    texteAgirAvecNous: HtmlBlock;
    imageAgir: Image;
    imageAgirAvecNous: Image;
    informationUnEnLigneHorsLigne: boolean;
    informationTroisEnLigneHorsLigne: boolean;
    titreTiquette: string;
    texteTiquette: HtmlBlock;
    textEtiquetteDeux: HtmlBlock;
    imageEtiquetteUn: Image;
  };
  menu: {
    sousMenuAgirAvecNousDevenirTalent: string;
    sousMenuAgirAvecNousFormerUnduo: string;
    sousMenuAgirAvecNousDevenirCoah: string;
    sousMenuAgirAvecNousParticiperFormation: string;
    sousMenuAgirAvecNousDevenirVolontaire: string;
    sousMenuAgirAvecNousFaireDon: string;
  };
  histoireDe: {
    textePageDAccueil: HtmlBlock;
    imageAccueil: Image;
    imageHistoireDe: Image;
  };
  allInformation: Information[];
};

export const homepageContent: HomepageData = {
  accueil: {
    titreHeader: " Se réunir et s'enrichir",
    texteHeader: `<p>INTERRA veut cr&eacute;er des espaces de rencontre entre les personnes nouvellement arriv&eacute;es en terre li&eacute;geoise et les personnes locales, via la mise en valeur de leurs talents, savoir-faire et passions, afin de cr&eacute;er une soci&eacute;t&eacute; plus inclusive.</p>`,
    imagesHeader: [
  {
    url: "/images/1751365043-501197083_1149600553865914_1108199081761878972_n.jpg",
    alt: ""
  },
  {
    url: "/images/1751365043-505485163_1158223163003653_5108061113447176579_n.jpg",
    alt: ""
  },
  {
    url: "/images/1751374820-photos-duo-5.jpeg",
    alt: ""
  },
  {
    url: "/images/1751365043-506086047_1158223193003650_1452334359499558543_n.jpg",
    alt: ""
  },
  {
    url: "/images/1751365043-500812408_1149600903865879_8366366743393955798_n.jpg",
    alt: ""
  },
  {
    url: "/images/1751374820-photos-duo-4.jpeg",
    alt: ""
  },
  {
    url: "/images/1751374820-480231956_1065284638964173_1550344876284952145_n.jpg",
    alt: ""
  },
  {
    url: "/images/1751374820-03-09-2024-4-atelier-expression-artistique-justine-1.jpeg",
    alt: ""
  },
  {
    url: "/images/1751374820-79_anniversaireinterra.jpg",
    alt: ""
  },
  {
    url: "/images/1751374820-163_interra.jpg",
    alt: ""
  },
  {
    url: "/images/1751374820-221_anniversaireinterra.jpg",
    alt: ""
  }
],
    titrePartieDeux: "L'asbl qui crée du lien entre les personnes migrantes et les Liégeois·es",
    textePartieDeux: `<div class="elementor-text-editor elementor-clearfix">
<p><span style="color: #003300;">Apr&egrave;s un parcours migratoire souvent chaotique et violent, beaucoup de personnes se retrouvent </span><span style="color: #003300;">isol&eacute;es et sans r&eacute;seau social. </span><span style="color: #003300;">Notre volont&eacute; est que l&rsquo;immigration ne soit plus per&ccedil;ue de mani&egrave;re n&eacute;gative par </span><span style="color: #003300;">la soci&eacute;t&eacute; d&rsquo;accueil, mais comme une richesse ! </span><span style="color: #003300; background-color: transparent; font-family: inherit; font-size: inherit; font-style: inherit; font-variant-ligatures: inherit; font-variant-caps: inherit; font-weight: inherit; letter-spacing: 0px;">Nous voulons aussi cr&eacute;er des opportunit&eacute;s de rencontres entre les personnes nouvellement arriv&eacute;es </span><span style="color: #003300; background-color: transparent; font-family: inherit; font-size: inherit; font-style: inherit; font-variant-ligatures: inherit; font-variant-caps: inherit; font-weight: inherit; letter-spacing: 0px;">et les personnes locales de mani&egrave;re participative et innovante, via la mise en valeur des connaissances, savoir-faire, et passions de chacun et chacune.</span></p>
</div>`,
    imagePartieDeux: {
  url: "/images/1727964388-2024-06-01-anniv-interra-53.jpg",
  alt: ""
},
    titreAgir: " Agir avec nous !",
    texteAgir: `<div class="elementor-element elementor-element-ec32b80 elementor-widget elementor-widget-text-editor" data-id="ec32b80" data-element_type="widget" data-widget_type="text-editor.default">
  <div class="elementor-widget-container">
    <div class="elementor-text-editor elementor-clearfix">
      <p>Vous souhaitez porter, soutenir et/ou participer &agrave; un atelier <strong>InterAct</strong> ? Constituer un duo dans le projet <strong>Duo2Change</strong> ? Lancer votre projet ou devenir coach pour l'<strong>InterLab</strong> ? Contactez-nous !<br /><br />Les <strong>soutiens financiers</strong> sont &eacute;galement essentiels pour que INTERRA continue &agrave; vivre. Que votre don soit petit (m&ecirc;me 1&euro;!) ou grand, ponctuel ou r&eacute;gulier, il nous aidera beaucoup. <span>Ensemble, agissons pour faire en sorte que l&rsquo;immigration ne soit plus per&ccedil;ue comme une charge, mais comme une richesse pour la soci&eacute;t&eacute; d&rsquo;accueil !</span></p>
    </div>
  </div>
</div>`,
    titreAgirAvecNous: " Agir avec nous !",
    texteAgirAvecNous: `<div class="elementor-element elementor-element-ec32b80 elementor-widget elementor-widget-text-editor" data-id="ec32b80" data-element_type="widget" data-widget_type="text-editor.default">
  <div class="elementor-widget-container">
    <div class="elementor-text-editor elementor-clearfix">
      <p>Vous souhaitez porter, soutenir et/ou participer &agrave; un atelier <strong>InterAct</strong> ? Constituer un duo dans le projet <strong>Duo2Change</strong> ? Lancer votre projet ou devenir expert pour l'<strong>InterLab</strong> ? Participer &agrave; nos <strong>formations</strong> sur la communication Interculturelle ? Contactez-nous !<br /><br />Les <strong>soutiens financiers</strong> sont &eacute;galement essentiels pour que INTERRA continue &agrave; vivre. Que votre don soit petit (m&ecirc;me 1&euro;!) ou grand, ponctuel ou r&eacute;gulier, il nous aidera beaucoup. <span>Ensemble, agissons pour faire en sorte que l&rsquo;immigration ne soit plus per&ccedil;ue comme une charge, mais comme une richesse pour la soci&eacute;t&eacute; d&rsquo;accueil !</span></p>
    </div>
  </div>
</div>`,
    imageAgir: {
  url: "/images/1727964388-2024-06-01-anniv-interra-19.jpg",
  alt: ""
},
    imageAgirAvecNous: {
  url: "/images/1727964388-2024-06-01-anniv-interra-19.jpg",
  alt: ""
},
    informationUnEnLigneHorsLigne: true,
    informationTroisEnLigneHorsLigne: true,
    titreTiquette: "Campagne solidaire 2025",
    texteTiquette: `<div class="xdj266r x11i5rnm xat24cr x1mh8g0r x1vvkbs x126k92a">
<div dir="auto"><span class="html-span xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs x3nfvp2 x1j61x8r x1fcty0u xdj266r xat24cr xgzva0m xhhsvwb xxymvpz xlup9mm x1kky2od"><img height="16" width="16" alt="🔥" class="xz74otr x168nmei x13lgxp2 x5pf9jr xo71vjh" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/images/emoji.php/v9/t50/1/16/1f525.png" /></span>𝗜𝗡𝗧𝗘𝗥𝗥𝗔 𝗮 𝘀𝗶𝘅 𝗮𝗻𝘀 𝗲𝘁 𝗔 𝗕𝗘𝗦𝗢𝗜𝗡 𝗗𝗘 𝗩𝗢𝗨𝗦 𝗽𝗼𝘂𝗿 𝗲́𝗰𝗿𝗶𝗿𝗲 𝗹𝗮 𝘀𝘂𝗶𝘁𝗲 𝗱𝗲 𝘀𝗼𝗻 𝗵𝗶𝘀𝘁𝗼𝗶𝗿𝗲 !<span class="html-span xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs x3nfvp2 x1j61x8r x1fcty0u xdj266r xat24cr xgzva0m xhhsvwb xxymvpz xlup9mm x1kky2od"><img height="16" width="16" alt="🔥" class="xz74otr x168nmei x13lgxp2 x5pf9jr xo71vjh" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/images/emoji.php/v9/t50/1/16/1f525.png" /></span></div>
</div>
<div class="x11i5rnm xat24cr x1mh8g0r x1vvkbs xtlvy1s x126k92a"></div>
<div class="x11i5rnm xat24cr x1mh8g0r x1vvkbs xtlvy1s x126k92a">
<div dir="auto"><span class="html-span xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs x3nfvp2 x1j61x8r x1fcty0u xdj266r xat24cr xgzva0m xhhsvwb xxymvpz xlup9mm x1kky2od" style="font-size: 0.9375rem; letter-spacing: 0px;"><img height="16" width="16" alt="🎯" class="xz74otr x168nmei x13lgxp2 x5pf9jr xo71vjh" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/images/emoji.php/v9/tb0/1/16/1f3af.png" /></span><span style="font-size: 0.9375rem; letter-spacing: 0px;"> Parce qu'aujourd'hui plus que jamais, 𝙡'𝙞𝙣𝙘𝙡𝙪𝙨𝙞𝙤𝙣, 𝙡𝙖 𝙙𝙞𝙫𝙚𝙧𝙨𝙞𝙩𝙚́ 𝙚𝙩 𝙡𝙚 𝙫𝙞𝙫𝙧𝙚-𝙚𝙣𝙨𝙚𝙢𝙗𝙡𝙚 𝙣𝙚 𝙥𝙚𝙪𝙫𝙚𝙣𝙩 𝙥𝙖𝙨 𝙖𝙩𝙩𝙚𝙣𝙙𝙧𝙚 ! Nous sommes persuad&eacute;s qu'elles sont sources de richesse pour notre soci&eacute;t&eacute; ! </span><span class="html-span xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs x3nfvp2 x1j61x8r x1fcty0u xdj266r xat24cr xgzva0m xhhsvwb xxymvpz xlup9mm x1kky2od" style="font-size: 0.9375rem; letter-spacing: 0px;"><img height="16" width="16" alt="📢" class="xz74otr x168nmei x13lgxp2 x5pf9jr xo71vjh" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/images/emoji.php/v9/t39/1/16/1f4e2.png" /></span><span style="font-size: 0.9375rem; letter-spacing: 0px;"> Pour nos 6 ans, on lance donc cette 𝗖𝗔𝗠𝗣𝗔𝗚𝗡𝗘 𝗗𝗘 𝗦𝗢𝗟𝗜𝗗𝗔𝗥𝗜𝗧𝗘́ : donnez 6&euro;, 60&euro; et pourquoi pas 600&euro; ou 6000&euro; ! Chaque geste compte. Et chaque euro nous aide &agrave; garder l'&eacute;quilibre !</span></div>
</div>
<div class="x11i5rnm xat24cr x1mh8g0r x1vvkbs xtlvy1s x126k92a">
<div dir="auto">Nous avons de grands projets devant nous, et nos ambitions sont intactes. Pour les r&eacute;aliser dans ce moment de suspension, nous avons besoin de vous !</div>
</div>
<div class="x11i5rnm xat24cr x1mh8g0r x1vvkbs xtlvy1s x126k92a">
<div dir="auto">𝗠𝗘𝗥𝗖𝗜 d'&ecirc;tre l&agrave;, 𝗱𝗲𝗽𝘂𝗶𝘀 𝟲 𝗷𝗼𝘂𝗿𝘀 𝗼𝘂 𝗱𝗲𝗽𝘂𝗶𝘀 𝟲 𝗮𝗻𝘀 ! 𝗟'𝗔𝗩𝗘𝗡𝗧𝗨𝗥𝗘 𝗖𝗢𝗡𝗧𝗜𝗡𝗨𝗘𝗥𝗔, 𝗔𝗩𝗘𝗖 𝗩𝗢𝗨𝗦 !</div>
</div>
<div class="x11i5rnm xat24cr x1mh8g0r x1vvkbs xtlvy1s x126k92a">
<div dir="auto"><span class="html-span xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs x3nfvp2 x1j61x8r x1fcty0u xdj266r xat24cr xgzva0m xhhsvwb xxymvpz xlup9mm x1kky2od"><img height="16" width="16" alt="📣" class="xz74otr x168nmei x13lgxp2 x5pf9jr xo71vjh" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/images/emoji.php/v9/tba/1/16/1f4e3.png" /></span> 𝗣𝗔𝗥𝗧𝗜𝗖𝗜𝗣𝗘𝗥 𝗔̀ 𝗟𝗔 𝗖𝗔𝗠𝗣𝗔𝗚𝗡𝗘 :<br />(les dons se font via Caritas, pour permettre la d&eacute;duction fiscale de 45% &agrave; partir de 40&euro; de don). Comment ?<br /><span class="html-span xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs x3nfvp2 x1j61x8r x1fcty0u xdj266r xat24cr xgzva0m xhhsvwb xxymvpz xlup9mm x1kky2od"><img height="16" width="16" alt="📱" class="xz74otr x168nmei x13lgxp2 x5pf9jr xo71vjh" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/images/emoji.php/v9/t57/1/16/1f4f1.png" /></span> Via les 𝗤𝗥 𝗖𝗼𝗱𝗲 pr&eacute;sents sur le visuel (&agrave; scanner directement via son application bancaire!)<br /><span class="html-span xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs x3nfvp2 x1j61x8r x1fcty0u xdj266r xat24cr xgzva0m xhhsvwb xxymvpz xlup9mm x1kky2od"><img height="16" width="16" alt="💸" class="xz74otr x168nmei x13lgxp2 x5pf9jr xo71vjh" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/images/emoji.php/v9/t62/1/16/1f4b8.png" /></span> Par 𝘃𝗶𝗿𝗲𝗺𝗲𝗻𝘁 sur le compte de Caritas BE04 2400 8007 6231 avec en communication : PROJET 732 371<br /><span class="html-span xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs x3nfvp2 x1j61x8r x1fcty0u xdj266r xat24cr xgzva0m xhhsvwb xxymvpz xlup9mm x1kky2od" style="font-size: 0.9375rem; letter-spacing: 0px;"><img height="16" width="16" alt="📌" class="xz74otr x168nmei x13lgxp2 x5pf9jr xo71vjh" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/images/emoji.php/v9/tac/1/16/1f4cc.png" /></span><span style="font-size: 0.9375rem; letter-spacing: 0px;"> Un don, une id&eacute;e, un partage : 𝗼𝗻 𝗮 𝗯𝗲𝘀𝗼𝗶𝗻 𝗱𝗲 𝘃𝗼𝘂𝘀 ! 𝗠𝗘𝗥𝗖𝗜 𝗱𝗲 𝗳𝗮𝗶𝗿𝗲 𝗰𝗶𝗿𝗰𝘂𝗹𝗲𝗿 𝗲𝘁 𝗱𝗲 𝗳𝗮𝗶𝗿𝗲 𝗽𝗮𝗿𝗹𝗲𝗿 𝗱𝗲 𝗰𝗲𝘁𝘁𝗲 𝗰𝗮𝗺𝗽𝗮𝗴𝗻𝗲 𝗮𝘂𝘁𝗼𝘂𝗿 𝗱𝗲 𝘃𝗼𝘂𝘀 !</span></div>
</div>`,
    textEtiquetteDeux: `<div class="xdj266r x11i5rnm xat24cr x1mh8g0r x1vvkbs x126k92a">
<div dir="auto"><span class="html-span xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs x3nfvp2 x1j61x8r x1fcty0u xdj266r xat24cr xgzva0m xhhsvwb xxymvpz xlup9mm x1kky2od"><img height="16" width="16" alt="🔥" class="xz74otr x168nmei x13lgxp2 x5pf9jr xo71vjh" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/images/emoji.php/v9/t50/1/16/1f525.png" /></span>𝗜𝗡𝗧𝗘𝗥𝗥𝗔 𝗮 𝘀𝗶𝘅 𝗮𝗻𝘀 𝗲𝘁 𝗔 𝗕𝗘𝗦𝗢𝗜𝗡 𝗗𝗘 𝗩𝗢𝗨𝗦 𝗽𝗼𝘂𝗿 𝗲́𝗰𝗿𝗶𝗿𝗲 𝗹𝗮 𝘀𝘂𝗶𝘁𝗲 𝗱𝗲 𝘀𝗼𝗻 𝗵𝗶𝘀𝘁𝗼𝗶𝗿𝗲 !<span class="html-span xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs x3nfvp2 x1j61x8r x1fcty0u xdj266r xat24cr xgzva0m xhhsvwb xxymvpz xlup9mm x1kky2od"><img height="16" width="16" alt="🔥" class="xz74otr x168nmei x13lgxp2 x5pf9jr xo71vjh" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/images/emoji.php/v9/t50/1/16/1f525.png" /></span></div>
</div>
<div class="x11i5rnm xat24cr x1mh8g0r x1vvkbs xtlvy1s x126k92a">
<div dir="auto">Depuis 6 ans, INTERRA c'est :<br /><span class="html-span xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs x3nfvp2 x1j61x8r x1fcty0u xdj266r xat24cr xgzva0m xhhsvwb xxymvpz xlup9mm x1kky2od"><img height="16" width="16" alt="🔸" class="xz74otr x168nmei x13lgxp2 x5pf9jr xo71vjh" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/images/emoji.php/v9/t72/1/16/1f538.png" /></span>Une communaut&eacute; de plus de 𝟯𝟬𝟬𝟬 𝗺𝗲𝗺𝗯𝗿𝗲𝘀 venu&middot;es d'ici et d'ailleurs <span class="html-span xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs x3nfvp2 x1j61x8r x1fcty0u xdj266r xat24cr xgzva0m xhhsvwb xxymvpz xlup9mm x1kky2od"><img height="16" width="16" alt="🌍" class="xz74otr x168nmei x13lgxp2 x5pf9jr xo71vjh" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/images/emoji.php/v9/t3f/1/16/1f30d.png" /><br /></span><span class="html-span xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs x3nfvp2 x1j61x8r x1fcty0u xdj266r xat24cr xgzva0m xhhsvwb xxymvpz xlup9mm x1kky2od"><img height="16" width="16" alt="🔸" class="xz74otr x168nmei x13lgxp2 x5pf9jr xo71vjh" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/images/emoji.php/v9/t72/1/16/1f538.png" /></span>Plus de 𝟰𝟬𝟬 𝗮𝘁𝗲𝗹𝗶𝗲𝗿𝘀 par an <span class="html-span xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs x3nfvp2 x1j61x8r x1fcty0u xdj266r xat24cr xgzva0m xhhsvwb xxymvpz xlup9mm x1kky2od"><img height="16" width="16" alt="🎨" class="xz74otr x168nmei x13lgxp2 x5pf9jr xo71vjh" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/images/emoji.php/v9/t82/1/16/1f3a8.png" /></span><span class="html-span xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs x3nfvp2 x1j61x8r x1fcty0u xdj266r xat24cr xgzva0m xhhsvwb xxymvpz xlup9mm x1kky2od"><img height="16" width="16" alt="🏋️" class="xz74otr x168nmei x13lgxp2 x5pf9jr xo71vjh" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/images/emoji.php/v9/tea/1/16/1f3cb.png" /></span><span class="html-span xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs x3nfvp2 x1j61x8r x1fcty0u xdj266r xat24cr xgzva0m xhhsvwb xxymvpz xlup9mm x1kky2od"><img height="16" width="16" alt="🗣️" class="xz74otr x168nmei x13lgxp2 x5pf9jr xo71vjh" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/images/emoji.php/v9/tfb/1/16/1f5e3.png" /><br /></span><span class="html-span xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs x3nfvp2 x1j61x8r x1fcty0u xdj266r xat24cr xgzva0m xhhsvwb xxymvpz xlup9mm x1kky2od"><img height="16" width="16" alt="🔸" class="xz74otr x168nmei x13lgxp2 x5pf9jr xo71vjh" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/images/emoji.php/v9/t72/1/16/1f538.png" /></span>Plus de 𝟳𝟬 𝗽𝗲𝗿𝘀𝗼𝗻𝗻𝗲𝘀 𝗮𝗰𝗰𝗼𝗺𝗽𝗮𝗴𝗻𝗲́𝗲𝘀 𝗽𝗮𝗿 𝗹'𝗜𝗻𝘁𝗲𝗿𝗟𝗮𝗯 dans la cr&eacute;ation de leur projet entrepren<span class="html-span xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs"><a class="html-a xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs" tabindex="-1"></a></span>eurial <span class="html-span xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs x3nfvp2 x1j61x8r x1fcty0u xdj266r xat24cr xgzva0m xhhsvwb xxymvpz xlup9mm x1kky2od"><img height="16" width="16" alt="💡" class="xz74otr x168nmei x13lgxp2 x5pf9jr xo71vjh" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/images/emoji.php/v9/t3c/1/16/1f4a1.png" /><br /></span><span class="html-span xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs x3nfvp2 x1j61x8r x1fcty0u xdj266r xat24cr xgzva0m xhhsvwb xxymvpz xlup9mm x1kky2od"><img height="16" width="16" alt="🔸" class="xz74otr x168nmei x13lgxp2 x5pf9jr xo71vjh" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/images/emoji.php/v9/t72/1/16/1f538.png" /></span>... et 𝗱𝗲𝘀 𝗺𝗶𝗹𝗹𝗶𝗲𝗿𝘀 𝗱𝗲 𝗿𝗲𝗻𝗰𝗼𝗻𝘁𝗿𝗲𝘀 qui changent des vies et des regards !</div>
</div>
<div class="x11i5rnm xat24cr x1mh8g0r x1vvkbs xtlvy1s x126k92a">
<div dir="auto">INTERRA, c'est &eacute;norme ! Et notre impact est bien r&eacute;el ! Mais 𝙣𝙤𝙩𝙧𝙚 𝙖𝙫𝙚𝙣𝙞𝙧 𝙚𝙨𝙩 𝙞𝙣𝙘𝙚𝙧𝙩𝙖𝙞𝙣... Dans ce moment de transition, nous faisons face &agrave; des difficult&eacute;s financi&egrave;res, mais nous ne l&acirc;cherons pas ! <span class="html-span xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs x3nfvp2 x1j61x8r x1fcty0u xdj266r xat24cr xgzva0m xhhsvwb xxymvpz xlup9mm x1kky2od"><img height="16" width="16" alt="💪" class="xz74otr x168nmei x13lgxp2 x5pf9jr xo71vjh" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/images/emoji.php/v9/t6c/1/16/1f4aa.png" /></span></div>
</div>
<div class="x11i5rnm xat24cr x1mh8g0r x1vvkbs xtlvy1s x126k92a">
<div dir="auto"><span class="html-span xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs x3nfvp2 x1j61x8r x1fcty0u xdj266r xat24cr xgzva0m xhhsvwb xxymvpz xlup9mm x1kky2od"><img height="16" width="16" alt="🎯" class="xz74otr x168nmei x13lgxp2 x5pf9jr xo71vjh" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/images/emoji.php/v9/tb0/1/16/1f3af.png" /></span> Parce qu'aujourd'hui plus que jamais, 𝙡'𝙞𝙣𝙘𝙡𝙪𝙨𝙞𝙤𝙣, 𝙡𝙖 𝙙𝙞𝙫𝙚𝙧𝙨𝙞𝙩𝙚́ 𝙚𝙩 𝙡𝙚 𝙫𝙞𝙫𝙧𝙚-𝙚𝙣𝙨𝙚𝙢𝙗𝙡𝙚 𝙣𝙚 𝙥𝙚𝙪𝙫𝙚𝙣𝙩 𝙥𝙖𝙨 𝙖𝙩𝙩𝙚𝙣𝙙𝙧𝙚 ! Nous sommes persuad&eacute;s qu'elles sont sources de richesse pour notre soci&eacute;t&eacute; !</div>
</div>
<div class="x11i5rnm xat24cr x1mh8g0r x1vvkbs xtlvy1s x126k92a">
<div dir="auto"><span class="html-span xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs x3nfvp2 x1j61x8r x1fcty0u xdj266r xat24cr xgzva0m xhhsvwb xxymvpz xlup9mm x1kky2od"><img height="16" width="16" alt="📢" class="xz74otr x168nmei x13lgxp2 x5pf9jr xo71vjh" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/images/emoji.php/v9/t39/1/16/1f4e2.png" /></span> Pour nos 6 ans, on lance donc cette 𝗖𝗔𝗠𝗣𝗔𝗚𝗡𝗘 𝗗𝗘 𝗦𝗢𝗟𝗜𝗗𝗔𝗥𝗜𝗧𝗘́ : donnez 6&euro;, 60&euro; et pourquoi pas 600&euro; ou 6000&euro; ! Chaque geste compte. Et chaque euro nous aide &agrave; garder l'&eacute;quilibre !</div>
</div>
<div class="x11i5rnm xat24cr x1mh8g0r x1vvkbs xtlvy1s x126k92a">
<div dir="auto">Nous avons de grands projets devant nous, et nos ambitions sont intactes. Pour les r&eacute;aliser dans ce moment de suspension, nous avons besoin de vous !</div>
</div>
<div class="x11i5rnm xat24cr x1mh8g0r x1vvkbs xtlvy1s x126k92a">
<div dir="auto">𝗠𝗘𝗥𝗖𝗜 d'&ecirc;tre l&agrave;, 𝗱𝗲𝗽𝘂𝗶𝘀 𝟲 𝗷𝗼𝘂𝗿𝘀 𝗼𝘂 𝗱𝗲𝗽𝘂𝗶𝘀 𝟲 𝗮𝗻𝘀 ! 𝗟'𝗔𝗩𝗘𝗡𝗧𝗨𝗥𝗘 𝗖𝗢𝗡𝗧𝗜𝗡𝗨𝗘𝗥𝗔, 𝗔𝗩𝗘𝗖 𝗩𝗢𝗨𝗦 !</div>
</div>
<div class="x11i5rnm xat24cr x1mh8g0r x1vvkbs xtlvy1s x126k92a">
<div dir="auto"><span class="html-span xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs x3nfvp2 x1j61x8r x1fcty0u xdj266r xat24cr xgzva0m xhhsvwb xxymvpz xlup9mm x1kky2od"><img height="16" width="16" alt="📣" class="xz74otr x168nmei x13lgxp2 x5pf9jr xo71vjh" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/images/emoji.php/v9/tba/1/16/1f4e3.png" /></span> 𝗣𝗔𝗥𝗧𝗜𝗖𝗜𝗣𝗘𝗥 𝗔̀ 𝗟𝗔 𝗖𝗔𝗠𝗣𝗔𝗚𝗡𝗘 :<br />(les dons se font via Caritas, pour permettre la d&eacute;duction fiscale de 45% &agrave; partir de 40&euro; de don). Comment ?<br /><span class="html-span xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs x3nfvp2 x1j61x8r x1fcty0u xdj266r xat24cr xgzva0m xhhsvwb xxymvpz xlup9mm x1kky2od"><img height="16" width="16" alt="📱" class="xz74otr x168nmei x13lgxp2 x5pf9jr xo71vjh" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/images/emoji.php/v9/t57/1/16/1f4f1.png" /></span> Via les 𝗤𝗥 𝗖𝗼𝗱𝗲 pr&eacute;sents sur le visuel (&agrave; scanner directement via son application bancaire!)<br /><span class="html-span xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs x3nfvp2 x1j61x8r x1fcty0u xdj266r xat24cr xgzva0m xhhsvwb xxymvpz xlup9mm x1kky2od"><img height="16" width="16" alt="💸" class="xz74otr x168nmei x13lgxp2 x5pf9jr xo71vjh" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/images/emoji.php/v9/t62/1/16/1f4b8.png" /></span> Par 𝘃𝗶𝗿𝗲𝗺𝗲𝗻𝘁 sur le compte de Caritas BE04 2400 8007 6231 avec en communication : PROJET 732 371</div>
</div>
<div class="x11i5rnm xat24cr x1mh8g0r x1vvkbs xtlvy1s x126k92a">
<div dir="auto"><span class="html-span xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs x3nfvp2 x1j61x8r x1fcty0u xdj266r xat24cr xgzva0m xhhsvwb xxymvpz xlup9mm x1kky2od"><img height="16" width="16" alt="📌" class="xz74otr x168nmei x13lgxp2 x5pf9jr xo71vjh" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/images/emoji.php/v9/tac/1/16/1f4cc.png" /></span> Un don, une id&eacute;e, un partage : 𝗼𝗻 𝗮 𝗯𝗲𝘀𝗼𝗶𝗻 𝗱𝗲 𝘃𝗼𝘂𝘀 ! 𝗠𝗘𝗥𝗖𝗜 𝗱𝗲 𝗳𝗮𝗶𝗿𝗲 𝗰𝗶𝗿𝗰𝘂𝗹𝗲𝗿 𝗲𝘁 𝗱𝗲 𝗳𝗮𝗶𝗿𝗲 𝗽𝗮𝗿𝗹𝗲𝗿 𝗱𝗲 𝗰𝗲𝘁𝘁𝗲 𝗰𝗮𝗺𝗽𝗮𝗴𝗻𝗲 𝗮𝘂𝘁𝗼𝘂𝗿 𝗱𝗲 𝘃𝗼𝘂𝘀 !</div>
</div>`,
    imageEtiquetteUn: {
  url: "/images/1747338823-campagne-solidaire-2025-cover-fb.png",
  alt: ""
}
  },
  menu: {
    sousMenuAgirAvecNousDevenirTalent: "Devenir un talent InterAct",
    sousMenuAgirAvecNousFormerUnduo: "Former un Duo2Change",
    sousMenuAgirAvecNousDevenirCoah: "Rejoindre l'InterLab",
    sousMenuAgirAvecNousParticiperFormation: "Participer à nos formations Com'Together",
    sousMenuAgirAvecNousDevenirVolontaire: "Devenir volontaire INTERRA",
    sousMenuAgirAvecNousFaireDon: "Faire un Don"
  },
  histoireDe: {
    textePageDAccueil: `<p>La communaut&eacute; INTERRA est constitu&eacute;e d'une multitude de personnalit&eacute;s, chacune avec sa propre histoire. Tu souhaites partager la tienne ?</p>
<p>Contacte-nous ! 👉 christine@interra-asbl.be</p>`,
    imageAccueil: {
  url: "/images/1727964389-2024-06-01-anniv-interra-12.jpg",
  alt: ""
},
    imageHistoireDe: {
  url: "/images/1727964388-2024-06-01-anniv-interra-51.jpg",
  alt: ""
}
  },
  allInformation: []
};
