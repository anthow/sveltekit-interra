<script lang="ts">
  import type { PageData } from './$types';
  import Footer from '$lib/components/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';

  export let data: PageData;
</script>

<svelte:head>
  <title>InterLab - INTERRA</title>
  <meta name="description" content="Découvrez InterLab, notre incubateur inclusif qui accompagne les personnes nouvellement arrivées dans la création d'entreprises." />
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
        <div class="w-12/12">
          <article class="w-10/12 mt-10 m-auto">
            <h1 class="font-black text-4xl mb-10 md:mb-20 text-orange-interra bg-white text-center">
              {data.incubateurInclusif?.titre || 'InterLab'}
            </h1>
            
            <section class="flex flex-col md:flex-row mb-10 justify-center md:w-9/12 m-auto gap-x-10 gap-y-10 md:gap-y-20">
              <figure class="md:w-1/2">
                {#if data.incubateurInclusif?.image?.url}
                  <img 
                    src={data.incubateurInclusif.image.url} 
                    alt={data.incubateurInclusif.image.alt || 'InterLab'} 
                    class="w-full h-auto"
                  />
                {:else}
                  <div class="w-full h-64 bg-gray-200 flex items-center justify-center">
                    <p class="text-gray-500">Image non disponible</p>
                  </div>
                {/if}
              </figure>
              
              <div class="md:w-1/2">
                <div class="paragraphe">
                  {#if data.incubateurInclusif?.textePartieUn}
                    {@html data.incubateurInclusif.textePartieUn}
                  {:else}
                    <p>Au fil de notre accompagnement avec les porteurs d'ateliers du projet InterAct, nous nous apercevons qu'ils et elles disposent de véritables talents, et d'assez de passion et de résilience pour devenir entrepreneur·euses.</p>
                  {/if}
                </div>
              </div>
            </section>
            
            <div class="paragraphe">
              {#if data.incubateurInclusif?.textePartieDeux}
                {@html data.incubateurInclusif.textePartieDeux}
              {:else}
                <p>Au-delà de ne pas toujours maîtriser parfaitement la langue du pays d'accueil, les réfugié·es sont confronté·es à des réglementations complexes, une nouvelle culture, des codes et un environnement d'affaires méconnu.</p>
              {/if}
            </div>
          </article>
        </div>
      {/if}
    </main>
  </section>
  
  <Footer />
</div>