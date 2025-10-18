<script lang="ts">
  export let src: string;
  export let alt: string;
  export let width?: number;
  export let height?: number;
  export let loading: 'lazy' | 'eager' = 'lazy';
  export let className: string = '';
  export let priority: boolean = false;
  export let sizes?: string;
  export let srcset?: string;

  // Génération automatique d'alt text si non fourni
  $: optimizedAlt = alt || generateAltFromSrc(src);
  
  function generateAltFromSrc(src: string): string {
    const filename = src.split('/').pop()?.split('.')[0] || '';
    return filename
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
      .trim();
  }
</script>

<img 
  {src}
  alt={optimizedAlt}
  {width}
  {height}
  loading={priority ? 'eager' : loading}
  class={className}
  {sizes}
  {srcset}
  decoding="async"
  fetchpriority={priority ? 'high' : 'auto'}
/>
