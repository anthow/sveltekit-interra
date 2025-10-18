<script lang="ts">
  import type { PageData } from './$types';
  import Footer from '$lib/components/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';

  export let data: PageData;
</script>

<svelte:head>
  <title>Nos projets - INTERRA</title>
  <meta name="description" content="Découvrez nos projets et nos initiatives." />
</svelte:head>

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
          <section class="mt-10 flex flex-col space-y-20 m-auto">
            <div class="flex flex-col gap-10 md:grid grid-cols-2">
              <figure>
                {#if data.nosProjet?.imageDeLaPage?.url}
                  <img src={data.nosProjet.imageDeLaPage.url} alt={data.nosProjet.imageDeLaPage.alt || 'Image projet'} class="" />
                {:else}
                  <div class="text-center p-8 bg-gray-100">
                    <p class="text-red-500">Erreur : Image projet non disponible</p>
                  </div>
                {/if}
              </figure>
              
              <div class="flex flex-col gap-5">
                <h1 class="font-black text-4xl mb-10 md:mb-20 text-jaune-interra bg-white text-center">
                  {data.nosProjet?.titreDeLaPage || 'Nos projets'}
                </h1>
                
                <div class="paragraphe">
                  {#if data.nosProjet?.texteDeLaPage}
                    {@html data.nosProjet.texteDeLaPage}
                  {:else}
                    <p class="text-red-500">Erreur : Texte projet non disponible</p>
                  {/if}
                </div>
                
                {#if data.nosProjet?.urlPdf}
                  <a href={data.nosProjet.urlPdf} rel="noreferrer" target="_blank" class="mt-10 text-center"> 
                    <button class="w-max mt-5 text-white bg-vert-interra font-black p-1 px-2 rounded hover:bg-white hover:text-vert-interra hover:border-vert-interra border">
                      Découvrir nos projets
                    </button>
                  </a>
                {:else}
                  <a href="https://miniurl.be/r-4lo4" rel="noreferrer" target="_blank" class="mt-10 text-center"> 
                    <button class="w-max mt-5 text-white bg-vert-interra font-black p-1 px-2 rounded hover:bg-white hover:text-vert-interra hover:border-vert-interra border">
                      Découvrir nos projets
                    </button>
                  </a>
                {/if}
              </div>
            </div>
          </section>
        </article>
      {/if}
    </main>
  </section>
  
  <!-- Footer -->
  <footer class="w-12/12 m-auto font-sans">
    <Footer />
  </footer>
</div>
