<script lang="ts">
import type { PageData } from './$types';
import Information from '$lib/components/Information.svelte';
import SliderHome from '$lib/components/SliderHome.svelte';
import Footer from '$lib/components/Footer.svelte';
import Navbar from '$lib/components/Navbar.svelte';
import SEO from '$lib/components/SEO.svelte';
import { pageSEOConfigs } from '$lib/seo';

export let data: PageData;
</script>

<SEO config={pageSEOConfigs['/']} />

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
        <!-- Section Hero -->
        <section class="w-10/12 flex flex-col pt-4 md:pt-0 content-center m-auto md:grid grid-cols-3 gap-x-20 mb-10">
          <article class="order-2 md:order-1 flex flex-col space-y-4 md:space-y-10 self-center md:mb-0">
            <h1 class="text-2xl text-vert-interra md:text-5xl font-black">
              {data.accueil?.titreHeader || 'Erreur : Titre non disponible'}
            </h1>
            <div>
              {#if data.accueil?.texteHeader}
                {@html data.accueil.texteHeader}
              {:else}
                <p class="text-red-500">Erreur : Texte d'accueil non disponible</p>
              {/if}
            </div>
          </article>
          <figure class="order-1 col-span-2 mb-5 md:mb-0 md-order-2 hidden md:block">
            {#if data.accueil?.imagesHeader && data.accueil.imagesHeader.length > 0}
              <SliderHome images={data.accueil.imagesHeader} />
            {:else}
              <div class="text-center p-8 bg-gray-100">
                <p class="text-red-500">Erreur : Images du slider non disponibles</p>
              </div>
            {/if}
          </figure>
          <figure class="order-1 col-span-2 mb-5 md:mb-0 md-order-2 md:hidden">
            {#if data.accueil?.imagesHeader && data.accueil.imagesHeader.length > 0}
              <img src={data.accueil.imagesHeader[0].url} alt={data.accueil.imagesHeader[0].alt || "Image d'accueil"} class="w-full h-auto" />
            {:else}
              <div class="text-center p-8 bg-gray-100">
                <p class="text-red-500">Erreur : Image mobile non disponible</p>
              </div>
            {/if}
          </figure>
        </section>

        <!-- Section verte -->
        <section class="bg-vert-interra mt-10">
          <div class="w-10/12 m-auto py-20 md:grid grid-cols-5 gap-x-20">
            {#if data?.accueil?.imagePartieDeux}
              <img src={data.accueil.imagePartieDeux.url} alt={data.accueil.imagePartieDeux.alt} class="w-full col-span-2" />
            {:else}
              <div class="col-span-2 text-center p-8 bg-gray-100">
                <p class="text-red-500">Erreur : Image de la mission non disponible</p>
              </div>
            {/if}

            <article class="col-span-3 md:w-10/12 m-auto">
            <h2 class="text-2xl md:text-4xl font-normal text-white text-center my-5 md:mt-0 mb-5">
              {data?.accueil?.titrePartieDeux || 'Erreur : Titre mission non disponible'}
            </h2>
              <div>
                {#if data?.accueil?.textePartieDeux}
                  {@html data.accueil.textePartieDeux}
                {:else}
                  <p class="text-red-500">Erreur : Texte de la mission non disponible</p>
                {/if}
              </div>

              <a href="/decouvrir-interra">
                <button class="mt-5 text-orange-interra bg-white font-black p-1 px-2 rounded hover:bg-orange-interra hover:text-white">
                  Découvrir Interra
                </button>
              </a>
            </article>
          </div>
        </section>

        <!-- Section L'histoire de ... -->
        <section class="md:bg-vert-interra pb-10 md:pb-0">
          <div class="w-10/12 md:pb-20 mt-10 md:mt-0 m-auto">
            <h2 class="text-2xl md:text-4xl font-normal text-white text-center my-5 md:mt-0 mb-5">
              L'histoire de ...
            </h2>
          </div>
        </section>
        <section class="pb-5 md:pb-0">
          <div class="w-10/12 m-auto">
            <div class="md:grid grid-cols-3 gap-x-5">
              <figure class="md:relative md:bottom-20">
                {#if data?.accueil?.imageHistoireDe}
                  <img src={data.accueil.imageHistoireDe.url} alt={data.accueil.imageHistoireDe.alt} class="w-full h-auto" />
                {:else}
                  <div class="text-center p-8 bg-gray-100">
                    <p class="text-red-500">Erreur : Image histoire non disponible</p>
                  </div>
                {/if}
              </figure>
              
              <article class="self-center flex flex-col justify-center">
                <div class="px-2 my-5 md:my text-center">
                  {#if data?.histoireDe?.textePageDAccueil}
                    {@html data.histoireDe.textePageDAccueil}
                  {:else}
                    <p class="text-red-500">Erreur : Texte histoire non disponible</p>
                  {/if}
                </div>
                
                
                <a href="/histoires" class="w-max m-auto">
                  <button class="mt-5 mb-10 md:mb-0 text-white bg-orange-interra font-black p-1 px-2 rounded hover:bg-white-interra hover:text-orange-interra hover:bg-white border hover:border-orange-interra">
                    Voir toutes les histoires
                  </button>
                </a>
              </article>
              
              <figure class="md:relative md:bottom-20">
                {#if data?.histoireDe?.imageAccueil}
                  <img src={data.histoireDe.imageAccueil.url} alt={data.histoireDe.imageAccueil.alt} class="w-full h-auto" />
                {:else}
                  <div class="text-center p-8 bg-gray-100">
                    <p class="text-red-500">Erreur : Image accueil histoire non disponible</p>
                  </div>
                {/if}
              </figure>
            </div>
          </div>
        </section>

        <!-- Section Actus / Événements -->
        <section class="w-10/12 m-auto">
          <h2 class="text-2xl md:text-4xl font-normal text-white text-center my-5 md:mt-0 mb-5">
            Actus / Événements
          </h2>
          <!-- Contenu des actualités masqué car les actus sont en false -->
        </section>

        <!-- Section Agir avec nous -->
        <section class="w-12/12 md:10/12 m-auto md:grid grid-cols-3 mt-10 md:mt-40 auto-cols-fr content-center">
          <div class="bg-orange-interra flex flex-col md:grid grid-cols-2 col-span-2 py-16">
            <article class="flex flex-col place-self-center order-2 px-10 md:px-0 py-5 md:pt-0">
              <h2 class="text-2xl md:text-4xl font-normal text-white text-center my-5 md:mt-0 mb-5">
                {data?.accueil?.titreAgirAvecNous || 'Erreur : Titre agir non disponible'}
              </h2>
              <div class="text-white md:pl-20">
                {#if data?.accueil?.texteAgirAvecNous}
                  {@html data.accueil.texteAgirAvecNous}
                {:else}
                  <p class="text-red-500">Erreur : Texte agir non disponible</p>
                {/if}
              </div>
            </article>
            <article class="place-self-center order-3 pb-5 md:pb-0">
              <ul class="flex flex-col gap-2 justify-self-right items-center m-auto content-center self-center">
                {#if data?.menu?.sousMenuAgirAvecNousDevenirTalent}
                  <li>
                    <a href="/agir-avec-nous/talent-interact">
                      <button class="text-white font-black border p-1 px-2 border-white rounded hover:bg-white hover:text-orange-interra">
                        {data.menu.sousMenuAgirAvecNousDevenirTalent}
                      </button>
                    </a>
                  </li>
                {/if}
                {#if data?.menu?.sousMenuAgirAvecNousFormerUnduo}
                  <li>
                    <a href="/agir-avec-nous/former-duo">
                      <button class="text-white font-black border p-1 px-2 border-white rounded hover:bg-white hover:text-orange-interra">
                        {data.menu.sousMenuAgirAvecNousFormerUnduo}
                      </button>
                    </a>
                  </li>
                {/if}
                {#if data?.menu?.sousMenuAgirAvecNousDevenirCoah}
                  <li>
                    <a href="/agir-avec-nous/interlab">
                      <button class="text-white font-black border p-1 px-2 border-white rounded hover:bg-white hover:text-orange-interra">
                        {data.menu.sousMenuAgirAvecNousDevenirCoah}
                      </button>
                    </a>
                  </li>
                {/if}
                {#if data?.menu?.sousMenuAgirAvecNousParticiperFormation}
                  <li>
                    <a href="/agir-avec-nous/participer-formation">
                      <button class="text-white font-black border p-1 px-2 border-white rounded hover:bg-white hover:text-orange-interra">
                        {data.menu.sousMenuAgirAvecNousParticiperFormation}
                      </button>
                    </a>
                  </li>
                {/if}
                {#if data?.menu?.sousMenuAgirAvecNousDevenirVolontaire}
                  <li>
                    <a href="/agir-avec-nous/devenir-volontaire">
                      <button class="text-white font-black border p-1 px-2 border-white rounded hover:bg-white hover:text-orange-interra">
                        {data.menu.sousMenuAgirAvecNousDevenirVolontaire}
                      </button>
                    </a>
                  </li>
                {/if}
                {#if data?.menu?.sousMenuAgirAvecNousFaireDon}
                  <li>
                    <a href="/agir-avec-nous/#don">
                      <button class="text-white font-black border p-1 px-2 border-white rounded hover:bg-white hover:text-orange-interra">
                        {data.menu.sousMenuAgirAvecNousFaireDon}
                      </button>
                    </a>
                  </li>
                {/if}
              </ul>
            </article>
          </div>
          <article>
            <figure class="md:relative mt-10 md:mt-0 m-auto md:bottom-20 right-20 mb-10 md:mb-0 w-10/12 md:w-12/12">
              {#if data?.accueil?.imageAgirAvecNous}
                <img src={data.accueil.imageAgirAvecNous.url} alt={data.accueil.imageAgirAvecNous.alt} class="order-1 w-full h-auto" />
              {:else}
                <div class="text-center p-8 bg-gray-100">
                  <p class="text-red-500">Erreur : Image agir avec nous non disponible</p>
                </div>
              {/if}
            </figure>
          </article>
        </section>
      {/if}
    </main>
  </section>
  
  <!-- Footer -->
  <footer class="w-12/12 m-auto font-sans">
    <Footer />
  </footer>
</div>