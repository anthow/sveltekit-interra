# 🚀 Optimisation SEO pour INTERRA

Ce système SEO complet a été créé pour maximiser la visibilité et les performances de recherche du site INTERRA.

## 📁 Structure des fichiers SEO

```
src/lib/
├── seo.ts                    # Configuration SEO centralisée
├── components/
│   ├── SEO.svelte           # Composant SEO réutilisable
│   └── OptimizedImage.svelte # Composant image optimisé
└── seo-meta.html           # Métadonnées de base générées

src/routes/
└── sitemap.xml/
    └── +server.ts          # Sitemap XML dynamique

static/
├── robots.txt              # Configuration robots optimisée
└── manifest.json           # Manifest PWA généré

scripts/
└── seo-optimizer.js        # Script d'optimisation automatique
```

## 🛠️ Utilisation

### 1. Composant SEO dans une page

```svelte
<script>
  import SEO from '$lib/components/SEO.svelte';
  import { pageSEOConfigs } from '$lib/seo';
  
  // Utilisation simple avec configuration prédéfinie
  const seoConfig = pageSEOConfigs['/projets'];
</script>

<SEO config={seoConfig} />
```

### 2. Configuration SEO personnalisée

```svelte
<script>
  import SEO from '$lib/components/SEO.svelte';
  
  const customSEO = {
    title: 'Mon Titre Personnalisé - INTERRA',
    description: 'Description personnalisée pour cette page',
    keywords: ['mot-clé1', 'mot-clé2'],
    image: '/images/ma-image.jpg',
    type: 'article',
    publishedTime: '2024-01-01T00:00:00Z'
  };
</script>

<SEO config={customSEO} />
```

### 3. Images optimisées

```svelte
<script>
  import OptimizedImage from '$lib/components/OptimizedImage.svelte';
</script>

<OptimizedImage 
  src="/images/logo.jpg" 
  alt="Logo INTERRA"
  width={300}
  height={300}
  priority={true}
/>
```

## 🚀 Scripts disponibles

```bash
# Générer toutes les optimisations SEO
npm run seo:optimize

# Valider le SEO (nécessite le serveur de dev)
npm run seo:validate

# Voir le rapport SEO
npm run seo:report
```

## 📊 Fonctionnalités SEO implémentées

### ✅ Métadonnées complètes
- Titre et description optimisés
- Mots-clés pertinents
- Open Graph (Facebook)
- Twitter Cards
- Géolocalisation (Liège)
- Langues alternatives

### ✅ Schema.org JSON-LD
- Organisation INTERRA
- Breadcrumbs
- Articles
- Événements (extensible)

### ✅ Performance
- Preconnect/DNS-prefetch
- Lazy loading des images
- Optimisation des fonts
- Cache headers

### ✅ Accessibilité
- Alt text automatique
- Structure sémantique
- Navigation clavier
- Contraste optimisé

### ✅ Indexation
- Sitemap XML dynamique
- Robots.txt optimisé
- URLs canoniques
- Métadonnées robots

## 🎯 Configuration par page

Les configurations SEO sont prédéfinies dans `src/lib/seo.ts` :

```typescript
export const pageSEOConfigs: Record<string, SEOConfig> = {
  '/': {
    title: 'Accueil - INTERRA | Intégration et Interculturalité à Liège',
    description: 'INTERRA facilite l\'intégration...',
    keywords: ['intégration liège', 'interculturalité', 'migrants']
  },
  '/projets': {
    title: 'Nos Projets - INTERRA',
    description: 'Explorez tous nos projets...',
    keywords: ['projets interra', 'duo2change', 'ateliers']
  }
  // ... autres pages
};
```

## 📈 Monitoring et validation

### Outils recommandés
- **Google PageSpeed Insights** : Performance
- **Google Rich Results Test** : Schema.org
- **Google Search Console** : Indexation
- **Lighthouse** : Audit complet

### Métriques importantes
- **Core Web Vitals** : LCP, FID, CLS
- **SEO Score** : Lighthouse SEO
- **Accessibility Score** : Lighthouse A11y
- **Best Practices** : Lighthouse BP

## 🔧 Personnalisation

### Ajouter une nouvelle page
1. Ajouter la configuration dans `pageSEOConfigs`
2. Utiliser le composant `<SEO>` dans la page
3. Mettre à jour le sitemap si nécessaire

### Modifier les métadonnées par défaut
Éditer `defaultSEO` dans `src/lib/seo.ts`

### Ajouter des données structurées
Utiliser le paramètre `structuredData` du composant SEO

## 📋 Checklist SEO

- [x] Métadonnées complètes
- [x] Schema.org JSON-LD
- [x] Sitemap XML
- [x] Robots.txt
- [x] Images optimisées
- [x] Performance optimisée
- [x] Accessibilité
- [x] URLs canoniques
- [x] Open Graph
- [x] Twitter Cards
- [ ] Google Analytics 4
- [ ] Google Search Console
- [ ] Service Worker
- [ ] Monitoring Core Web Vitals

## 🚀 Prochaines étapes

1. **Analytics** : Implémenter Google Analytics 4
2. **Search Console** : Configurer et soumettre le sitemap
3. **Monitoring** : Mettre en place des alertes de performance
4. **A/B Testing** : Tester différentes configurations SEO
5. **Internationalisation** : Préparer pour d'autres langues

---

*Ce système SEO a été conçu spécifiquement pour INTERRA et peut être adapté selon les besoins futurs.*
