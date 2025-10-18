<script lang="ts">
  import type { PageData } from './$types';
  import Footer from '$lib/components/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';

  export let data: PageData;
</script>

<svelte:head>
  <title>Duo2Change - INTERRA</title>
  <meta name="description" content="Découvrez Duo2Change, notre programme de mentorat qui crée des duos entre personnes récemment arrivées et habitants de Liège." />
</svelte:head>

<div class="min-h-screen flex flex-col h-screen">
  <section class="fullheader w-12/12 m-auto fixed bg-white z-50 font-sans">
    <Navbar />
  </section>
  
  <section class="w-12/12 mt-24 md:mt-0 m-auto font-sans">
    <main class="flex-1 md:mt-52">
      {#if !data?.duoLangue}
        <div class="text-center p-8">
          <p class="text-red-500">Erreur lors du chargement des données</p>
        </div>
      {:else}
        <div class="w-12/12">
          <article class="md:w-10/12  mt-2   m-auto">
            <h1 class="font-black text-4xl mb-10 md:mb-20 text-jaune-interra  bg-white text-center">
              {data.duoLangue?.titre || 'Duo2Change'}
            </h1>
            
            <section class="md:grid grid-cols-2  gap-x-10 gap-y-20">
              <video controls class="w-full px-10 mb-10 md:mb-0">
                {#if data.duoLangue?.videoKSako?.video?.mp4Url}
                  <source src={data.duoLangue.videoKSako.video.mp4Url} type="video/mp4" />
                {:else}
                  <source src="/videos/duo2change-intro.mp4" type="video/mp4" />
                {/if}
                Votre navigateur ne supporte pas la lecture vidéo.
              </video>
              <div class="w-10/12 md:w-12/12 m-auto">
                <h2 class="font-black text-2xl mb-5 text-jaune-interra">
                  {data.duoLangue?.titreKSako || 'Qu\'est-ce que Duo2Change ?'}
                </h2>
                <div class="mb-10">
                  {#if data.duoLangue?.texteKSako}
                    {@html data.duoLangue.texteKSako}
                  {:else}
                    <p>Duo2Change est un programme de mentorat innovant qui crée des duos entre personnes récemment arrivées en terre liégeoise et habitants de la région.</p>
                  {/if}
                </div>
                <h2 class="font-black text-2xl mb-5 text-jaune-interra">
                  {data.duoLangue?.titrePourQui || 'Pour qui ?'}
                </h2>
                <div class="">
                  {#if data.duoLangue?.textePourQui}
                    {@html data.duoLangue.textePourQui}
                  {:else}
                    <p>Ce programme s'adresse à toutes les personnes qui souhaitent créer du lien, partager leurs expériences et contribuer à une société plus inclusive.</p>
                  {/if}
                </div>
              </div>
            </section>

            <h2 class="font-black w-10/12 md:w-12/12 m-auto  text-3xl md:text-4xl my-10 md:my-20 text-jaune-interra  bg-white text-center">
              {data.duoLangue?.titreRoleInterra || 'Le rôle d\'Interra'}
            </h2>
            
            <section class="md:grid grid-cols-2 flex flex-col  md:gap-y-20 mb-20">
              <div class="bg-jaune-interra text-white p-5  list-duo order-2 md:order-1">
                {#if data.duoLangue?.listeRoleInterra}
                  {@html data.duoLangue.listeRoleInterra}
                {:else}
                  <div class="paragraphe">
                    <h3 class="font-black text-xl mb-4 text-white">Notre mission</h3>
                    <p>Interra facilite la mise en relation et accompagne les duos tout au long de leur parcours.</p>
                    <ul class="list-disc ml-6 mt-4">
                      <li>Mise en relation personnalisée</li>
                      <li>Accompagnement et suivi</li>
                      <li>Formation et outils</li>
                      <li>Communauté de soutien</li>
                    </ul>
                  </div>
                {/if}
              </div>
              <figure class="h-full order-1 md:order-2">
                {#if data.duoLangue?.imageRoleInterra?.url}
                  <img src={data.duoLangue.imageRoleInterra.url} alt={data.duoLangue.imageRoleInterra.alt || 'Rôle d\'Interra'} class="h-full w-full object-cover" />
                {:else}
                  <img src="/images/role-interra.jpg" alt="Rôle d'Interra" class="w-full h-auto" />
                {/if}
              </figure>
            </section>

            <section class="md:grid grid-cols-2  gap-x-10 gap-y-10 md:gap-y-20  w-10/12 m-auto">
              <div>
                <h2 class="font-black text-2xl mb-5 text-jaune-interra">
                  {data.duoLangue?.titreVotreImplication || 'Votre implication'}
                </h2>
                <div>
                  {#if data.duoLangue?.texteVotreImplication}
                    {@html data.duoLangue.texteVotreImplication}
                  {:else}
                    <p>En participant à Duo2Change, vous contribuez activement à l'intégration et à la cohésion sociale.</p>
                  {/if}
                </div>
              </div>

              <div class="mt-10 md:mt-0">
                <h2 class="font-black text-2xl mb-5 text-jaune-interra">
                  {data.duoLangue?.titreFinDImplication || 'Fin de l\'implication'}
                </h2>
                <div>
                  {#if data.duoLangue?.texteFinDImplication}
                    {@html data.duoLangue.texteFinDImplication}
                  {:else}
                    <p>Même après la fin officielle du programme, les liens créés perdurent et continuent à enrichir la communauté.</p>
                  {/if}
                </div>
              </div>
            </section>
          </article>
        </div>
      {/if}
    </main>
  </section>
  
  <Footer />
</div>