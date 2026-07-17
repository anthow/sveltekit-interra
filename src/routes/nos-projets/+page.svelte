<script lang="ts">
  import type { PageData } from './$types';
  import Footer from '$lib/components/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import SEO from '$lib/components/SEO.svelte';
  import { pageSEOConfigs } from '$lib/seo';
  export let data: PageData;
</script>

<SEO config={pageSEOConfigs['/nos-projets']} />

<div class="min-h-screen flex flex-col h-screen">
  <section class="fullheader w-12/12 m-auto fixed bg-white z-50 font-sans">
    <Navbar />
  </section>
  
  <section class="w-12/12 mt-24 md:mt-0 m-auto font-sans">
    <main class="flex-1 md:mt-52">
      {#if !data?.nosProjet}
        <div class="text-center p-8">
          <p class="text-red-500">Erreur lors du chargement des données</p>
        </div>
      {:else}
        <article class="w-10/12 m-auto">
          <h1 class="font-black text-4xl mt-10 mb-10 text-jaune-interra text-center">
            {data.nosProjet?.titreDeLaPage || 'Nos projets'}
          </h1>
        </article>
      {/if}
    </main>
  </section>
  
  <!-- Footer -->
  <footer class="w-12/12 m-auto font-sans">
    <Footer />
  </footer>
</div>
