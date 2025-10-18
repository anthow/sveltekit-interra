<script lang="ts">
  import type { PageData } from './$types';
  import Footer from '$lib/components/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';

  export let data: PageData;
</script>

<svelte:head>
  <title>Contact - INTERRA</title>
  <meta name="description" content="Contactez l'équipe d'INTERRA pour toute question ou information." />
</svelte:head>

<div class="min-h-screen flex flex-col h-screen">
  <section class="fullheader w-12/12 m-auto fixed bg-white z-50 font-sans">
    <Navbar />
  </section>
  
  <section class="w-12/12 mt-24 md:mt-0 m-auto font-sans">
    <main class="flex-1 md:mt-52">
      <div class="w-10/12 m-auto">
        <article class="mt-10 flex flex-col space-y-20 m-auto">
          <h1 class="font-black text-4xl text-vert-interra bg-white text-center">Contact</h1>
          
          <!-- Section Personnes de contact -->
          <section class="md:grid grid-cols-4 items-start gap-x-10 gap-y-20">
            {#if data?.allPersonneContacts && data.allPersonneContacts.length > 0}
              {#each data.allPersonneContacts as personne}
                <div class="flex flex-col">
                  {#if personne.photo?.url}
                    <img 
                      src={personne.photo.url} 
                      alt={personne.photo.alt || personne.nomPrNom} 
                      class="m-auto"
                    />
                  {:else}
                    <div class="m-auto w-64 h-64 bg-gray-200 flex items-center justify-center">
                      <p class="text-gray-500">Photo non disponible</p>
                    </div>
                  {/if}
                  
                  <div>
                    <h2 class="font-black text-lg mt-2 text-vert-interra text-center">
                      {personne.nomPrNom}
                    </h2>
                    <h3 class="font-black text-m text-orange-interra text-center">
                      {personne.fonction}
                    </h3>
                    <p class="mt-2 text-center">
                      {personne.adresseMail}<br />
                      {personne.numRoDeTLPhone}
                    </p>
                  </div>
                </div>
              {/each}
            {:else}
              <div class="col-span-4 text-center">
                <p class="text-gray-500">Aucune personne de contact disponible</p>
              </div>
            {/if}
          </section>

          <!-- Section Formulaire de contact -->
          <h1 class="font-black text-3xl text-center text-orange-interra mb-10">Nous contacter</h1>
          <div class="mt-10 sm:mt-0">
            <div class="mt-5 md:mt-0 md:col-span-2">
              <form name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field" class="flex flex-col gap-5">
                <input type="hidden" name="form-name" value="contact" />

                <div class="overflow-hidden">
                  <div class="px-4 py-5 bg-white sm:p-6">
                    <div class="grid grid-cols-6 gap-6">
                      <div class="col-span-6 sm:col-span-3">
                        <label for="first-name" class="block text-sm font-medium text-gray-700">
                          Prénom
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          autocomplete="given-name"
                          class="mt-1 border focus:ring-vert-500 focus:border-vert-interra block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-3">
                        <label for="last-name" class="block text-sm font-medium text-gray-700">
                          Nom
                        </label>
                        <input
                          type="text"
                          name="last-name"
                          id="last-name"
                          autocomplete="family-name"
                          class="mt-1 border focus:ring-vert-interra focus:border-vert-interra block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-6">
                        <label for="email-address" class="block text-sm font-medium text-gray-700">
                          Adresse mail
                        </label>
                        <input
                          type="email"
                          name="email-address"
                          id="email-address"
                          autocomplete="email"
                          class="mt-1 border focus:ring-vert-interra focus:border-vert-interra block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-6">
                        <label for="phone-number" class="block text-sm font-medium text-gray-700">
                          Numéro de téléphone
                        </label>
                        <input
                          type="tel"
                          name="phone-number"
                          id="phone-number"
                          autocomplete="tel"
                          class="mt-1 border focus:ring-vert-interra focus:border-vert-interra block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                        />
                      </div>
                    </div>

                    <div class="col-span-6 sm:col-span-4 mt-10">
                      <label for="message" class="block mb-2 text-sm font-medium text-gray-700">
                        Message
                      </label>
                      <textarea 
                        name="message"
                        id="message"
                        class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-vert-interra focus:border-vert-interra" 
                        rows="4"
                      ></textarea>
                    </div>
                  </div>
                  <div class="px-4 sm:px-6">
                    <button
                      type="submit"
                      class="bg-vert-interra text-white text-center md:font-black md:w-auto m-auto mb-2 md:mb-0 p-2 hover:opacity-70 rounded"
                    >
                      Envoyer
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <!-- Carte Google Maps -->
          <iframe 
            title="maps" 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1264.9645310757742!2d5.5797528516939625!3d50.647008579961884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c0fb168a534c71%3A0x92e757af419bc5b!2sInterra!5e0!3m2!1sfr!2sbe!4v1643196795125!5m2!1sfr!2sbe" 
            class="w-12/12" 
            height="600" 
            allowfullscreen="" 
            loading="lazy"
          ></iframe>
        </article>
      </div>
    </main>
  </section>
  
  <Footer />
</div>