export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  locale?: string;
  alternateLocales?: string[];
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export interface OrganizationSchema {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  contactPoint?: {
    telephone?: string;
    email?: string;
    contactType?: string;
  };
  sameAs?: string[];
}

export interface WebSiteSchema {
  name: string;
  url: string;
  description?: string;
  potentialAction?: {
    target: string;
    'query-input': string;
  };
}

export interface BreadcrumbSchema {
  name: string;
  url: string;
}

// Configuration SEO par défaut pour INTERRA
export const defaultSEO: SEOConfig = {
  title: 'INTERRA - Intégration et Interculturalité à Liège',
  description: 'INTERRA facilite l\'intégration des personnes récemment arrivées à Liège en créant des liens avec la population locale. Découvrez nos projets, formations et activités interculturelles.',
  keywords: [
    'intégration',
    'interculturalité',
    'Liège',
    'migrants',
    'asile',
    'formation',
    'interculturel',
    'belgique',
    'wallonie',
    'solidarité',
    'diversité',
    'inclusion',
    'duo',
    'volontariat',
    'ateliers'
  ],
  image: '/images/interra-logo-300x300.jpeg',
  url: 'https://interra.be',
  type: 'website',
  locale: 'fr-BE',
  alternateLocales: ['fr-FR', 'en-US']
};

// Schema.org pour l'organisation INTERRA
export const organizationSchema: OrganizationSchema = {
  name: 'INTERRA',
  url: 'https://interra.be',
  logo: 'https://interra.be/images/interra-logo-300x300.jpeg',
  description: 'Association facilitant l\'intégration des personnes récemment arrivées à Liège',
  address: {
    addressLocality: 'Liège',
    addressCountry: 'BE'
  },
  contactPoint: {
    contactType: 'customer service',
    email: 'info@interra.be'
  },
  sameAs: [
    'https://www.facebook.com/interra.liege',
    'https://www.instagram.com/interra_liege',
    'https://www.linkedin.com/company/interra-liege'
  ]
};

// Fonction pour générer les métadonnées SEO
export function generateSEOMeta(config: SEOConfig) {
  const meta = {
    title: config.title,
    description: config.description,
    keywords: config.keywords?.join(', '),
    image: config.image || defaultSEO.image,
    url: config.url || defaultSEO.url,
    type: config.type || 'website',
    locale: config.locale || defaultSEO.locale
  };

  return meta;
}

// Fonction pour générer le JSON-LD Schema.org
export function generateSchemaJSONLD(
  type: 'Organization' | 'WebSite' | 'Article' | 'BreadcrumbList',
  data: any
) {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': type
  };

  switch (type) {
    case 'Organization':
      return {
        ...baseSchema,
        ...data
      };
    
    case 'WebSite':
      return {
        ...baseSchema,
        ...data
      };
    
    case 'Article':
      return {
        ...baseSchema,
        headline: data.title,
        description: data.description,
        image: data.image,
        datePublished: data.publishedTime,
        dateModified: data.modifiedTime,
        author: {
          '@type': 'Organization',
          name: 'INTERRA'
        },
        publisher: {
          '@type': 'Organization',
          name: 'INTERRA',
          logo: {
            '@type': 'ImageObject',
            url: 'https://interra.be/images/interra-logo-300x300.jpeg'
          }
        }
      };
    
    case 'BreadcrumbList':
      return {
        ...baseSchema,
        itemListElement: data.map((item: BreadcrumbSchema, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url
        }))
      };
    
    default:
      return baseSchema;
  }
}

// Fonction pour générer les URLs canoniques
export function generateCanonicalURL(path: string, baseURL: string = 'https://interra.be') {
  return `${baseURL}${path}`;
}

// Fonction pour générer les métadonnées Open Graph
export function generateOpenGraphMeta(config: SEOConfig) {
  return {
    'og:title': config.title,
    'og:description': config.description,
    'og:image': config.image || defaultSEO.image,
    'og:url': config.url || defaultSEO.url,
    'og:type': config.type || 'website',
    'og:locale': config.locale || defaultSEO.locale,
    'og:site_name': 'INTERRA'
  };
}

// Fonction pour générer les métadonnées Twitter Card
export function generateTwitterCardMeta(config: SEOConfig) {
  return {
    'twitter:card': 'summary_large_image',
    'twitter:title': config.title,
    'twitter:description': config.description,
    'twitter:image': config.image || defaultSEO.image,
    'twitter:site': '@interra_liege',
    'twitter:creator': '@interra_liege'
  };
}

// Configuration SEO spécifique par page
export const pageSEOConfigs: Record<string, SEOConfig> = {
  '/': {
    title: 'Accueil - INTERRA | Intégration et Interculturalité à Liège',
    description: 'INTERRA facilite l\'intégration des personnes récemment arrivées à Liège. Découvrez nos projets, formations et activités pour créer du lien social.',
    keywords: ['intégration liège', 'interculturalité', 'migrants', 'formation interculturelle', 'solidarité']
  },
  '/decouvrir-interra': {
    title: 'Découvrir INTERRA - Notre Mission d\'Intégration',
    description: 'Apprenez-en plus sur INTERRA, notre mission d\'intégration des personnes récemment arrivées à Liège et nos valeurs interculturelles.',
    keywords: ['mission interra', 'intégration', 'valeurs', 'histoire association']
  },
  '/agir-avec-nous': {
    title: 'Agir avec INTERRA - Rejoignez notre Mission',
    description: 'Découvrez comment vous pouvez agir avec INTERRA : devenir volontaire, former un duo, participer à nos formations et projets.',
    keywords: ['volontariat', 'devenir volontaire', 'formation', 'duo', 'agir']
  },
  '/formation-interculturelle': {
    title: 'Formation Interculturelle - INTERRA',
    description: 'Participez à nos formations interculturelles pour développer vos compétences en communication et gestion de la diversité.',
    keywords: ['formation interculturelle', 'compétences', 'diversité', 'communication']
  },
  '/interlab': {
    title: 'InterLab - Laboratoire d\'Innovation Sociale',
    description: 'Rejoignez InterLab, notre laboratoire d\'innovation sociale pour développer des projets d\'intégration innovants.',
    keywords: ['interlab', 'innovation sociale', 'laboratoire', 'projets innovants']
  },
  '/histoires': {
    title: 'Histoires d\'Intégration - Témoignages INTERRA',
    description: 'Découvrez les histoires inspirantes de personnes qui ont réussi leur intégration grâce aux projets INTERRA.',
    keywords: ['témoignages', 'histoires', 'intégration réussie', 'inspiration']
  },
  '/projets': {
    title: 'Nos Projets - INTERRA',
    description: 'Explorez tous nos projets d\'intégration et d\'interculturalité : Duo2Change, formations, ateliers et bien plus.',
    keywords: ['projets interra', 'duo2change', 'ateliers', 'activités']
  },
  '/inter-act': {
    title: 'Inter-act - Ateliers de Création de Lien Social',
    description: 'Découvrez nos ateliers Inter-act pour créer du lien entre les personnes récemment arrivées et la population locale de Liège.',
    keywords: ['ateliers', 'inter-act', 'lien social', 'intégration', 'activités']
  },
  '/seance-d-information': {
    title: 'Séances d\'Information - INTERRA',
    description: 'Participez à nos séances d\'information pour découvrir nos projets, formations et activités d\'intégration à Liège.',
    keywords: ['séance information', 'découverte', 'projets', 'formations', 'intégration']
  },
  '/duo2change': {
    title: 'Duo2Change - Programme de Mentorat INTERRA',
    description: 'Découvrez Duo2Change, notre programme de mentorat qui crée des duos entre personnes récemment arrivées et habitants de Liège.',
    keywords: ['duo2change', 'mentorat', 'duo', 'accompagnement', 'intégration']
  },
  '/contact': {
    title: 'Contact INTERRA - Nous Contacter',
    description: 'Contactez INTERRA pour plus d\'informations sur nos projets, formations ou pour nous rejoindre.',
    keywords: ['contact', 'information', 'rejoindre', 'aide']
  }
};
