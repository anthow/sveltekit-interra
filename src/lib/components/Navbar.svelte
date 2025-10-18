<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  
  let menuData: any = null;
  let navbarOpen = false;
  
  onMount(async () => {
    try {
      const response = await fetch('/api/menu');
      menuData = await response.json();
    } catch (error) {
      console.error('Erreur lors du chargement du menu:', error);
    }
  });
</script>

<header class="w-10/12 m-auto">
<nav class="flex bg-white justify-between z-50 items-center">
         <!-- Logo -->
         <a href="/" class="flex items-center">
           {#if menuData?.menu?.imageLogo}
             <img src={menuData.menu.imageLogo.url} alt={menuData.menu.imageLogo.alt} class="w-[120px] h-auto" />
           {:else}
             <img src="/interra-logo.png" alt="Interra Logo" class="w-[120px] h-auto" />
           {/if}
         </a>

  <!-- Toggle pour mobile -->
  <button 
    class="md:hidden cursor-pointer p-4" 
    on:click={() => navbarOpen = !navbarOpen}
    on:keydown={(e) => e.key === 'Enter' && (navbarOpen = !navbarOpen)}
    aria-label="Ouvrir/fermer le menu"
    role="button"
    tabindex="0"
  >
    <div class="w-6 h-0.5 bg-gray-600 transition-all duration-300 {navbarOpen ? 'rotate-45 translate-y-1' : ''}"></div>
    <div class="w-6 h-0.5 bg-gray-600 mt-1 transition-all duration-300 {navbarOpen ? 'opacity-0' : ''}"></div>
    <div class="w-6 h-0.5 bg-gray-600 mt-1 transition-all duration-300 {navbarOpen ? '-rotate-45 -translate-y-1' : ''}"></div>
  </button>

  <!-- Menu principal -->
        <div class="  md:w-auto flex flex-col {navbarOpen ? 'fixed top-0 left-0 w-full h-full bg-white z-50 justify-start pt-20' : 'hidden md:flex'}">
    <nav name="presse" class=" md:mt-5 order-2 md:order-1
        md:col-span-2 md:items-center md:self-end md:justify-self-end">
      <ul class="md:items-center m-auto  md:flex md:content-start
         flex-col md:flex-row md:space-x-2">
               <!-- Prix du Mérite wallon -->
               <li class="flex flex-row md:mr-2 gap-2 items-center">
                 {#if menuData?.menu?.imageWallonie}
                   <img src={menuData.menu.imageWallonie.url} alt={menuData.menu.imageWallonie.alt} class="w-[40px] h-auto" />
                 {:else}
                   <img src="/wallonie-logo.png" alt="Prix du Mérite wallon" class="w-[40px] h-auto" />
                 {/if}
                 <p class="font-black">Prix du Mérite wallon 2022</p>
               </li>
      
      <!-- Boutons d'action -->
        <li class="text-center mb-2 md:mb-0">
          <a href="/campagne-2025" class="text-white bg-vert-interra font-black p-1 px-2 rounded hover:bg-white hover:text-vert-interra hover:border-vert-interra border">
          Soutenez-nous !
        </a>
        </li>
        <li class="text-center mb-2 md:mb-0">
          <a href="/agir-avec-nous/#volontaire" class="text-white bg-orange-interra font-black p-1 px-2 rounded hover:bg-white hover:text-orange-interra hover:border-orange-interra border">
          Devenir Volontaire
        </a>
        </li>
        <li class="text-center mb-2 md:mb-0">
          <a href="/une-histoire-dans-l-assiette" class="text-white bg-jaune-interra font-black p-1 px-2 rounded hover:bg-white hover:text-jaune-interra hover:border-jaune-interra border">
          Une histoire dans l'assiette
        </a>
        </li>
        
        <!-- Réseaux sociaux -->
        <li class="w-auto pt-1 m-auto">
          <a href="https://api.whatsapp.com/send?phone=32491520520" target="_blank" rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 256 258">
              <defs>
                <linearGradient id="logosWhatsappIcon0" x1="50%" x2="50%" y1="100%" y2="0%">
                  <stop offset="0%" stop-color="#1FAF38" />
                  <stop offset="100%" stop-color="#60D669" />
                </linearGradient>
                <linearGradient id="logosWhatsappIcon1" x1="50%" x2="50%" y1="100%" y2="0%">
                  <stop offset="0%" stop-color="#F9F9F9" />
                  <stop offset="100%" stop-color="#FFF" />
                </linearGradient>
              </defs>
              <path fill="url(#logosWhatsappIcon0)" d="M5.463 127.456c-.006 21.677 5.658 42.843 16.428 61.499L4.433 252.697l65.232-17.104a122.994 122.994 0 0 0 58.8 14.97h.054c67.815 0 123.018-55.183 123.047-123.01c.013-32.867-12.775-63.773-36.009-87.025c-23.23-23.25-54.125-36.061-87.043-36.076c-67.823 0-123.022 55.18-123.05 123.004"/>
              <path fill="url(#logosWhatsappIcon1)" d="M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423c.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0C58.276 0 1.099 57.16 1.071 127.416Zm40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06c20.003 20.018 31.01 46.628 31.003 74.93c-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295l-40.098 10.513l10.706-39.082Z"/>
              <path fill="#FFF" d="M96.678 74.148c-2.386-5.303-4.897-5.41-7.166-5.503c-1.858-.08-3.982-.074-6.104-.074c-2.124 0-5.575.799-8.492 3.984c-2.92 3.188-11.148 10.892-11.148 26.561c0 15.67 11.413 30.813 13.004 32.94c1.593 2.123 22.033 35.307 54.405 48.073c26.904 10.609 32.379 8.499 38.218 7.967c5.84-.53 18.844-7.702 21.497-15.139c2.655-7.436 2.655-13.81 1.859-15.142c-.796-1.327-2.92-2.124-6.105-3.716c-3.186-1.593-18.844-9.298-21.763-10.361c-2.92-1.062-5.043-1.592-7.167 1.597c-2.124 3.184-8.223 10.356-10.082 12.48c-1.857 2.129-3.716 2.394-6.9.801c-3.187-1.598-13.444-4.957-25.613-15.806c-9.468-8.442-15.86-18.867-17.718-22.056c-1.858-3.184-.199-4.91 1.398-6.497c1.431-1.427 3.186-3.719 4.78-5.578c1.588-1.86 2.118-3.187 3.18-5.311c1.063-2.126.531-3.986-.264-5.579c-.798-1.593-6.987-17.343-9.819-23.64"/>
            </svg>
          </a>
        </li>
        <li class="w-auto text-center mb-2 md:pt-1 md:mb-0">
          <a href="https://www.facebook.com/InterraCult" target="_blank" rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 256 256">
              <path fill="#1877F2" d="M256 128C256 57.308 198.692 0 128 0C57.308 0 0 57.307 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.347-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.958 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"/>
              <path fill="#FFF" d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A128.959 128.959 0 0 0 128 256a128.9 128.9 0 0 0 20-1.555V165h29.825"/>
            </svg>
          </a>
        </li>
        <li class="w-auto text-center mb-2 md:pt-1 md:mb-0">
          <a href="https://www.instagram.com/_interra/?hl=fr" target="_blank" rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 256 256">
              <g fill="none">
                <rect width="256" height="256" fill="url(#skillIconsInstagram0)" rx="60"/>
                <rect width="256" height="256" fill="url(#skillIconsInstagram1)" rx="60"/>
                <path fill="#fff" d="M128.009 28c-27.158 0-30.567.119-41.233.604c-10.646.488-17.913 2.173-24.271 4.646c-6.578 2.554-12.157 5.971-17.715 11.531c-5.563 5.559-8.98 11.138-11.542 17.713c-2.48 6.36-4.167 13.63-4.646 24.271c-.477 10.667-.602 14.077-.602 41.236s.12 30.557.604 41.223c.49 10.646 2.175 17.913 4.646 24.271c2.556 6.578 5.973 12.157 11.533 17.715c5.557 5.563 11.136 8.988 17.709 11.542c6.363 2.473 13.631 4.158 24.275 4.646c10.667.485 14.073.604 41.23.604c27.161 0 30.559-.119 41.225-.604c10.646-.488 17.921-2.173 24.284-4.646c6.575-2.554 12.146-5.979 17.702-11.542c5.563-5.558 8.979-11.137 11.542-17.712c2.458-6.361 4.146-13.63 4.646-24.272c.479-10.666.604-14.066.604-41.225s-.125-30.567-.604-41.234c-.5-10.646-2.188-17.912-4.646-24.27c-2.563-6.578-5.979-12.157-11.542-17.716c-5.562-5.562-11.125-8.979-17.708-11.53c-6.375-2.474-13.646-4.16-24.292-4.647c-10.667-.485-14.063-.604-41.23-.604h.031Zm-8.971 18.021c2.663-.004 5.634 0 8.971 0c26.701 0 29.865.096 40.409.575c9.75.446 15.042 2.075 18.567 3.444c4.667 1.812 7.994 3.979 11.492 7.48c3.5 3.5 5.666 6.833 7.483 11.5c1.369 3.52 3 8.812 3.444 18.562c.479 10.542.583 13.708.583 40.396c0 26.688-.104 29.855-.583 40.396c-.446 9.75-2.075 15.042-3.444 18.563c-1.812 4.667-3.983 7.99-7.483 11.488c-3.5 3.5-6.823 5.666-11.492 7.479c-3.521 1.375-8.817 3-18.567 3.446c-10.542.479-13.708.583-40.409.583c-26.702 0-29.867-.104-40.408-.583c-9.75-.45-15.042-2.079-18.57-3.448c-4.666-1.813-8-3.979-11.5-7.479s-5.666-6.825-7.483-11.494c-1.369-3.521-3-8.813-3.444-18.563c-.479-10.542-.575-13.708-.575-40.413c0-26.704.096-29.854.575-40.396c.446-9.75 2.075-15.042 3.444-18.567c1.813-4.667 3.983-8 7.484-11.5c3.5-3.5 6.833-5.667 11.5-7.483c3.525-1.375 8.819-3 18.569-3.448c9.225-.417 12.8-.542 31.437-.563v.025Zm62.351 16.604c-6.625 0-12 5.37-12 11.996c0 6.625 5.375 12 12 12s12-5.375 12-12s-5.375-12-12-12v.004Zm-53.38 14.021c-28.36 0-51.354 22.994-51.354 51.355c0 28.361 22.994 51.344 51.354 51.344c28.361 0 51.347-22.983 51.347-51.344c0-28.36-22.988-51.355-51.349-51.355h.002Zm0 18.021c18.409 0 33.334 14.923 33.334 33.334c0 18.409-14.925 33.334-33.334 33.334c-18.41 0-33.333-14.925-33.333-33.334c0-18.411 14.923-33.334 33.333-33.334Z"/>
              </g>
              <defs>
                <radialGradient id="skillIconsInstagram0" cx="0" cy="0" r="1" gradientTransform="matrix(0 -253.715 235.975 0 68 275.717)" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#FD5" />
                  <stop offset=".1" stop-color="#FD5" />
                  <stop offset=".5" stop-color="#FF543E" />
                  <stop offset="1" stop-color="#C837AB" />
                </radialGradient>
                <radialGradient id="skillIconsInstagram1" cx="0" cy="0" r="1" gradientTransform="matrix(22.25952 111.2061 -458.39518 91.75449 -42.881 18.441)" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#3771C8" />
                  <stop offset=".128" stop-color="#3771C8" />
                  <stop offset="1" stop-color="#60F" stop-opacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
    
          <!-- Menu de navigation -->
          <nav name="menu" class="mt-2 order-1 md:order-2 mb-2 md:mb-10 md:mb-0 ">
             <ul class=" text-lg   flex-col md:flex-row md:flex  m-auto md:space-x-10 ">
               <!-- Accueil -->
               <li class="hover:text-yellow-500 text-sm md:text-lg text-center mb-2 md:mb-0">
                 <a href="/">{menuData?.menu?.menuPrincipalUnAccueil || 'Accueil'}</a>
               </li>
      
      <!-- Découvrir Interra -->
        <li class="text-center mb-2">
          <div class="dropdown inline-block relative">
            <button class="hover:text-yellow-500 text-center text-sm md:text-lg md:mb-0 rounded inline-flex items-center">
              <a href="/decouvrir-interra">{menuData?.menu?.menuPrincipalDeuxDecouvrirInterra || 'Découvrir Interra'}</a>
              <svg class="fill-current h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </button>
            <ul class="dropdown-menu absolute hidden z-50 bg-white text-gray-700 p-4 pt-3">
              <li class="hover:text-yellow-500 text-center text-sm md:text-lg mb-2">
                <a href="/decouvrir-interra/#adn">{menuData?.menu?.sousMenuDecouvrirInterraAdn || 'ADN'}</a>
              </li>
              <li class="hover:text-yellow-500 text-center mb-2 text-sm md:text-lg">
                <a href="/decouvrir-interra/#missions">{menuData?.menu?.sousMenuDecouvrirInterraMission || 'Missions'}</a>
              </li>
              <li class="hover:text-yellow-500 text-center mb-2 text-sm md:text-lg">
                <a href="/decouvrir-interra/#valeurs">{menuData?.menu?.sousMenuDecouvrirInterraValeurs || 'Valeurs'}</a>
              </li>
              <li class="hover:text-yellow-500 text-center mb-2 text-sm md:text-lg">
                <a href="/decouvrir-interra/#partenaires">{menuData?.menu?.sousMenuDecouvrirInterraLexique || 'Lexique'}</a>
              </li>
              <li class="hover:text-yellow-500 text-center mb-2 text-sm md:text-lg">
                <a href="/decouvrir-interra/#partenaires">{menuData?.menu?.sousMenuDecouvrirInterraPartenaires || 'Partenaires'}</a>
              </li>
            </ul>
          </div>
        </li>
      
      <!-- Projets -->
        <li class="text-center mb-2">
          <div class="dropdown inline-block m-auto relative">
            <button class="text-sm md:text-lg hover:text-yellow-500 text-center rounded inline-flex items-center">
              <a href="/projets">{menuData?.menu?.menuPrincipalTroisProjets || 'Projets'}</a>
              <svg class="fill-current h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </button>
            <ul class="dropdown-menu absolute hidden z-50 bg-white text-gray-700 p-4 pt-3">
              <li class="hover:opacity-80 text-vert-interra text-center mb-2 text-sm md:text-lg">
                <a href="/inter-act">{menuData?.menu?.sousMenuProjetInteract || 'Inter-Act'}</a>
              </li>
              <li class="hover:opacity-80 text-jaune-interra text-center mb-2 text-sm md:text-lg">
                <a href="/duo2change">{menuData?.menu?.sousMenuProjetDuo || 'Duo2Change'}</a>
              </li>
              <li class="hover:opacity-80 text-orange-interra text-center mb-2 text-sm md:text-lg">
                <a href="/interlab">{menuData?.menu?.sousMenuProjetInterlab || 'Interlab'}</a>
              </li>
              <li class="hover:opacity-80 text-bleu-interra text-center mb-2 text-sm md:text-lg">
                <a href="/formation-interculturelle">{menuData?.menu?.sousMenuProjetFormation || 'Formation'}</a>
              </li>
            </ul>
          </div>
        </li>
        
        <!-- Agenda -->
        <li class="hover:text-yellow-500 text-center mb-2 md:mb-0 text-sm md:text-lg">
          <a href="https://www.facebook.com/InterraCult/events" target="_blank" rel="noreferrer">{menuData?.menu?.menuPrincipalQuatreAgenda || 'Agenda'}</a>
        </li>
      
      <!-- Agir avec nous -->
        <li class="text-center mb-2">
          <div class="dropdown inline-block relative">
            <button class="text-sm md:text-lg hover:text-yellow-500 text-center mb-2 md:mb-0 rounded inline-flex items-center">
              <a href="/agir-avec-nous">{menuData?.menu?.menuPrincipalCinqAgirAvecNous || 'Agir avec nous'}</a>
              <svg class="fill-current h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </button>
            <ul class="dropdown-menu absolute hidden z-50 bg-white text-gray-700 p-4 pt-3">
              <li class="hover:text-yellow-500 text-center mb-2 text-sm md:text-lg">
                <a href="/agir-avec-nous/talent-interact">{menuData?.menu?.sousMenuAgirAvecNousDevenirTalent || 'Devenir Talent'}</a>
              </li>
              <li class="hover:text-yellow-500 text-center mb-2 text-sm md:text-lg">
                <a href="/agir-avec-nous/former-duo">{menuData?.menu?.sousMenuAgirAvecNousFormerUnduo || 'Former un duo'}</a>
              </li>
              <li class="hover:text-yellow-500 text-center text-sm md:text-lg mb-2">
                <a href="/agir-avec-nous/interlab">{menuData?.menu?.sousMenuAgirAvecNousDevenirCoah || 'Devenir Coach'}</a>
              </li>
              <li class="hover:text-yellow-500 text-center text-sm md:text-lg mb-2">
                <a href="/agir-avec-nous/participer-formation">{menuData?.menu?.sousMenuAgirAvecNousParticiperFormation || 'Participer Formation'}</a>
              </li>
              <li class="hover:text-yellow-500 text-center text-sm md:text-lg mb-2">
                <a href="/agir-avec-nous/devenir-volontaire">{menuData?.menu?.sousMenuAgirAvecNousDevenirVolontaire || 'Devenir Volontaire'}</a>
              </li>
              <li class="hover:text-yellow-500 text-center text-sm md:text-lg mb-2">
                <a href="/agir-avec-nous/#don">{menuData?.menu?.sousMenuAgirAvecNousFaireDon || 'Faire un don'}</a>
              </li>
            </ul>
          </div>
        </li>
        
        <!-- Contact -->
        <li class="hover:text-yellow-500 text-center text-sm md:text-lg mb-2 md:mb-0">
          <a href="/contact">{menuData?.menu?.menuPrincipalSixContact || 'Contact'}</a>
        </li>
      </ul>
    </nav>
  </div>
</nav>
</header>

<style>
  .dropdown:hover .dropdown-menu {
    display: block;
  }
</style>
