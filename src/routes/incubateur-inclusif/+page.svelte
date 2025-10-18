<script lang="ts">
  import type { PageData } from './$types';
  import Footer from '$lib/components/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';

  export let data: PageData;
</script>

<svelte:head>
  <title>Incubateur Inclusif - INTERRA</title>
  <meta name="description" content="Découvrez notre incubateur inclusif." />
</svelte:head>

<div class="min-h-screen flex flex-col h-screen">
  <section class="fullheader w-12/12 m-auto fixed bg-white z-50 font-sans">
    <Navbar />
  </section>
  
  <section class="w-12/12 mt-24 md:mt-0 m-auto font-sans">
    <main class="flex-1 md:mt-52">
      {#if !data?.incubateurInclusif}
        <div class="text-center p-8">
          <p class="text-red-500">Erreur lors du chargement des données</p>
        </div>
      {:else}
        <article class="w-10/12 mt-10 m-auto">
          <h1 class="font-black text-4xl mb-10 md:mb-20 text-vert-interra bg-white text-center">
            {data.incubateurInclusif?.titre || 'Incubateur Inclusif'}
          </h1>
          
          <section class="flex flex-col md:flex-row mb-10 justify-center md:w-9/12 m-auto gap-x-10 gap-y-10 md:gap-y-20">
            <figure class="md:w-1/2">
              {#if data.incubateurInclusif?.image?.url}
                <img src={data.incubateurInclusif.image.url} alt={data.incubateurInclusif.image.alt || 'Image incubateur'} class="" />
              {:else}
                <div class="text-center p-8 bg-gray-100">
                  <p class="text-red-500">Erreur : Image incubateur non disponible</p>
                </div>
              {/if}
            </figure>
            
            <div class="md:w-1/2">
              <div class="paragraphe">
                {#if data.incubateurInclusif?.textePartieUn}
                  {@html data.incubateurInclusif.textePartieUn}
                {:else}
                  <p class="text-red-500">Erreur : Texte partie un non disponible</p>
                {/if}
              </div>
            </div>
          </section>
          
          <div class="paragraphe">
            {#if data.incubateurInclusif?.textePartieDeux}
              {@html data.incubateurInclusif.textePartieDeux}
            {:else}
              <p class="text-red-500">Erreur : Texte partie deux non disponible</p>
            {/if}
          </div>
          
          <button class="mt-5 text-white font-black p-1 px-2 bg-orange-interra hover:opacity-80 rounded">
            Je veux soutenir le projet
          </button>
        </article>
      {/if}
    </main>
  </section>
  
  <!-- Footer -->
  <footer class="w-12/12 m-auto font-sans">
    <Footer />
  </footer>
</div>
