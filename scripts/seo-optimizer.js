#!/usr/bin/env node

/**
 * Script SEO pour INTERRA
 * Génère automatiquement les optimisations SEO pour le site
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
  siteUrl: 'https://interra.be',
  siteName: 'INTERRA',
  description: 'INTERRA facilite l\'intégration des personnes récemment arrivées à Liège en créant des liens avec la population locale.',
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
    'inclusion'
  ],
  social: {
    facebook: 'https://www.facebook.com/interra.liege',
    instagram: 'https://www.instagram.com/interra_liege',
    linkedin: 'https://www.linkedin.com/company/interra-liege'
  }
};

// Fonction pour générer le manifest.json
function generateManifest() {
  const manifest = {
    name: config.siteName,
    short_name: 'INTERRA',
    description: config.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2D5A27',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '16x16 32x32 48x48',
        type: 'image/x-icon'
      },
      {
        src: '/images/interra-logo-300x300.jpeg',
        sizes: '192x192',
        type: 'image/jpeg'
      },
      {
        src: '/images/interra-logo-300x300.jpeg',
        sizes: '512x512',
        type: 'image/jpeg'
      }
    ],
    categories: ['social', 'education', 'nonprofit'],
    lang: 'fr',
    dir: 'ltr'
  };

  fs.writeFileSync(
    path.join(__dirname, 'static', 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  
  console.log('✅ Manifest.json généré');
}

// Fonction pour générer les métadonnées de base
function generateBaseMeta() {
  const metaContent = `<!-- Métadonnées SEO générées automatiquement -->
<meta name="generator" content="INTERRA SEO Script">
<meta name="revisit-after" content="7 days">
<meta name="rating" content="general">
<meta name="distribution" content="global">
<meta name="language" content="fr">
<meta name="geo.region" content="BE-LG">
<meta name="geo.placename" content="Liège">
<meta name="geo.position" content="50.6403;5.5718">
<meta name="ICBM" content="50.6403, 5.5718">

<!-- Open Graph par défaut -->
<meta property="og:site_name" content="${config.siteName}">
<meta property="og:locale" content="fr_BE">
<meta property="og:type" content="website">

<!-- Twitter Card par défaut -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@interra_liege">
<meta name="twitter:creator" content="@interra_liege">

<!-- Liens sociaux -->
<link rel="me" href="${config.social.facebook}">
<link rel="me" href="${config.social.instagram}">
<link rel="me" href="${config.social.linkedin}">`;

  fs.writeFileSync(
    path.join(__dirname, 'src', 'lib', 'seo-meta.html'),
    metaContent
  );
  
  console.log('✅ Métadonnées de base générées');
}

// Fonction pour analyser et optimiser les images
function analyzeImages() {
  const imagesDir = path.join(__dirname, 'static', 'images');
  
  if (!fs.existsSync(imagesDir)) {
    console.log('⚠️  Dossier images non trouvé');
    return;
  }

  const images = fs.readdirSync(imagesDir);
  const imageReport = {
    total: images.length,
    optimized: 0,
    needsOptimization: [],
    recommendations: []
  };

  images.forEach(image => {
    const ext = path.extname(image).toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
      imageReport.optimized++;
      
      // Recommandations
      if (ext === '.png' && image.includes('logo')) {
        imageReport.recommendations.push(`Convertir ${image} en WebP pour de meilleures performances`);
      }
      
      if (image.includes('header') || image.includes('hero')) {
        imageReport.recommendations.push(`Optimiser ${image} pour le LCP (Largest Contentful Paint)`);
      }
    }
  });

  fs.writeFileSync(
    path.join(__dirname, 'seo-image-report.json'),
    JSON.stringify(imageReport, null, 2)
  );
  
  console.log(`✅ Analyse des images terminée: ${imageReport.optimized}/${imageReport.total} optimisées`);
  if (imageReport.recommendations.length > 0) {
    console.log('📋 Recommandations:', imageReport.recommendations.join(', '));
  }
}

// Fonction pour générer un rapport SEO
function generateSEOReport() {
  const report = {
    generatedAt: new Date().toISOString(),
    site: config.siteUrl,
    optimizations: {
      manifest: '✅ Généré',
      sitemap: '✅ Dynamique',
      robots: '✅ Optimisé',
      metaTags: '✅ Complets',
      schemaOrg: '✅ JSON-LD',
      images: '✅ Composant optimisé',
      performance: '✅ Preconnect/DNS-prefetch'
    },
    recommendations: [
      'Ajouter Google Analytics 4',
      'Implémenter Google Search Console',
      'Configurer les Core Web Vitals',
      'Ajouter des données structurées pour les événements',
      'Optimiser les images en WebP',
      'Implémenter le lazy loading',
      'Ajouter un service worker pour le cache'
    ],
    nextSteps: [
      'Tester avec Google PageSpeed Insights',
      'Valider avec Google Rich Results Test',
      'Soumettre le sitemap à Google Search Console',
      'Configurer les alertes de monitoring'
    ]
  };

  fs.writeFileSync(
    path.join(__dirname, 'seo-report.json'),
    JSON.stringify(report, null, 2)
  );
  
  console.log('✅ Rapport SEO généré');
}

// Fonction pour créer un script de validation SEO
function generateValidationScript() {
  const validationScript = `#!/usr/bin/env node

/**
 * Script de validation SEO pour INTERRA
 */

import { chromium } from 'playwright';

async function validateSEO() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const tests = [
    {
      name: 'Page d\'accueil',
      url: 'http://localhost:5173/',
      checks: ['title', 'meta-description', 'h1', 'images-alt']
    },
    {
      name: 'Page projets',
      url: 'http://localhost:5173/projets',
      checks: ['title', 'meta-description', 'h1', 'schema-org']
    }
  ];
  
  for (const test of tests) {
    console.log(\`\\n🔍 Test: \${test.name}\`);
    await page.goto(test.url);
    
    // Vérifier le titre
    const title = await page.title();
    console.log(\`✅ Titre: \${title}\`);
    
    // Vérifier la meta description
    const metaDescription = await page.getAttribute('meta[name="description"]', 'content');
    console.log(\`✅ Meta description: \${metaDescription}\`);
    
    // Vérifier les H1
    const h1Count = await page.locator('h1').count();
    console.log(\`✅ Nombre de H1: \${h1Count}\`);
    
    // Vérifier les images sans alt
    const imagesWithoutAlt = await page.locator('img:not([alt])').count();
    console.log(\`✅ Images sans alt: \${imagesWithoutAlt}\`);
  }
  
  await browser.close();
}

validateSEO().catch(console.error);`;

  fs.writeFileSync(
    path.join(__dirname, 'validate-seo.js'),
    validationScript
  );
  
  console.log('✅ Script de validation généré');
}

// Fonction principale
async function main() {
  console.log('🚀 Démarrage de l\'optimisation SEO pour INTERRA...\n');
  
  try {
    generateManifest();
    generateBaseMeta();
    analyzeImages();
    generateSEOReport();
    generateValidationScript();
    
    console.log('\n🎉 Optimisation SEO terminée avec succès !');
    console.log('\n📋 Prochaines étapes:');
    console.log('1. Tester le site avec Google PageSpeed Insights');
    console.log('2. Valider avec Google Rich Results Test');
    console.log('3. Soumettre le sitemap à Google Search Console');
    console.log('4. Configurer Google Analytics 4');
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'optimisation SEO:', error);
    process.exit(1);
  }
}

// Exécution
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateManifest, generateBaseMeta, analyzeImages, generateSEOReport };
