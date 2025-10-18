import { sveltekit } from '@sveltejs/kit/vite';
import netlifyHeadersFix from './vite-plugin-netlify-headers.js';

export default {
  plugins: [sveltekit(), netlifyHeadersFix()]
};
