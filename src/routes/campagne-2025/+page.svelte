<script lang="ts">
  import Footer from '$lib/components/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
</script>

<svelte:head>
  <title>Interra a besoin de vous - INTERRA</title>
  <meta name="description" content="Interra a besoin de votre soutien pour continuer ses activités." />
</svelte:head>

<div class="min-h-screen flex flex-col h-screen">
  <section class="fullheader w-12/12 m-auto fixed bg-white z-50 font-sans">
    <Navbar />
  </section>
  
  <section class="w-12/12 mt-24 md:mt-0 m-auto font-sans">
    <main class="flex-1 md:mt-52">
      <div class="max-w-4xl mx-auto px-8 py-12 text-center">
        <h1 class="text-4xl font-bold mb-8 text-gray-800">
          Interra a besoin de vous !
        </h1>
        
        <p class="text-lg mb-8 leading-relaxed text-gray-700">
          Interra est une association liégeoise créatrice de liens entre les personnes nouvellement arrivées à Liège et les personnes locales via la valorisation de leurs talents, passions et savoir-faire.
        </p>
        
        <div class="mb-8">
          <img 
            src="https://res.cloudinary.com/anthow/image/upload/v1751374235/Onglet_Soutenez-nous_1_frrbbp.png"
            alt="Merci de nous soutenir !"
            class="rounded-lg shadow-lg mx-auto"
          />
        </div>
        
        <p class="text-lg mb-6 leading-relaxed text-gray-700">
          Suite à la perte de nombreux subsides,
          l'équipe est en chômage économique temporaire, et <span class="font-bold text-red-600">la structure dans son ensemble risque de disparaitre.</span>
        </p>
        
        <p class="text-lg mb-8 leading-relaxed text-gray-700">
          C'est pourquoi nous lançons cette campagne de financement participatif pour continuer à créer du lien et de la cohésion sociale à Liège.
        </p>
        
        <div class="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-8">
          <p class="text-lg font-semibold text-yellow-800">
            Votre soutien nous permettra de :
          </p>
          <ul class="text-left mt-4 space-y-2 text-yellow-700">
            <li>• Maintenir nos activités d'accueil et d'accompagnement</li>
            <li>• Continuer nos ateliers InterAct</li>
            <li>• Développer nos projets d'insertion sociale</li>
            <li>• Préserver justice sociale et vivre-ensemble à Liège</li>
          </ul>
        </div>
        
        <div class="space-y-4">
          <a 
            href="https://www.leetchi.com/c/interra-asbl" 
            target="_blank" 
            rel="noopener noreferrer"
            class="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors duration-200"
          >
            💚 Soutenir Interra maintenant
          </a>
          
          <p class="text-sm text-gray-600 mt-4">
            Ou par virement : BE65 1030 6350 8796
          </p>
        </div>
      </div>
    </main>
  </section>
  
  <!-- Footer -->
  <footer class="w-12/12 m-auto font-sans">
    <Footer />
  </footer>
</div>