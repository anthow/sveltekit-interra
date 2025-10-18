<script lang="ts">
  import Footer from '$lib/components/Footer.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
</script>

<svelte:head>
  <title>Une histoire dans l'assiette - INTERRA</title>
  <meta name="description" content="Découvrez notre projet 'Une histoire dans l'assiette' qui célèbre la diversité culinaire." />
</svelte:head>

<div class="min-h-screen flex flex-col h-screen">
  <section class="fullheader w-12/12 m-auto fixed bg-white z-50 font-sans">
    <Navbar />
  </section>
  
  <section class="w-12/12 mt-24 md:mt-0 m-auto font-sans">
    <main class="flex-1 md:mt-52">
      <div class="w-10/12 m-auto">
        <article class="mt-10 flex flex-col space-y-10 m-auto">
          <h1 class="font-black text-4xl text-vert-interra bg-white text-center mb-10">
            Une histoire dans l'assiette
          </h1>
          
          <!-- Section texte avec première image -->
          <section class="max-w-4xl m-auto">
            <!-- Première image en grand -->
            <div class="mb-16">
              <img 
                src="https://res.cloudinary.com/dw5l96fhb/image/upload/v1760813738/1_xt74cg.png" 
                alt="Histoire dans l'assiette 1" 
                class="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            
            <div class="text-center mb-16">
              <p class="text-lg text-gray-700 leading-relaxed mb-6">
                INTERRA rassemble des personnes d'origines et de parcours différents autour d'ateliers culinaires et de moments partagés. Ce livre en est le prolongement : une mémoire collective, où les recettes se mêlent aux histoires personnelles et aux traditions transmises.
              </p>
              
              <!-- Premier bouton après le premier paragraphe -->
              <div class="mb-8">
                <a href="https://interra.sumupstore.com" target="_blank" rel="noopener noreferrer">
                  <button class="bg-vert-interra text-white font-black px-8 py-4 rounded-lg hover:opacity-90 text-lg">
                    PASSER COMMANDE
                  </button>
                </a>
              </div>
              
              <p class="text-lg text-gray-700 leading-relaxed">
                À travers les pages d'"Une histoire dans l'assiette. Saveurs et rencontres avec INTERRA", vous découvrirez comment l'alimentation est bien plus qu'un geste quotidien : un langage universel, une porte d'entrée vers l'Autre, et une invitation à bâtir une société plus inclusive et solidaire.
              </p>
            </div>

            <!-- Section avec deuxième image et liste -->
            <div class="flex flex-col md:flex-row-reverse gap-10 items-center mb-16">
              <div class="md:w-1/2">
                <img 
                  src="https://res.cloudinary.com/dw5l96fhb/image/upload/v1760813738/2_gjjhfr.png" 
                  alt="Histoire dans l'assiette 2" 
                  class="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              <div class="md:w-1/2">
                <div class="bg-orange-interra text-white p-8 rounded-lg">
                  <h2 class="font-bold text-2xl mb-6 text-center">S'offrir cet ouvrage, c'est :</h2>
                  <ul class="space-y-3 text-lg">
                    <li>• Soutenir une société inclusive où chacun.e peut trouver sa place</li>
                    <li>• Bénéficier de recettes issues du monde entier, racontées par les membres de la communauté d'INTERRA</li>
                    <li>• Soutenir concrètement les activités uniques d'INTERRA</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Section finale avec troisième image -->
            <div class="flex flex-col md:flex-row gap-10 items-center mb-16">
              <div class="md:w-1/2">
                <img 
                  src="https://res.cloudinary.com/dw5l96fhb/image/upload/v1760813738/3_hj9qz6.png" 
                  alt="Histoire dans l'assiette 3" 
                  class="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              <div class="md:w-1/2 text-center md:text-left">
                <div class="mb-8">
                  <p class="text-sm text-gray-600 mb-6">
                    Ouvrage publié aux Editions Altura, réalisé sous la coordination de Lucile Haertjens, et grâce au soutien financier de Co-Legia, de Promethea et de la Loterie Nationale.
                  </p>
                </div>
                <div>
                  <a href="https://interra.sumupstore.com" target="_blank" rel="noopener noreferrer">
                    <button class="bg-vert-interra text-white font-black px-8 py-4 rounded-lg hover:opacity-90 text-lg w-full md:w-auto">
                      PASSER COMMANDE
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </section>
          
        </article>
      </div>
    </main>
  </section>
  
  <Footer />
</div>