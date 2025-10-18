<script lang="ts">
  import type { PageData } from './$types';
  import Footer from '$lib/components/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';

  export let data: PageData;
</script>

<svelte:head>
  <title>Étiquette - INTERRA</title>
  <meta name="description" content="Découvrez notre étiquette et nos valeurs." />
</svelte:head>

<div class="min-h-screen flex flex-col h-screen">
  <section class="fullheader w-12/12 m-auto fixed bg-white z-50 font-sans">
    <Navbar />
  </section>
  
  <section class="w-12/12 mt-24 md:mt-0 m-auto font-sans">
    <main class="flex-1 md:mt-52">
      {#if !data?.accueil}
        <div class="text-center p-8">
          <p class="text-red-500">Erreur lors du chargement des données</p>
        </div>
      {:else}
        <article class="w-10/12 mt-10 m-auto">
          <h1 class="font-black text-4xl mb-10 text-vert-interra bg-white text-center">
            {data.accueil?.titreTiquette || 'Étiquette'}
          </h1>
          
          <div class="flex flex-x-2 mb-20 w-12/12 justify-center m-auto">
            <figure>
              {#if data.accueil?.imageEtiquetteUn?.url}
                <img src={data.accueil.imageEtiquetteUn.url} alt={data.accueil.imageEtiquetteUn.alt || 'Image étiquette'} class="" />
              {:else}
                <div class="text-center p-8 bg-gray-100">
                  <p class="text-red-500">Erreur : Image étiquette non disponible</p>
                </div>
              {/if}
            </figure>
          </div>

          <div class="paragraphe mb-5">
            {#if data.accueil?.texteTiquette}
              {@html data.accueil.texteTiquette}
            {:else}
              <p class="text-red-500">Erreur : Texte étiquette non disponible</p>
            {/if}
          </div>
          
          <div class="paragraphe mb-5">
            {#if data.accueil?.textEtiquetteDeux}
              {@html data.accueil.textEtiquetteDeux}
            {:else}
              <p class="text-red-500">Erreur : Texte étiquette deux non disponible</p>
            {/if}
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
