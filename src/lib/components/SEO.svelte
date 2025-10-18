<script lang="ts">
  import type { SEOConfig, BreadcrumbSchema } from '$lib/seo';
  import { 
    generateSEOMeta, 
    generateOpenGraphMeta, 
    generateTwitterCardMeta, 
    generateSchemaJSONLD,
    generateCanonicalURL,
    organizationSchema,
    defaultSEO
  } from '$lib/seo';
  import { page } from '$app/stores';

  export let config: SEOConfig;
  export let breadcrumbs: BreadcrumbSchema[] = [];
  export let structuredData: any = null;

  // Génération des métadonnées
  $: meta = generateSEOMeta(config);
  $: ogMeta = generateOpenGraphMeta(config);
  $: twitterMeta = generateTwitterCardMeta(config);
  $: canonicalURL = generateCanonicalURL($page.url.pathname);

  // Schema.org JSON-LD
  $: organizationSchemaLD = generateSchemaJSONLD('Organization', organizationSchema);
  $: breadcrumbSchemaLD = breadcrumbs.length > 0 ? generateSchemaJSONLD('BreadcrumbList', breadcrumbs) : null;
</script>

<svelte:head>
  <!-- Titre et description -->
  <title>{meta.title}</title>
  <meta name="description" content={meta.description} />
  
  <!-- Mots-clés -->
  {#if meta.keywords}
    <meta name="keywords" content={meta.keywords} />
  {/if}
  
  <!-- URL canonique -->
  <link rel="canonical" href={canonicalURL} />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:title" content={ogMeta['og:title']} />
  <meta property="og:description" content={ogMeta['og:description']} />
  <meta property="og:image" content={ogMeta['og:image']} />
  <meta property="og:url" content={ogMeta['og:url']} />
  <meta property="og:type" content={ogMeta['og:type']} />
  <meta property="og:locale" content={ogMeta['og:locale']} />
  <meta property="og:site_name" content={ogMeta['og:site_name']} />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content={twitterMeta['twitter:card']} />
  <meta name="twitter:title" content={twitterMeta['twitter:title']} />
  <meta name="twitter:description" content={twitterMeta['twitter:description']} />
  <meta name="twitter:image" content={twitterMeta['twitter:image']} />
  <meta name="twitter:site" content={twitterMeta['twitter:site']} />
  <meta name="twitter:creator" content={twitterMeta['twitter:creator']} />
  
  <!-- Métadonnées spécifiques -->
  {#if config.author}
    <meta name="author" content={config.author} />
  {/if}
  
  {#if config.publishedTime}
    <meta property="article:published_time" content={config.publishedTime} />
  {/if}
  
  {#if config.modifiedTime}
    <meta property="article:modified_time" content={config.modifiedTime} />
  {/if}
  
  <!-- Robots -->
  {#if config.noindex}
    <meta name="robots" content="noindex, nofollow" />
  {:else if config.nofollow}
    <meta name="robots" content="index, nofollow" />
  {/if}
  
  <!-- Langues alternatives -->
  {#if config.alternateLocales}
    {#each config.alternateLocales as locale}
      <link rel="alternate" hreflang={locale} href={canonicalURL} />
    {/each}
  {/if}
  
  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
    {JSON.stringify(organizationSchemaLD)}
  </script>
  
  {#if breadcrumbSchemaLD}
    <script type="application/ld+json">
      {JSON.stringify(breadcrumbSchemaLD)}
    </script>
  {/if}
  
  {#if structuredData}
    <script type="application/ld+json">
      {JSON.stringify(structuredData)}
    </script>
  {/if}
</svelte:head>
