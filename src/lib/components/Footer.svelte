<script lang="ts">
  import { onMount } from 'svelte';
  
  let footerData: any = null;
  
  onMount(async () => {
    try {
      const response = await fetch('/api/footer');
      footerData = await response.json();
    } catch (error) {
      console.error('Erreur lors du chargement du footer:', error);
    }
  });
</script>

<footer class="mt-20  ">
  <!-- Section avec soutiens -->
  <section class=" w-10/12 mb-10  pb-5   flex flex-col md:flex-row items-center justify-center gap-x-20 m-auto ">
    <p class="text-vert-interra text-lg font-black">
      Avec le soutien de <br />
    </p>
    
    <!-- Slider des soutiens -->
    <ul class="flex flex-col flex-wrap md:grid grid-cols-6 md:gap-x-10 gap-y-5 md:gap-y-10">
      {#if footerData?.footer?.soutiens}
        {#each footerData.footer.soutiens as soutien}
          <li class="place-self-center">
            <a href={soutien.customData?.url} target="_blank" rel="noreferrer">
              <figure class="md:w-12/12 w-1/2 m-auto mb-8 md:m-0">
                <img src={soutien.url} alt={soutien.alt} class="w-full" />
              </figure>
            </a>
          </li>
        {/each}
      {/if}
    </ul>
  </section>
  
  <!-- Section principale du footer -->
  <div class="w-12/12 pt-5 bg-vert-interra ">
    <section class=" w-10/12  pb-5 border-black  flex flex-col gap-x-20 m-auto md:grid grid-cols-3">
      <!-- Newsletter (placeholder) -->
      <div class="flex flex-col gap-2">
        <h3 class="text-white text-xl font-black">Newsletter</h3>
        <p class="text-white">Restez informé de nos activités</p>
        <!-- Formulaire newsletter à implémenter -->
      </div>
      
      <!-- Informations Interra -->
      <div class="  flex flex-col gap-2">
        <h3 class=" text-white text-xl font-black ">Interra ASBL </h3>
        <p class="text-white">boulevard d'avroy, 272 à 4000 Liège</p>
        <p class="text-white">Num.Ent. : 0726.976.002</p>
        <p class="text-white">RPM Liège</p>
        <p class="text-white">N°Compte : BE65 1030 6350 8796</p>
      </div>

      <!-- Contact et réseaux sociaux -->
      <div class="  flex flex-col space-y-2">
        <h3 class=" text-white text-xl font-black ">Venez nous parler de vos envies
          on s'occupera du reste ! </h3>
        <p class="text-white">info@interra-asbl.be</p>

        <ul class="flex  space-x-4">
          <li>
            <a href="https://www.facebook.com/InterraCult" target="_blank" rel="noreferrer">
              <figure>
                <img src="/images/facebook-header.png" alt="Page Facebook d'Interra" class="w-8 h-8" />
              </figure>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/_interra/?hl=fr" target="_blank" rel="noreferrer">
              <figure>
                <img src="/images/instagram.png" alt="Page Instagram d'Interra" class="w-8 h-8" />
              </figure>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/company/interra-culturalbridges/" target="_blank" rel="noreferrer">
              <figure>
                <img src="/images/linkedin.png" alt="Page LinkedIn d'Interra" class="w-8 h-8" />
              </figure>
            </a>
          </li>
        </ul>
      </div>
    </section>
  </div>
  
  <!-- Section copyright -->
  <section class="pt-2 w-12/12  m-auto opacity-90 bg-vert-interra opacity-30 ">
    <ul class="flex flex-col md:flex-row m-auto md:space-x-2 w-10/12 text-center justify-center">
      <li class="text-xs">@ Interra - Tous droits réservés -</li>
      <li class="text-xs">Politique de confidentialités</li>
      <li class="text-xs">
        site réalisé par <a href="https://liono.be/" target="_blank" rel="noopener">Liono</a>
      </li>
    </ul>
  </section>
</footer>

