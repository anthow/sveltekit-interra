<script lang="ts">
  import type { PageData } from './$types';
  import Footer from '$lib/components/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import Listprojets from '$lib/components/Listprojets.svelte';

  export let data: PageData;
</script>

<svelte:head>
  <title>Projets - INTERRA</title>
  <meta name="description" content="Découvrez tous les projets d'INTERRA pour favoriser l'inclusion et créer du lien entre les personnes." />
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
        <article class="m-auto flex flex-col">
          <article class="w-10/12 m-auto">
            <section class="mt-10 flex flex-col space-y-20 m-auto">
              <div class="flex flex-col gap-10 md:grid grid-cols-2">
                <figure class="">
                  {#if data.nosProjet?.imageDeLaPage?.url}
                    <img 
                      src={data.nosProjet.imageDeLaPage.url} 
                      alt={data.nosProjet.imageDeLaPage.alt || 'Nos projets'} 
                      class="w-full h-auto"
                    />
                  {:else}
                    <div class="w-full h-64 bg-gray-200 flex items-center justify-center">
                      <p class="text-gray-500">Image non disponible</p>
                    </div>
                  {/if}
                </figure>
                <div class="flex flex-col gap-5">
                  <h1 class="text-center font-black text-4xl mb-10 text-vert-interra bg-white">
                    {data.nosProjet?.titreDeLaPage || 'Nos projets'}
                  </h1>
                  
                  <div class="paragraphe">
                    {#if data.nosProjet?.texteDeLaPage}
                      {@html data.nosProjet.texteDeLaPage}
                    {:else}
                      <p>Vous souhaitez tout savoir sur les projets d'INTERRA ? Consultez le Dossier de présentation !</p>
                    {/if}
                  </div>
                  
                  <a href={data.nosProjet?.urlPdf || "https://miniurl.be/r-4lo4"} rel="noreferrer" target="_blank" class="mt-10 text-center"> 
                    <button class="w-max mt-5 text-white bg-vert-interra font-black p-1 px-2 rounded hover:bg-white hover:text-vert-interra hover:border-vert-interra border">
                      Découvrir nos projets
                    </button>
                  </a>
                </div>
              </div> 
            </section>
          </article>

          <Listprojets data={data} />
        </article>
      {/if}
    </main>
  </section>
  
  <Footer />
</div>