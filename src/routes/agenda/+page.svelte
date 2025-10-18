<script lang="ts">
  import Footer from '$lib/components/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
</script>

<svelte:head>
  <title>Agenda - INTERRA</title>
  <meta name="description" content="Découvrez nos prochains événements et activités." />
</svelte:head>

<div class="min-h-screen flex flex-col h-screen">
  <section class="fullheader w-12/12 m-auto fixed bg-white z-50 font-sans">
    <Navbar />
  </section>
  
  <section class="w-12/12 mt-24 md:mt-0 m-auto font-sans">
    <main class="flex-1 md:mt-52">
      <div class="w-10/12 m-auto mt-10">
        <h1 class="font-black text-4xl text-vert-interra bg-white text-center mb-10">
          Agenda
        </h1>

        <div class="bg-orange-100 border-l-4 border-orange-500 p-4 mb-8">
          <p class="text-lg font-semibold text-orange-800 mb-4">
            Nos prochains événements
          </p>
          <p class="text-orange-700">
            Découvrez nos prochains événements, formations et activités. Restez informé de nos actualités !
          </p>
        </div>

        <div class="paragraphe mb-8">
          <p class="mb-4">
            Nous organisons régulièrement des événements, des formations et des activités pour favoriser l'interaction entre les personnes récemment arrivées en terre liégeoise et la population locale.
          </p>
          <p class="mb-4">
            Pour être tenu au courant de nos prochains événements, n'hésitez pas à nous suivre sur nos réseaux sociaux ou à vous abonner à notre newsletter.
          </p>
        </div>

        <div class="text-center">
          <a href="/newsletter" class="inline-block mr-4">
            <button class="bg-vert-interra text-white font-black p-3 px-6 rounded hover:bg-white hover:text-vert-interra hover:border-vert-interra border-2 border-vert-interra transition-colors duration-200">
              S'abonner à la newsletter
            </button>
          </a>
          <a href="https://www.facebook.com/InterraCult" target="_blank" rel="noreferrer" class="inline-block mr-4">
            <button class="bg-blue-600 text-white font-black p-3 px-6 rounded hover:bg-white hover:text-blue-600 hover:border-blue-600 border-2 border-blue-600 transition-colors duration-200">
              Suivre sur Facebook
            </button>
          </a>
          <a href="/contact" class="inline-block">
            <button class="bg-orange-interra text-white font-black p-3 px-6 rounded hover:bg-white hover:text-orange-interra hover:border-orange-interra border-2 border-orange-interra transition-colors duration-200">
              Nous contacter
            </button>
          </a>
        </div>
      </div>
    </main>
  </section>
  
  <!-- Footer -->
  <footer class="w-12/12 m-auto font-sans">
    <Footer />
  </footer>
</div>
