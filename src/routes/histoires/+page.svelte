<script lang="ts">
  import type { PageData } from './$types';
  import Footer from '$lib/components/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';

  export let data: PageData;
</script>

<svelte:head>
  <title>Histoires - INTERRA</title>
  <meta name="description" content="Découvrez les histoires de nos membres." />
</svelte:head>

<div class="min-h-screen flex flex-col h-screen">
  <section class="fullheader w-12/12 m-auto fixed bg-white z-50 font-sans">
    <Navbar />
  </section>
  
  <section class="w-12/12 mt-24 md:mt-0 m-auto font-sans">
    <main class="flex-1 md:mt-52">
      <article class="w-10/12 m-auto">
        <h1 class="font-black text-4xl mb-10 md:mb-20 text-vert-interra bg-white text-center">
          Histoires
        </h1>
        
        <section class="mt-10 flex flex-col space-y-20 m-auto">
          {#if data?.histoireDe}
            {#if data.histoireDe}
              <div class="flex flex-col md:grid grid-cols-2 gap-x-10 gap-y-10 md:gap-y-20">
                <figure class="md:relative md:bottom-20">
                  {#if data.histoireDe?.imageAccueil?.url}
                    <img src={data.histoireDe.imageAccueil.url} alt={data.histoireDe.imageAccueil.alt || 'Image histoire'} class="w-full h-auto" />
                  {:else}
                    <div class="text-center p-8 bg-gray-100">
                      <p class="text-red-500">Erreur : Image histoire non disponible</p>
                    </div>
                  {/if}
                </figure>
                
                <article class="self-center flex flex-col justify-center">
                  <h2 class="font-black text-2xl md:text-4xl text-vert-interra mb-5">
                    {data.histoireDe?.nomDeLActivit || 'Erreur : Nom activité non disponible'}
                  </h2>
                  
                  <h3 class="font-black text-lg mb-5 text-orange-interra">
                    {data.histoireDe?.nomDeLaPersonne || 'Erreur : Nom personne non disponible'}
                  </h3>
                  
                  <div class="paragraphe">
                    {#if data.histoireDe?.textePageDAccueil}
                      {@html data.histoireDe.textePageDAccueil}
                    {:else}
                      <p class="text-red-500">Erreur : Texte histoire non disponible</p>
                    {/if}
                  </div>
                  
                  {#if data.histoireDe?.url}
                    <a href="/histoires/{data.histoireDe.url}" class="w-max m-auto mt-5">
                      <button class="text-white bg-vert-interra font-black p-1 px-2 rounded hover:bg-white-interra hover:text-vert-interra hover:bg-white border hover:border-vert-interra">
                        Lire l'histoire complète
                      </button>
                    </a>
                  {/if}
                </article>
              </div>
            {/if}
          {:else}
            <div class="text-center p-8">
              <p class="text-red-500">Erreur : Aucune histoire disponible</p>
            </div>
          {/if}
        </section>
      </article>
    </main>
  </section>
  
  <!-- Footer -->
  <footer class="w-12/12 m-auto font-sans">
    <Footer />
  </footer>
</div>