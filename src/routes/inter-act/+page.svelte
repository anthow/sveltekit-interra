<script lang="ts">
  import type { PageData } from './$types';
  import Footer from '$lib/components/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import SEO from '$lib/components/SEO.svelte';
  import { pageSEOConfigs } from '$lib/seo';

  export let data: PageData;
</script>

<SEO config={pageSEOConfigs['/inter-act']} />

<div class="min-h-screen flex flex-col h-screen">
  <section class="fullheader w-12/12 m-auto fixed bg-white z-50 font-sans">
    <Navbar />
  </section>
  
  <section class="w-12/12 mt-24 md:mt-0 m-auto font-sans">
    <main class="flex-1 md:mt-52">
      {#if !data?.interAct}
        <div class="text-center p-8">
          <p class="text-red-500">Erreur lors du chargement des données</p>
        </div>
      {:else}
        <div class="w-12/12">
          <!-- Titre principal -->
          <article class="w-10/12 mt-10 m-auto">
            <h1 class="font-black text-4xl mb-10 text-vert-interra bg-white text-center">
              {data.interAct?.titre || 'Inter-act'}
            </h1>
            
            <!-- Introduction -->
            <div class="mb-20 w-10/12 px-3 m-auto paragraphe">
              {#if data.interAct?.introduction}
                {@html data.interAct.introduction}
              {:else}
                <p class="text-red-500">Erreur : Introduction non disponible</p>
              {/if}
            </div>
            
          </article>
        </div>
      {/if}
    </main>
  </section>
  
  <Footer />
</div>