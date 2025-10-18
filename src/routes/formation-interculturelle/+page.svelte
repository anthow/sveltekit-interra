<script lang="ts">
  import type { PageData } from './$types';
  import Footer from '$lib/components/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';

  export let data: PageData;
</script>

<svelte:head>
  <title>Formation interculturelle - INTERRA</title>
  <meta name="description" content="Découvrez notre formation à la communication interculturelle Com'Together pour favoriser le vivre ensemble." />
</svelte:head>

<div class="min-h-screen flex flex-col h-screen">
  <section class="fullheader w-12/12 m-auto fixed bg-white z-50 font-sans">
    <Navbar />
  </section>
  
  <section class="w-12/12 mt-24 md:mt-0 m-auto font-sans">
    <main class="flex-1 md:mt-52">
      {#if !data?.formationInterculturelle}
        <div class="text-center p-8">
          <p class="text-red-500">Erreur lors du chargement des données</p>
        </div>
      {:else}
        <div class="w-12/12">
          <article class="w-10/12 mt-2 m-auto">
            <h1 class="font-black text-4xl mb-10 md:mb-20 text-bleu-interra text-center">
              {data.formationInterculturelle?.titre || 'Formation interculturelle'}
            </h1>
            
            <!-- Première section : texte + image -->
            <section class="md:grid grid-cols-2 mb-10 flex flex-col gap-x-10 gap-y-10 md:gap-y-20">
              <div class="order-1 md:order-2">
                <h2 class="font-black text-2xl mb-5 text-bleu-interra">
                  {data.formationInterculturelle?.titreOrganiser || 'Participez à une formation à la communication interculturelle'}
                </h2>
                <div class="paragraphe">
                  {#if data.formationInterculturelle?.texteUnOrganiser}
                    {@html data.formationInterculturelle.texteUnOrganiser}
                  {:else}
                    <p>De nos jours, chacun·e est amené·e à côtoyer différentes cultures dans sa vie quotidienne. Dans nos sociétés multiculturelles, des personnes et groupes de cultures différentes co-existent sur le territoire, mais est-ce pour autant que ces personnes et groupes se rencontrent ?</p>
                  {/if}
                </div>
              </div>
              <figure class="order-1 md:order-2">
                {#if data.formationInterculturelle?.imageUneOrganiser?.url}
                  <img 
                    src={data.formationInterculturelle.imageUneOrganiser.url} 
                    alt={data.formationInterculturelle.imageUneOrganiser.alt || 'Formation interculturelle'} 
                    class="w-full h-auto"
                  />
                {:else}
                  <div class="w-full h-64 bg-gray-200 flex items-center justify-center">
                    <p class="text-gray-500">Image non disponible</p>
                  </div>
                {/if}
              </figure>
            </section>
            
            <!-- Texte central -->
            <div class="paragraphe mb-10">
              {#if data.formationInterculturelle?.texteUnUn}
                {@html data.formationInterculturelle.texteUnUn}
              {:else}
                <p>Portée un duo de formateur·rices, la formation en communication interculturelle vous fera réfléchir et prendre conscience des enjeux que portent en elle-même l'interculturalité.</p>
              {/if}
            </div>
            
            <!-- Deuxième section : image commentée + texte -->
            <section class="md:grid grid-cols-2 mb-10 flex flex-col gap-x-10 gap-y-10 md:gap-y-20">
              <figure>
                <!-- Image commentée dans Gatsby - on la laisse vide comme dans l'original -->
                <!-- {#if data.formationInterculturelle?.imageDeuxOrganiser?.url}
                  <img 
                    src={data.formationInterculturelle.imageDeuxOrganiser.url} 
                    alt={data.formationInterculturelle.imageDeuxOrganiser.alt || 'Formation interculturelle'} 
                    class="w-full h-auto"
                  />
                {/if} -->
              </figure>
              <div>
                <div class="paragraphe">
                  {#if data.formationInterculturelle?.texteDeuxOrganiser}
                    {@html data.formationInterculturelle.texteDeuxOrganiser}
                  {:else}
                    <p>On vous propose une expérience interculturelle et on vous invite à réfléchir ensemble sur le «vivre ensemble» en «faisant ensemble».</p>
                  {/if}
                </div>
              </div>
            </section>
            
            <!-- Section avec fond bleu -->
            <section class="bg-bleu-interra mb-10 md:mb-20 flex flex-col md:grid grid-cols-2 text-white gap-10 md:gap-20 justify-around">
              <figure class="h-max">
                {#if data.formationInterculturelle?.imageTroisOrganiser?.url}
                  <img 
                    src={data.formationInterculturelle.imageTroisOrganiser.url} 
                    alt={data.formationInterculturelle.imageTroisOrganiser.alt || 'Objectifs formation'} 
                    class="min-h-full justify-self-end w-full h-auto"
                  />
                {:else}
                  <div class="w-full h-64 bg-gray-300 flex items-center justify-center">
                    <p class="text-gray-600">Image non disponible</p>
                  </div>
                {/if}
              </figure>

              <div class="paragraphe p-5">
                {#if data.formationInterculturelle?.texteTroisOrganiser}
                  {@html data.formationInterculturelle.texteTroisOrganiser}
                {:else}
                  <h2>Objectifs de la formation :</h2>
                  <ul>
                    <li>Outiller à la communication et à la démarche interculturelle</li>
                    <li>Se nourrir d'autres perspectives et expériences</li>
                    <li>Explorer les notions de culture et d'identité</li>
                  </ul>
                {/if}
              </div>
            </section>

            <!-- Section des coachs commentée dans Gatsby - on la laisse vide comme dans l'original -->

          </article>
        </div>
      {/if}
    </main>
  </section>
  
  <Footer />
</div>