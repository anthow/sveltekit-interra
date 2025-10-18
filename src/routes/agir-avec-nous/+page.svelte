<script lang="ts">
  import type { PageData } from './$types';
  import Footer from '$lib/components/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';

  export let data: PageData;
</script>

<svelte:head>
  <title>Agir avec nous - INTERRA</title>
  <meta name="description" content="Découvrez toutes les façons d'agir avec INTERRA : devenir membre, former un duo, rejoindre l'InterLab, participer à une formation ou devenir volontaire." />
</svelte:head>

<div class="min-h-screen flex flex-col h-screen">
  <section class="fullheader w-12/12 m-auto fixed bg-white z-50 font-sans">
    <Navbar />
  </section>
  
  <section class="w-12/12 mt-24 md:mt-0 m-auto font-sans">
    <main class="flex-1 md:mt-52">
      {#if !data?.agirAvecNou}
        <div class="text-center p-8">
          <p class="text-red-500">Erreur lors du chargement des données</p>
        </div>
      {:else}
        <div class="w-12/12">
          <h1 class="font-black text-4xl mb-2 text-vert-interra bg-white text-center mb-10" id="Talent">
            Agir avec nous
          </h1>

          <article class="md:w-8/12 flex flex-col md:space-y-20 m-auto mb-20">
            <div id="membre"></div>

            <!-- Section Membre -->
            <section class="bg-orange-interra flex flex-col md:flex-row justify-around min-h-[400px]">
              <figure class="h-full flex-1">
                {#if data.agirAvecNou?.imageMembre?.url}
                  <img 
                    src={data.agirAvecNou.imageMembre.url} 
                    alt={data.agirAvecNou.imageMembre.alt || 'Devenir membre'} 
                    class="w-full h-full object-cover"
                  />
                {:else}
                  <div class="w-full h-full bg-gray-300 flex items-center justify-center">
                    <p class="text-gray-600">Image non disponible</p>
                  </div>
                {/if}
              </figure>

              <div class="p-10 flex-1 flex flex-col justify-center">
                <h2 class="mb-2 mb-10 text-white font-semibold text-3xl">
                  {data.agirAvecNou?.titreMembre || 'Devenir membre'}
                </h2>
                <div>
                  {#if data.agirAvecNou?.texteMembre}
                    {@html data.agirAvecNou.texteMembre}
                  {:else}
                    <p class="text-white">Rejoignez notre communauté et participez à nos activités.</p>
                  {/if}
                </div>
                <p class="mt-10 text-white font-black">
                  {data.agirAvecNou?.accrocheMembre || 'Venez nous rejoindre !'}
                </p>
                <a href="/agir-avec-nous/talent-interact">
                  <button class="mt-10 bg-white text-orange-interra font-black p-2 hover:opacity-90">
                    Devenir Talent InterAct
                  </button>
                </a>
              </div>
            </section>

            <div id="duo"></div>

            <!-- Section Duo -->
            <section class="bg-vert-interra flex flex-col md:flex-row justify-around min-h-[400px]">
              <div class="p-10 order-2 md:order-1 flex-1 flex flex-col justify-center">
                <h2 class="mb-2 mb-10 text-white font-semibold text-3xl">
                  {data.agirAvecNou?.titreDuoLangue || 'Former un duo'}
                </h2>
                <div>
                  {#if data.agirAvecNou?.texteDuoLangue}
                    {@html data.agirAvecNou.texteDuoLangue}
                  {:else}
                    <p class="text-white">Créez des liens interculturels en formant un duo.</p>
                  {/if}
                </div>
                <a href="/agir-avec-nous/former-duo">
                  <button class="mt-10 bg-white text-vert-interra font-black p-2 hover:opacity-90">
                    Former un duo
                  </button>
                </a>
              </div>

              <figure class="h-full flex-1 order-1 md:order-2">
                {#if data.agirAvecNou?.imageDuoLange?.url}
                  <img 
                    src={data.agirAvecNou.imageDuoLange.url} 
                    alt={data.agirAvecNou.imageDuoLange.alt || 'Former un duo'} 
                    class="w-full h-full object-cover"
                  />
                {:else}
                  <div class="w-full h-full bg-gray-300 flex items-center justify-center">
                    <p class="text-gray-600">Image non disponible</p>
                  </div>
                {/if}
              </figure>
            </section>

            <div id="coach"></div>

            <!-- Section Talent -->
            <section class="bg-orange-interra flex flex-col md:flex-row justify-around min-h-[400px]">
              <figure class="h-full flex-1">
                {#if data.agirAvecNou?.imageTalent?.url}
                  <img 
                    src={data.agirAvecNou.imageTalent.url} 
                    alt={data.agirAvecNou.imageTalent.alt || 'Rejoindre InterLab'} 
                    class="w-full h-full object-cover"
                  />
                {:else}
                  <div class="w-full h-full bg-gray-300 flex items-center justify-center">
                    <p class="text-gray-600">Image non disponible</p>
                  </div>
                {/if}
              </figure>

              <div class="p-10 flex-1 flex flex-col justify-center">
                <h2 class="mb-2 mb-10 text-white font-semibold text-3xl">
                  {data.agirAvecNou?.titreTalent || 'Rejoindre InterLab'}
                </h2>
                <div>
                  {#if data.agirAvecNou?.texteTalent}
                    {@html data.agirAvecNou.texteTalent}
                  {:else}
                    <p class="text-white">Partagez vos talents et votre expertise.</p>
                  {/if}
                </div>
                <a href="/agir-avec-nous/interlab">
                  <button class="mt-10 bg-white text-orange-interra font-black p-2 hover:opacity-90">
                    Rejoindre l'InterLab
                  </button>
                </a>
              </div>
            </section>

            <div id="formation"></div>

            <!-- Section Formation -->
            <section class="bg-vert-interra flex flex-col md:flex-row justify-around min-h-[400px]">
              <div class="p-10 order-2 md:order-1 flex-1 flex flex-col justify-center">
                <h2 class="mb-2 mb-10 text-white font-semibold text-3xl">
                  {data.agirAvecNou?.titreParticiperFormation || 'Participer à une formation'}
                </h2>
                <div>
                  {#if data.agirAvecNou?.texteParticiperFormation}
                    {@html data.agirAvecNou.texteParticiperFormation}
                  {:else}
                    <p class="text-white">Développez vos compétences avec nos formations.</p>
                  {/if}
                </div>
                <a href="/agir-avec-nous/participer-formation">
                  <button class="mt-10 bg-white text-vert-interra font-black p-2 hover:opacity-90">
                    Participer à une formation
                  </button>
                </a>
              </div>

              <figure class="h-full flex-1 order-1 md:order-2">
                {#if data.agirAvecNou?.imageParticiperFormation?.url}
                  <img 
                    src={data.agirAvecNou.imageParticiperFormation.url} 
                    alt={data.agirAvecNou.imageParticiperFormation.alt || 'Formation'} 
                    class="w-full h-full object-cover"
                  />
                {:else}
                  <div class="w-full h-full bg-gray-300 flex items-center justify-center">
                    <p class="text-gray-600">Image non disponible</p>
                  </div>
                {/if}
              </figure>
            </section>

            <div id="volontaire"></div>

            <!-- Section Volontaire -->
            <section class="bg-orange-interra flex flex-col md:flex-row justify-around min-h-[400px]">
              <figure class="h-full flex-1">
                {#if data.agirAvecNou?.imageBNVole?.url}
                  <img 
                    src={data.agirAvecNou.imageBNVole.url} 
                    alt={data.agirAvecNou.imageBNVole.alt || 'Devenir volontaire'} 
                    class="w-full h-full object-cover"
                  />
                {:else}
                  <div class="w-full h-full bg-gray-300 flex items-center justify-center">
                    <p class="text-gray-600">Image non disponible</p>
                  </div>
                {/if}
              </figure>
              
              <div class="p-10 order-2 md:order-1 flex-1 flex flex-col justify-center">
                <h2 class="mb-2 mb-10 text-white font-semibold text-3xl">
                  {data.agirAvecNou?.titreBNVole || 'Devenir Volontaire'}
                </h2>
                <div>
                  {#if data.agirAvecNou?.texteBNVole}
                    {@html data.agirAvecNou.texteBNVole}
                  {:else}
                    <p class="text-white">Engagez-vous comme volontaire.</p>
                  {/if}
                </div>
                <a href="/agir-avec-nous/devenir-volontaire">
                  <button class="mt-10 bg-white text-orange-interra font-black p-2 hover:opacity-90">
                    Devenir Volontaire
                  </button>
                </a>
              </div>
            </section>

            <div id="don"></div>

            <!-- Section Don -->
            <section class="bg-vert-interra flex flex-col md:flex-row justify-around min-h-[400px]">
              <div class="p-10 pb-2 order-2 md:order-1 flex-1 flex flex-col justify-center">
                <h2 class="mb-10 text-white font-semibold text-3xl">
                  {data.agirAvecNou?.titreDon || 'Faire un don'}
                </h2>
                <div>
                  {#if data.agirAvecNou?.texteDon}
                    {@html data.agirAvecNou.texteDon}
                  {:else}
                    <p class="text-white">Soutenez nos actions par un don.</p>
                  {/if}
                </div>
                <p class="mt-10 text-white font-black">
                  {data.agirAvecNou?.numRoDeCompte || 'Numéro de compte à venir'}
                </p>
              </div>

              <figure class="h-full flex-1 order-1 md:order-2">
                {#if data.agirAvecNou?.imageDon?.url}
                  <img 
                    src={data.agirAvecNou.imageDon.url} 
                    alt={data.agirAvecNou.imageDon.alt || 'Faire un don'} 
                    class="w-full h-full object-cover"
                  />
                {:else}
                  <div class="w-full h-full bg-gray-300 flex items-center justify-center">
                    <p class="text-gray-600">Image non disponible</p>
                  </div>
                {/if}
              </figure>
            </section>
          </article>
        </div>
      {/if}
    </main>
  </section>
  
  <Footer />
</div>