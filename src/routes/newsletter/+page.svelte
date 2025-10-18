<script lang="ts">
  import Footer from '$lib/components/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
</script>

<svelte:head>
  <title>Newsletter - INTERRA</title>
  <meta name="description" content="Inscrivez-vous à la newsletter INTERRA pour rester informé de nos activités." />
</svelte:head>

<div class="min-h-screen flex flex-col h-screen">
  <section class="fullheader w-12/12 m-auto fixed bg-white z-50 font-sans">
    <Navbar />
  </section>
  
  <section class="w-12/12 mt-24 md:mt-0 m-auto font-sans">
    <main class="flex-1 md:mt-52">
      <div class="w-12/12">
        <article class="w-10/12 mt-10 m-auto">
          <h1 class="font-black text-4xl mb-5 text-vert-interra bg-white text-center">
            S'inscrire à la newsletter
          </h1>

          <iframe 
            width="650" 
            height="600" 
            title="formulaire d'inscription newsletter"
            src="https://ba8902f1.sibforms.com/serve/MUIEAElOt7Jd2tYVZmIH2_w9xPaLDAsjrblTglQbwy10fSXcz7TZdfiXIZLhVid-CgcexB9I1i5M6hpOQXBOBBE3MyTuRWdM-LIrfOfChOlB4MHEtYr4m9AVRJ0MIs-Gpj4zP-TG-mFA-G7Z95XQuGM5P9L17crIDNS9Ui4EpVsJ7fp2gjq9_8JeSk7ASeFYvz7BLE46AYY53Uku"
            frameborder="0" 
            scrolling="auto"
            allowfullscreen
            style="display: block; margin-left: auto; margin-right: auto; max-width: 100%;"
          ></iframe>
        </article>
      </div>
    </main>
  </section>
  
  <!-- Footer -->
  <footer class="w-12/12 m-auto font-sans">
    <Footer />
  </footer>
</div>