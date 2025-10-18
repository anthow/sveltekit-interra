<script lang="ts">
  import type { PageData } from './$types';
  import Footer from '$lib/components/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';

  export let data: PageData;
</script>

<svelte:head>
  <title>Rejoindre InterLab - INTERRA</title>
  <meta name="description" content="Rejoignez l'InterLab pour partager vos talents et votre expertise." />
</svelte:head>

<div class="min-h-screen flex flex-col h-screen">
  <section class="fullheader w-12/12 m-auto fixed bg-white z-50 font-sans">
    <Navbar />
  </section>
  
  <section class="w-12/12 mt-24 md:mt-0 m-auto font-sans">
    <main class="flex-1 md:mt-52">
      <div class="mt-10 w-12/12">
        <h1 class="font-black text-4xl text-vert-interra bg-white text-center">
          {data?.agirAvecNou?.titreTalent || 'Rejoindre InterLab'}
        </h1>

        <article class="mt-10 border p-5 rounded border-orange-interra m-auto max-w-2xl">
          <form action="https://formspree.io/f/mrgddwyw" method="post" class="flex flex-col gap-5">
            <div class="flex flex-col gap-2">
              <label for="nom" class="text-orange-interra font-bold text-lg">Nom</label>
              <input
                type="text"
                name="nom"
                id="nom"
                class="border bg-gray-200 hover:bg-white focus:outline focus:outline-orange-interra p-2"
                required
              />
            </div>
            
            <div class="flex flex-col gap-2">
              <label for="prenom" class="text-orange-interra font-bold text-lg">Prénom</label>
              <input
                type="text"
                name="prenom"
                id="prenom"
                class="border bg-gray-200 hover:bg-white focus:outline focus:outline-orange-interra p-2"
                required
              />
            </div>
            
            <div class="flex flex-col gap-2">
              <label for="telephone" class="text-orange-interra font-bold text-lg">Téléphone</label>
              <input
                type="text"
                name="telephone"
                id="telephone"
                class="border bg-gray-200 hover:bg-white focus:outline focus:outline-orange-interra p-2"
              />
            </div>
            
            <div class="flex flex-col gap-2">
              <label for="mail" class="text-orange-interra font-bold text-lg">Mail</label>
              <input
                type="email"
                name="mail"
                id="mail"
                class="border bg-gray-200 hover:bg-white focus:outline focus:outline-orange-interra p-2"
                required
              />
            </div>

            <fieldset class="flex flex-col gap-2">
              <legend class="mb-2 text-lg">Je souhaite:</legend>

              <div>
                <input
                  type="radio"
                  id="entrepreneur"
                  name="jesouhaite"
                  value="entrepreneur"
                  class="mr-2"
                  required
                />
                <label for="entrepreneur">
                  Je souhaite être accompagné par l'InterLab en vue de lancer un projet entrepreneurial
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  id="coach"
                  name="jesouhaite"
                  value="coach"
                  class="mr-2"
                />
                <label for="coach">
                  Je souhaite rejoindre l'InterLab en tant que coach/expert
                </label>
              </div>
            </fieldset>

            <input
              type="submit"
              value="Envoyer"
              class="text-white bg-vert-interra font-black p-2 rounded hover:bg-white hover:text-vert-interra hover:border-vert-interra border w-min"
            />
          </form>
        </article>
      </div>
    </main>
  </section>
  
  <Footer />
</div>