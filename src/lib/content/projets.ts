import { nosProjetsContent } from './nos-projets';
import { interActContent } from './inter-act';
import { duoLangueContent } from './duo-langue';
import { incubateurInclusifContent } from './incubateur-inclusif';
import { formationInterculturelleContent } from './formation-interculturelle';

export type ProjetsContent = {
  nosProjet: {
    titreDeLaPage: string;
    texteDeLaPage: string;
    urlPdf: string;
    imageDeLaPage: {
      url: string;
      alt: string;
    };
  };
  interAct: {
    titre: string;
    chapeau: string;
    imageListe: {
      url: string;
      alt: string;
    };
  };
  duoLangue: {
    titre: string;
    chapeau: string;
    imageListeProjets: {
      url: string;
      alt: string;
    };
  };
  incubateurInclusif: {
    titre: string;
    chapeau: string;
    imageListeProjets: {
      url: string;
      alt: string;
    };
  };
  formationInterculturelle: {
    titre: string;
    chapeau: string;
    imageListeProjets: {
      url: string;
      alt: string;
    };
  };
};

export const projetsContent: ProjetsContent = {
  nosProjet: nosProjetsContent.nosProjet,
  interAct: {
    titre: "InterAct",
    chapeau: `<p>L'objectif d'InterAct est d'<strong>accompagner une personne nouvellement arriv&eacute;e ou locale dans l'organisation d'un atelier</strong> en fonction de son savoir-faire et de sa passion &agrave; un groupe de participants mixte (personnes primo-arrivants et locales).</p>`,
    imageListe: {
  url: "/images/1654172146-92afe8ff-57f9-4482-8fc1-a7e100f93c23.jpg",
  alt: ""
}
  },
  duoLangue: {
    titre: "Duo2Change",
    chapeau: `<p>L'objectif de Duo2Change&nbsp; est de <strong>favoriser l'inclusion des personnes nouvellement arriv&eacute;e et changer les regard sur les migrations, en mettant en lien une personne nouvellement arriv&eacute;e et une personne locale</strong>. Les b&icirc;nomes se rencontrent une fois par semaine pour partager un moment ensemble (discussion, d&eacute;couverte de la ville, d'un lieu, d'un sport, d'un jeu...) !</p>
<p></p>`,
    imageListeProjets: {
  url: "/images/1662641802-301308969_2927457107547062_5119449953488155505_n.jpg",
  alt: ""
}
  },
  incubateurInclusif: {
    titre: "InterLab",
    chapeau: `<p>L'InterLab accompagne les personnes nouvellement arriv&eacute;es, ou les personnes locales favorisant l'innovation issue des migrations, &agrave; la cr&eacute;ation d'organisation d'entreprises, ONG, ASBL...</p>`,
    imageListeProjets: {
  url: "/images/1687184963-327164752_1386885585183714_8131270433918108794_n.jpg",
  alt: ""
}
  },
  formationInterculturelle: {
    titre: "Com'Together",
    chapeau: `<section class="has_eae_slider elementor-section elementor-top-section elementor-element elementor-element-472520c elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="472520c" data-element_type="section">
  <div class="elementor-container elementor-column-gap-default">
    <div class="elementor-row">
      <div class="has_eae_slider elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-1674f4f" data-id="1674f4f" data-element_type="column">
        <div class="elementor-column-wrap elementor-element-populated">
          <div class="elementor-widget-wrap">
            <div class="elementor-element elementor-element-63a12ed elementor-absolute elementor-widget elementor-widget-text-editor" data-id="63a12ed" data-element_type="widget" data-settings="{&quot;_position&quot;:&quot;absolute&quot;}" data-widget_type="text-editor.default">
              <p class="elementor-widget-container">L'objectif des formations &agrave; la communication interculturelle est d'apprendre aux participant<span>&middot;</span><span>es &agrave; mieux communiquer tout en d&eacute;construisant des st&eacute;r&eacute;otypes et pr&eacute;jug&eacute;s.</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="has_eae_slider elementor-section elementor-top-section elementor-element elementor-element-fbcf97b elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="fbcf97b" data-element_type="section">
  <div class="elementor-container elementor-column-gap-default">
    <div class="elementor-row">
      <div class="has_eae_slider elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-bc1b8a7" data-id="bc1b8a7" data-element_type="column">
        <div class="elementor-column-wrap elementor-element-populated">
          <div class="elementor-widget-wrap">
            <div class="elementor-element elementor-element-3c73551 elementor-widget elementor-widget-menu-anchor" data-id="3c73551" data-element_type="widget" data-widget_type="menu-anchor.default">
              <div class="elementor-widget-container">
                <div id="media" class="elementor-menu-anchor"></div>
              </div>
            </div>
            <div class="elementor-element elementor-element-e163520 elementor-widget elementor-widget-elementskit-heading" data-id="e163520" data-element_type="widget" data-widget_type="elementskit-heading.default">
              <div class="elementor-widget-container">
                <div class="ekit-wid-con">
                  <div class="ekit-heading elementskit-section-title-wraper center   ekit_heading_tablet-   ekit_heading_mobile-">
                    <h4 class="ekit-heading--title elementskit-section-title "></h4>
                    <div class="ekit_heading_separetor_wraper ekit_heading_elementskit-border-divider">
                      <div class="elementskit-border-divider"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`,
    imageListeProjets: {
  url: "/images/1662649158-235367262_2672861786339930_2018903492249853222_n.jpg",
  alt: ""
}
  }
};
