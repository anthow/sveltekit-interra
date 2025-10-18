<script lang="ts">
  import type { PageData } from './$types';
  import Footer from '$lib/components/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';

  export let data: PageData;
</script>

<svelte:head>
  <title>Presse - INTERRA</title>
  <meta name="description" content="Articles de presse et médias parlant d'INTERRA." />
</svelte:head>

<div class="min-h-screen flex flex-col h-screen">
  <section class="fullheader w-12/12 m-auto fixed bg-white z-50 font-sans">
    <Navbar />
  </section>
  
  <section class="w-12/12 mt-24 md:mt-0 m-auto font-sans">
    <main class="flex-1 md:mt-52">
      {#if !data?.presse}
        <div class="text-center p-8">
          <p class="text-red-500">Erreur lors du chargement des données</p>
        </div>
      {:else}
        <div class="w-12/12">
          <h1 class="font-black text-4xl text-vert-interra mt-2 bg-white text-center mb-20">
            Presse
          </h1>
          
          <section class="w-10/12 md:w-7/12 flex flex-col mb-20 md:space-x-10 m-auto space-y-40 content-start">
            <div class="flex flex-col md:grid grid-cols-2 space-x-10 w-12/12">
              <figure class="m-auto">
                {#if data.presse?.logoMedia?.url}
                  <img src={data.presse.logoMedia.url} alt={data.presse.logoMedia.alt || 'Logo média'} class="mb-10 m-auto md:justify-self-center" />
                {:else}
                  <p>Logo non disponible</p>
                {/if}
              </figure>

              <div>
                <h3 class="font-black text-m text-orange-interra">
                  {data.presse?.nomDuMDia || 'Média non disponible'}
                </h3>
                <h2 class="font-black text-lg mt-4 text-vert-interra italic mb-2">
                  {data.presse?.nomDeLArticle || 'Article non disponible'}
                </h2>
                <div class="italic mb-10">
                  {#if data.presse?.extrait}
                    {@html data.presse.extrait}
                  {:else}
                    <p>Extrait non disponible</p>
                  {/if}
                </div>
                {#if data.presse?.urlArticle}
                  <a href={data.presse.urlArticle} rel="noreferrer" target="_blank" class="mt-10 text-center">
                    <button class="md:mb-0 text-white bg-orange-interra font-black p-1 px-2 rounded hover:bg-white-interra hover:text-orange-interra hover:bg-white border hover:border-orange-interra">
                      lire l'article
                    </button>
                  </a>
                {/if}
              </div>
            </div>
          </section>
        </div>
      {/if}
    </main>
  </section>
  
  <!-- Footer -->
  <footer class="w-12/12 m-auto font-sans">
    <Footer />
  </footer>
</div>
