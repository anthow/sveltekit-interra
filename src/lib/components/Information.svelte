<script lang="ts">
  export let data: any = null;
  
  $: informations = data?.allInformation || [];
</script>

{#if informations.length > 0}
  <div class="md:grid grid-cols-3 gap-x-5">
    {#each informations as info}
      <article>
        <h3 class="text-lg mb-2 text-orange-interra font-semibold">
          {info.titre || 'Erreur : Titre non disponible'}
        </h3>
        <div class="mb-5">
          {#if info.texte}
            {@html info.texte}
          {:else}
            <p class="text-red-500">Erreur : Texte non disponible</p>
          {/if}
        </div>
        
        <figure class="mb-10 md:mb-0">
          {#if info.image?.url}
            <img src={info.image.url} alt={info.image.alt || 'Image non disponible'} class="w-full h-auto" />
          {:else}
            <div class="text-center p-8 bg-gray-100">
              <p class="text-red-500">Erreur : Image non disponible</p>
            </div>
          {/if}
        </figure>
        
        {#if info.urlButton && info.texteButton}
          <a href={info.urlButton}>
            <button class="mt-5 text-white bg-vert-interra font-black p-1 px-2 rounded hover:bg-white-interra hover:text-vert-interra hover:bg-white border hover:border-vert-interra">
              {info.texteButton}
            </button>
          </a>
        {:else}
          <div class="text-center p-4 bg-gray-100">
            <p class="text-red-500">Erreur : Bouton non disponible</p>
          </div>
        {/if}
      </article>
    {/each}
  </div>
{:else}
  <div class="text-center p-8 bg-gray-100">
    <p class="text-red-500">Erreur : Aucune information disponible</p>
  </div>
{/if}