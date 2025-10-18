<script lang="ts">
  import type { PageData } from './$types';
  import Footer from '$lib/components/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';

  export let data: PageData;
</script>

<svelte:head>
  <title>Devenir volontaire - INTERRA</title>
  <meta name="description" content="Devenez volontaire et engagez-vous avec INTERRA." />
</svelte:head>

<div class="min-h-screen flex flex-col h-screen">
  <section class="fullheader w-12/12 m-auto fixed bg-white z-50 font-sans">
    <Navbar />
  </section>
  
  <section class="w-12/12 mt-24 md:mt-0 m-auto font-sans">
    <main class="flex-1 md:mt-52">
      <div class="mt-10 w-12/12">
        <h1 class="font-black text-4xl text-vert-interra bg-white text-center">
          {data?.agirAvecNou?.titreBNVole || 'Devenir volontaire'}
        </h1>

        <article class="mt-10 border p-5 rounded border-orange-interra m-auto max-w-2xl">
          <form name="volontaire" method="post" data-netlify="true" data-netlify-honeypot="bot-field" class="flex flex-col gap-5">
            <input type="hidden" name="form-name" value="volontaire duo" />
            
            <div class="flex flex-col gap-5">
              <label for="nom" class="text-orange-interra font-bold text-lg">Nom</label>
              <input
                type="text"
                name="nom"
                id="nom"
                class="border bg-gray-200 hover:bg-white focus:outline focus:outline-orange-interra p-2"
                required
              />
            </div>
            
            <div class="flex flex-col gap-5">
              <label for="prenom" class="text-orange-interra font-bold text-lg">Prénom</label>
              <input
                type="text"
                name="prenom"
                id="prenom"
                class="border bg-gray-200 hover:bg-white focus:outline focus:outline-orange-interra p-2"
                required
              />
            </div>
            
            <div class="flex flex-col gap-5">
              <label for="telephone" class="text-orange-interra font-bold text-lg">Téléphone</label>
              <input
                type="text"
                name="telephone"
                id="telephone"
                class="border bg-gray-200 hover:bg-white focus:outline focus:outline-orange-interra p-2"
              />
            </div>
            
            <div class="flex flex-col gap-5">
              <label for="mail" class="text-orange-interra font-bold text-lg">Mail</label>
              <input
                type="email"
                name="mail"
                id="mail"
                class="border bg-gray-200 hover:bg-white focus:outline focus:outline-orange-interra p-2"
                required
              />
            </div>
            
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