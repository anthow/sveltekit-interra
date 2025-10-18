<script lang="ts">
  import { page } from '$app/stores';
  import Footer from '$lib/components/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  
  $: status = $page.status;
  $: message = $page.error?.message;
</script>

<svelte:head>
  <title>Page non trouvée - INTERRA</title>
  <meta name="description" content="La page que vous recherchez n'existe pas." />
</svelte:head>

<div class="min-h-screen flex flex-col h-screen">
  <section class="fullheader w-12/12 m-auto fixed bg-white z-50 font-sans">
    <Navbar />
  </section>
  
  <section class="w-12/12 mt-24 md:mt-0 m-auto font-sans">
    <main class="flex-1 md:mt-52">
      <div class="w-10/12 m-auto mt-10 text-center">
        <h1 class="font-black text-6xl md:text-8xl text-vert-interra mb-10">
          404
        </h1>
        
        <h2 class="font-black text-3xl md:text-4xl text-vert-interra mb-10">
          Page non trouvée
        </h2>
        
        <p class="text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        
        <div class="flex flex-col md:flex-row gap-4 justify-center">
          <a href="/" class="btn-interra bg-vert-interra text-white hover:bg-green-800 px-8 py-4">
            Retour à l'accueil
          </a>
          <a href="/contact" class="btn-interra bg-orange-interra text-white hover:bg-orange-700 px-8 py-4">
            Nous contacter
          </a>
        </div>
        
        <div class="mt-16">
          <h3 class="font-bold text-xl mb-6 text-vert-interra">Pages populaires :</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <a href="/decouvrir-interra" class="p-4 border border-vert-interra rounded-lg hover:bg-vert-interra hover:text-white transition-colors">
              <h4 class="font-bold mb-2">Découvrir Interra</h4>
              <p class="text-sm">Notre mission et nos valeurs</p>
            </a>
            <a href="/projets" class="p-4 border border-orange-interra rounded-lg hover:bg-orange-interra hover:text-white transition-colors">
              <h4 class="font-bold mb-2">Nos projets</h4>
              <p class="text-sm">Découvrez nos activités</p>
            </a>
            <a href="/agir-avec-nous" class="p-4 border border-jaune-interra rounded-lg hover:bg-jaune-interra hover:text-black transition-colors">
              <h4 class="font-bold mb-2">Agir avec nous</h4>
              <p class="text-sm">Rejoignez-nous</p>
            </a>
          </div>
        </div>
      </div>
    </main>
  </section>
  
  <!-- Footer -->
  <footer class="w-12/12 m-auto font-sans">
    <Footer />
  </footer>
</div>