<script lang="ts">
  import Footer from '$lib/components/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import SEO from '$lib/components/SEO.svelte';
  import { pageSEOConfigs } from '$lib/seo';
  import { serviceTraiteurContent } from '$lib/content/service-traiteur';
</script>

<SEO config={pageSEOConfigs['/service-traiteur']} />

<div class="min-h-screen flex flex-col h-screen">
  <section class="fullheader w-12/12 m-auto fixed bg-white z-50 font-sans">
    <Navbar />
  </section>

  <section class="w-12/12 mt-24 md:mt-0 m-auto font-sans">
    <main class="flex-1 md:mt-52">
      <div class="w-12/12">
        <article class="w-10/12 m-auto flex flex-col gap-10">
          <h1 class="font-black text-4xl text-vert-interra mt-2 bg-white text-center">
            {serviceTraiteurContent.introTitle}
          </h1>

          <!-- 3 photos juste après le H1 -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            {#each serviceTraiteurContent.photos as image (image.src)}
              <figure class="w-full">
                <div class="w-full aspect-square rounded-xl overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    class="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </figure>
            {/each}
          </div>

          <div class="paragraphe text-center">
            <p>{serviceTraiteurContent.introText}</p>
          </div>

          <p class="font-black text-2xl text-orange-interra text-center">
            {serviceTraiteurContent.offreTitle}
          </p>
          <div class="paragraphe text-center">
            <p>{serviceTraiteurContent.offreText}</p>
          </div>

          <!-- Photo service traiteur, juste avant "Une envie, un projet ?" -->
          <figure class="w-full flex justify-center">
            <img
              src={serviceTraiteurContent.featuredImage.src}
              alt={serviceTraiteurContent.featuredImage.alt}
              class="h-auto max-w-full rounded"
              loading="lazy"
              decoding="async"
            />
          </figure>

          <p class="font-black text-2xl text-vert-interra text-center">
            {serviceTraiteurContent.envieTitle}
          </p>
          <div class="paragraphe text-center">
            <p>{serviceTraiteurContent.contactText}</p>
          </div>
        </article>
      </div>
    </main>
  </section>

  <footer class="w-12/12 m-auto font-sans">
    <Footer />
  </footer>
</div>
