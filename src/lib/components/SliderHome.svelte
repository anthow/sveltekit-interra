<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  
  export let images: any[] = [];
  let currentSlide = 0;
  let sliderInterval: number;
  
  onMount(() => {
    // Démarrer l'autoplay si on a plus d'une image
    if (images.length > 1) {
      sliderInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % images.length;
      }, 3000);
    }
  });
  
  onDestroy(() => {
    if (sliderInterval) {
      clearInterval(sliderInterval);
    }
  });
  
  function goToSlide(index: number) {
    currentSlide = index;
  }
  
  function nextSlide() {
    if (images.length > 1) {
      currentSlide = (currentSlide + 1) % images.length;
    }
  }
  
  function prevSlide() {
    if (images.length > 1) {
      currentSlide = currentSlide === 0 ? images.length - 1 : currentSlide - 1;
    }
  }
</script>

<div class="slider-container overflow-hidden relative">
  {#if images.length > 0}
    <div class="slider-wrapper relative">
      {#each images as image, index}
        <div class="slide {index === currentSlide ? 'active' : ''}">
          <img src={image.url} alt={image.alt} class="w-full h-auto" />
        </div>
      {/each}
      
    </div>
  {:else}
    <!-- Images de fallback -->
    <div class="relative">
      <img src="/images/interra-logo-300x300-removebg.png" alt="Interra" class="w-full h-auto" />
    </div>
  {/if}
</div>

<style>
  .slider-container {
    position: relative;
  }
  
  .slider-wrapper {
    position: relative;
    width: 100%;
    height: 400px; /* Hauteur fixe pour le slider */
  }
  
  .slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }
  
  .slide.active {
    opacity: 1;
  }
  
  .slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>