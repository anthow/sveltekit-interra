<script lang="ts">
  import type { PageData } from './$types';
  import Footer from '$lib/components/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';

  export let data: PageData;
</script>

<svelte:head>
  <title>Découvrir Interra - INTERRA</title>
  <meta name="description" content="Découvrez Interra, ses missions, ses valeurs et son ADN." />
</svelte:head>

<div class="min-h-screen flex flex-col h-screen">
  <section class="fullheader w-12/12 m-auto fixed bg-white z-50 font-sans">
    <Navbar />
  </section>
  
  <section class="w-12/12 mt-24 md:mt-0 m-auto font-sans">
    <main class="flex-1 md:mt-52">
      {#if !data?.decouvrirInterra}
        <div class="text-center p-8">
          <p class="text-red-500">Erreur lors du chargement des données</p>
        </div>
      {:else}
        <div class="w-12/12">
          <!-- Section ADN - Titre principal -->
          <article class="w-10/12 m-auto">
            <h1 class="font-normal text-4xl mt-10 md:mt-0 mb-10 md:mb-20 text-vert-interra bg-white text-center" id="adn">
              {data.decouvrirInterra?.titreAdn || 'Notre ADN'}
            </h1>
            
            <!-- Section Qui sommes-nous + Deux constats -->
            <section class="md:grid grid-cols-2 md:space-x-10 mb-10">
              <figure class="row-span-2">
                {#if data.decouvrirInterra?.imageAdn?.url}
                  <img src={data.decouvrirInterra.imageAdn.url} alt={data.decouvrirInterra.imageAdn.alt || 'ADN Interra'} class="h-min mb-5 md:mb-0 w-full" />
                {:else}
                  <div class="text-center p-8 bg-gray-100">
                    <p class="text-red-500">Erreur : Image ADN non disponible</p>
                  </div>
                {/if}
              </figure>
              
              <div>
                <h2 class="mb-5 text-2xl text-orange-interra">
                  {data.decouvrirInterra?.titreQuiSommesNous || 'Qui sommes nous ?'}
                </h2>
                <div class="paragraphe">
                  {#if data.decouvrirInterra?.texteQuiSommesNous}
                    {@html data.decouvrirInterra.texteQuiSommesNous}
                  {:else}
                    <p class="text-red-500">Erreur : Texte non disponible</p>
                  {/if}
                </div>

                <h2 class="mb-5 text-orange-interra mt-20 text-2xl">
                  {data.decouvrirInterra?.deuxConstats || 'Deux constats'}
                </h2>
                <div>
                  <div class="paragraphe">
                    {#if data.decouvrirInterra?.texteDeuxConstatsUn}
                      {@html data.decouvrirInterra.texteDeuxConstatsUn}
                    {:else}
                      <p class="text-red-500">Erreur : Texte non disponible</p>
                    {/if}
                  </div>
                  <div class="paragraphe mt-10">
                    {#if data.decouvrirInterra?.texteDeuxConstatsDeux}
                      {@html data.decouvrirInterra.texteDeuxConstatsDeux}
                    {:else}
                      <p class="text-red-500">Erreur : Texte non disponible</p>
                    {/if}
                  </div>
                </div>
              </div>
            </section>
          </article>

          <!-- Section Orange avec introductionListeConstat et liste des constats -->
          <section class="w-12/12 md:w-10/12 bg-orange-interra py-10 m-auto text-white">
            <div class="paragraphe text-center text-xl w-10/12 m-auto">
              {#if data.decouvrirInterra?.introductionListeConstat}
                {@html data.decouvrirInterra.introductionListeConstat}
              {:else}
                <p class="text-red-500">Erreur : Introduction non disponible</p>
              {/if}
            </div>
            <div class="paragraphe text-xl text-center">
              {#if data.decouvrirInterra?.listeDeuxConstats}
                {@html data.decouvrirInterra.listeDeuxConstats}
              {:else}
                <p class="text-red-500">Erreur : Liste des constats non disponible</p>
              {/if}
            </div>
          </section>

          <!-- Section L'idée d'INTERRA -->
          <article class="w-10/12 m-auto">
            <section class="m-auto md:grid grid-cols-2 flex flex-col gap-x-10 my-10">
              <div class="flex flex-col space-y-5 md:space-y-10 order-2 md:-order-1">
                <h2 class="text-2xl text-orange-interra">
                  {data.decouvrirInterra?.titreLien || 'L\'idée d\'INTERRA : créer du lien !'}
                </h2>
                <div class="paragraphe">
                  {#if data.decouvrirInterra?.texteLien}
                    {@html data.decouvrirInterra.texteLien}
                  {:else}
                    <p class="text-red-500">Erreur : Texte non disponible</p>
                  {/if}
                </div>
                <div class="paragraphe">
                  {#if data.decouvrirInterra?.listeLien}
                    {@html data.decouvrirInterra.listeLien}
                  {:else}
                    <p class="text-red-500">Erreur : Liste non disponible</p>
                  {/if}
                </div>
              </div>

              <figure class="order-1 md:-order-2 mb-5 md:mb-0">
                {#if data.decouvrirInterra?.imageLien?.url}
                  <img src={data.decouvrirInterra.imageLien.url} alt={data.decouvrirInterra.imageLien.alt || 'Lien Interra'} class="h-full mt-10 md:mt-0 w-full" />
                {:else}
                  <div class="text-center p-8 bg-gray-100">
                    <p class="text-red-500">Erreur : Image lien non disponible</p>
                  </div>
                {/if}
              </figure>
            </section>
            
            <div class="paragraphe font-black text-xl text-vert-interra m-auto text-center mb-10 md:mb-20" id="missions">
              {data.decouvrirInterra?.phraseLien || 'Il ne s\'agit plus de "eux" et "nous", mais de "la Communauté INTERRA".'}
            </div>
          </article>

          <!-- Section Nos Missions (fond vert) -->
          <article class="w-full bg-vert-interra text-white py-5 md:py-20 h-12/12">
            <h1 class="font-white text-4xl mb-10 font-black text-center">
              {data.decouvrirInterra?.titreNosMissions || 'Nos missions'}
            </h1>
            <section class="md:grid grid-cols-2 w-10/12 m-auto gap-x-10 mb-10">
              <figure>
                {#if data.decouvrirInterra?.imageMission?.url}
                  <img src={data.decouvrirInterra.imageMission.url} alt={data.decouvrirInterra.imageMission.alt || 'Nos Missions'} class="w-full h-auto" />
                {:else}
                  <div class="text-center p-8 bg-gray-100">
                    <p class="text-red-500">Erreur : Image mission non disponible</p>
                  </div>
                {/if}
              </figure>
              <div class="paragraphe mt-10 md:mt-0">
                {#if data.decouvrirInterra?.texteNosMissions}
                  {@html data.decouvrirInterra.texteNosMissions}
                {:else}
                  <p class="text-red-500">Erreur : Texte non disponible</p>
                {/if}
              </div>
            </section>
          </article>

          <!-- Section Nos Valeurs -->
          <article class="w-10/12 py-5 md:py-20 m-auto" id="valeurs">
            <h1 class="font-black text-4xl mb-10 bg-white text-center text-vert-interra">
              {data.decouvrirInterra?.titreValeurs || 'Nos valeurs'}
            </h1>
            <section class="md:grid grid-cols-2 grid-rows-2 gap-x-10 mb-10">
              <figure class="row-span-2 mb-10 md:mb-0 h-full">
                {#if data.decouvrirInterra?.imageValeurs?.url}
                  <img src={data.decouvrirInterra.imageValeurs.url} alt={data.decouvrirInterra.imageValeurs.alt || 'Nos Valeurs'} class="h-full w-full object-cover" />
                {:else}
                  <div class="text-center p-8 bg-gray-100">
                    <p class="text-red-500">Erreur : Image valeurs non disponible</p>
                  </div>
                {/if}
              </figure>
              <div class="p-1 flex flex-col space-y-2 bg-orange-interra text-center font-black text-white place-content-center mb-10">
                {#if data.decouvrirInterra?.listeValeurs}
                  {@html data.decouvrirInterra.listeValeurs}
                {:else}
                  <p class="text-red-500">Erreur : Liste des valeurs non disponible</p>
                {/if}
              </div>
              <div class="flex flex-col">
                <h2 class="text-2xl text-orange-interra mb-5">
                  {data.decouvrirInterra?.titrePourquoiInterra || 'Pourquoi "INTERRA" ?'}
                </h2>
                <div class="paragraphe">
                  {#if data.decouvrirInterra?.textePourquoiInterra}
                    {@html data.decouvrirInterra.textePourquoiInterra}
                  {:else}
                    <p class="text-red-500">Erreur : Texte non disponible</p>
                  {/if}
                </div>
              </div>
            </section>
          </article>

          <!-- Section Lexique -->
          <article class="w-10/12 py-5 md:py-20 flex flex-col gap-5 m-auto" id="lexique">
            <section class="flex flex-col items-center gap-5 text-center">
              <h2 class="text-4xl font-black text-orange-interra mb-5">
                {data.decouvrirInterra?.titreLexique || 'LE POIDS DES MOTS'}
              </h2>
              <div class="paragraphe">
                {#if data.decouvrirInterra?.introductionLexique}
                  {@html data.decouvrirInterra.introductionLexique}
                {:else}
                  <p class="text-red-500">Erreur : Introduction lexique non disponible</p>
                {/if}
              </div>
            </section>
            <div class="paragraphe flex flex-col gap-2">
              {#if data.decouvrirInterra?.texteLexique}
                {@html data.decouvrirInterra.texteLexique}
              {:else}
                <p class="text-red-500">Erreur : Texte lexique non disponible</p>
              {/if}
            </div>
          </article>

          <!-- Section Nos Partenaires -->
          <article class="w-10/12 py-5 md:py-20 m-auto" id="partenaires">
            <h1 class="font-black text-4xl mb-10 text-vert-interra bg-white text-center">
              {data.decouvrirInterra?.titreNosPartenaires || 'Nos partenaires'}
            </h1>
            <div>
              <figure>
                {#if data.decouvrirInterra?.imagesNosPartenaires && data.decouvrirInterra.imagesNosPartenaires.length > 0}
                  <ul class="flex flex-col flex-wrap md:grid grid-cols-6 md:gap-x-10 gap-y-5 md:gap-y-10">
                    {#each data.decouvrirInterra.imagesNosPartenaires as image}
                      <li class="place-self-center">
                        <a href={(image.customData && image.customData.url) ? image.customData.url : image.url} rel="noreferrer" target="_blank">
                          <figure class="md:w-12/12 w-1/2 m-auto mb-8 md:m-0">
                            <img src={image.url} alt={image.alt || 'Partenaire Interra'} class="w-full" />
                          </figure>
                        </a>
                      </li>
                    {/each}
                  </ul>
                {:else}
                  <div class="text-center p-8 bg-gray-100">
                    <p class="text-red-500">Erreur : Images partenaires non disponibles</p>
                  </div>
                {/if}
              </figure>
            </div>
          </article>
        </div>
      {/if}
    </main>
  </section>
  
  <Footer />
</div>