<script lang="ts">
  import type { PageData } from './$types';
  import Footer from '$lib/components/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';

  export let data: PageData;
</script>

<svelte:head>
  <title>Former un duo - INTERRA</title>
  <meta name="description" content="Formez un duo interculturel et créez des liens avec notre communauté." />
</svelte:head>

<div class="min-h-screen flex flex-col h-screen">
  <section class="fullheader w-12/12 m-auto fixed bg-white z-50 font-sans">
    <Navbar />
  </section>
  
  <section class="w-12/12 mt-24 md:mt-0 m-auto font-sans">
    <main class="flex-1 md:mt-52">
      <div class="mt-10 w-12/12">
        <h1 class="font-black text-4xl text-vert-interra bg-white text-center">
          {data?.agirAvecNou?.titreDuoLangue || 'Former un duo'}
        </h1>

        <article class="w-10/12 md:w-1/2 mt-10 border p-5 rounded border-orange-interra m-auto">
          <form name="inscription duo" method="post" data-netlify="true" data-netlify-honeypot="bot-field" class="flex flex-col gap-5">
            <input type="hidden" name="form-name" value="inscription duo" />

            <div class="flex flex-col gap-2">
              <label class="text-orange-interra font-bold text-lg">Nom</label>
              <input 
                type="text" 
                name="nom" 
                id="nom" 
                class="border bg-gray-200 hover:bg-white focus:outline focus:outline-orange-interra p-2"
                required
              />  
            </div>
            
            <div class="flex flex-col gap-2">
              <label class="text-orange-interra font-bold text-lg">Prénom</label>
              <input 
                type="text"  
                name="prenom" 
                id="prenom" 
                class="border bg-gray-200 hover:bg-white focus:outline focus:outline-orange-interra p-2"
                required
              />  
            </div>
            
            <div class="flex flex-col gap-2">
              <label class="text-orange-interra font-bold text-lg">Téléphone</label>
              <input 
                type="text"  
                name="telephone" 
                id="telephone" 
                class="border bg-gray-200 hover:bg-white focus:outline focus:outline-orange-interra p-2"
                required
              />  
            </div>
            
            <div class="flex flex-col gap-2">
              <label class="text-orange-interra font-bold text-lg">Mail</label>
              <input 
                type="email"  
                name="mail" 
                id="mail"  
                class="border bg-gray-200 hover:bg-white focus:outline focus:outline-orange-interra p-2"
                required
              />  
            </div>
          
            <fieldset class="flex flex-col gap-2">
              <legend class="mb-2 text-lg">Je suis:</legend>

              <div>
                <input type="radio" id="primo-arrivante" name="jesuis" value="primo-arrivant(e)" class="mr-2" required />
                <label for="primo-arrivante">Une personne "nouvellement arrivée en Wallonie" (tu ne te sens pas toujours inclus.e dans la société, tu as besoin de mieux connaitre le français, tu as peu de réseau...)</label>
              </div>

              <div>
                <input type="radio" id="locale" name="jesuis" value="locale" class="mr-2"/>
                <label for="locale">Une personne "locale" (tu te sens inclus.e dans la société, tu as une bonne connaissance du français et tu disposes d'un réseau social suffisant)</label>
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