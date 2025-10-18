<script lang="ts">
  import type { PageData } from './$types';
  import Footer from '$lib/components/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import SEO from '$lib/components/SEO.svelte';
  import { pageSEOConfigs } from '$lib/seo';

  export let data: PageData;
</script>

<SEO config={pageSEOConfigs['/seance-d-information']} />

<div class="min-h-screen flex flex-col h-screen">
  <section class="fullheader w-12/12 m-auto fixed bg-white z-50 font-sans">
    <Navbar />
  </section>
  
  <section class="w-12/12 mt-24 md:mt-0 m-auto font-sans">
    <main class="flex-1 md:mt-52">
      {#if !data?.sAncesDInformation}
        <div class="text-center p-8">
          <p class="text-red-500">Erreur lors du chargement des données</p>
        </div>
      {:else}
        <article class="w-10/12 mt-10 m-auto">
          <h1 class="font-black text-4xl text-vert-interra mb-10 bg-white text-center">
            {data.sAncesDInformation?.titreSAnceDInformation || 'Séance d\'information'}
          </h1>
          
          <div class="paragraphe mb-5">
            {#if data.sAncesDInformation?.texteDInformation}
              {@html data.sAncesDInformation.texteDInformation}
            {:else}
              <p class="text-red-500">Erreur : Texte d'information non disponible</p>
            {/if}
          </div>
          
          <div class="flex mt-5 items-baseline space-x-2">
            <p>Prochaine séance d'information :</p>
            <div class="paragraphe mb-5">
              {#if data.sAncesDInformation?.dateProchaineSAnceDInformation}
                {@html data.sAncesDInformation.dateProchaineSAnceDInformation}
              {:else}
                <p class="text-red-500">Date non disponible</p>
              {/if}
            </div>
          </div>

          <div class="flex mt-5 items-baseline space-x-2">
            <p>Infos et inscriptions :</p>
            <div class="paragraphe mb-5">
              {#if data.sAncesDInformation?.adresseMailSAnceDInformation}
                {@html data.sAncesDInformation.adresseMailSAnceDInformation}
              {:else}
                <p class="text-red-500">Adresse email non disponible</p>
              {/if}
            </div>
          </div>
        </article>
      {/if}
    </main>
  </section>
  
  <!-- Footer -->
  <footer class="w-12/12 m-auto font-sans">
    <Footer />
  </footer>
</div>