<script lang="ts">
  export let data: any;
</script>

<article class="w-10/12 my-10 mt-20 m-auto">
  <section class="flex w-full md:grid grid-cols-2 gap-x-10 gap-y-20 flex-wrap">
    
    <!-- InterAct -->
    <div class="flex flex-col">
      <a href="/inter-act">
        {#if data?.interAct?.imageListe?.url}
          <img 
            src={data.interAct.imageListe.url} 
            alt={data.interAct.imageListe.alt || 'InterAct'} 
            class="mb-5 w-full h-[400px] object-cover"
          />
        {:else}
          <div class="mb-5 w-full h-[400px] bg-gray-200 flex items-center justify-center">
            <p class="text-gray-500">Image non disponible</p>
          </div>
        {/if}
        <h2 class="mb-2 text-orange-interra text-2xl">
          {data?.interAct?.titre || 'InterAct'}
        </h2>
        <div>
          {#if data?.interAct?.chapeau}
            {@html data.interAct.chapeau}
          {:else}
            <p>L'objectif d'InterAct est d'accompagner une personne nouvellement arrivée ou locale dans l'organisation d'un atelier.</p>
          {/if}
        </div>
      </a>
    </div>

    <!-- DuoLangue -->
    <div class="flex flex-col">
      <a href="/duo2change">
        {#if data?.duoLangue?.imageListeProjets?.url}
          <img 
            src={data.duoLangue.imageListeProjets.url} 
            alt={data.duoLangue.imageListeProjets.alt || 'Duo2Change'} 
            class="mb-5 w-full h-[400px] object-cover"
          />
        {:else}
          <div class="mb-5 w-full h-[400px] bg-gray-200 flex items-center justify-center">
            <p class="text-gray-500">Image non disponible</p>
          </div>
        {/if}
        <h1 class="text-orange-interra mb-2 text-2xl">
          {data?.duoLangue?.titre || 'Duo2Change'}
        </h1>
        <div>
          {#if data?.duoLangue?.chapeau}
            {@html data.duoLangue.chapeau}
          {:else}
            <p>L'objectif de Duo2Change est de favoriser l'inclusion des personnes nouvellement arrivées et changer les regards sur les migrations.</p>
          {/if}
        </div>
      </a>
    </div>

    <!-- Incubateur Inclusif -->
    <div class="flex flex-col">
      <a href="/incubateur-inclusif">
        {#if data?.incubateurInclusif?.imageListeProjets?.url}
          <img 
            src={data.incubateurInclusif.imageListeProjets.url} 
            alt={data.incubateurInclusif.imageListeProjets.alt || 'InterLab'} 
            class="mb-5 w-full h-[400px] object-cover"
          />
        {:else}
          <div class="mb-5 w-full h-[400px] bg-gray-200 flex items-center justify-center">
            <p class="text-gray-500">Image non disponible</p>
          </div>
        {/if}
        <h1 class="text-orange-interra mb-2 text-2xl">
          {data?.incubateurInclusif?.titre || 'InterLab'}
        </h1>
        <div>
          {#if data?.incubateurInclusif?.chapeau}
            {@html data.incubateurInclusif.chapeau}
          {:else}
            <p>L'InterLab accompagne les personnes nouvellement arrivées à la création d'organisation d'entreprises, ONG, ASBL...</p>
          {/if}
        </div>
      </a>
    </div>

    <!-- Formation Interculturelle -->
    <div class="flex flex-col">
      <a href="/formation-interculturelle">
        {#if data?.formationInterculturelle?.imageListeProjets?.url}
          <img 
            src={data.formationInterculturelle.imageListeProjets.url} 
            alt={data.formationInterculturelle.imageListeProjets.alt || 'Com\'Together'} 
            class="mb-5 w-full h-[400px] object-cover"
          />
        {:else}
          <div class="mb-5 w-full h-[400px] bg-gray-200 flex items-center justify-center">
            <p class="text-gray-500">Image non disponible</p>
          </div>
        {/if}
        <h1 class="text-orange-interra mb-2 text-2xl">
          {data?.formationInterculturelle?.titre || 'Com\'Together'}
        </h1>
        <div>
          {#if data?.formationInterculturelle?.chapeau}
            {@html data.formationInterculturelle.chapeau}
          {:else}
            <p>L'objectif des formations à la communication interculturelle est d'apprendre aux participants à mieux communiquer tout en déconstruisant des stéréotypes et préjugés.</p>
          {/if}
        </div>
      </a>
    </div>

  </section>
</article>
