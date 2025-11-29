import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import adapter from '@sveltejs/adapter-static'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: false // Désactivé car les routes API ne sont pas utilisées (site entièrement statique)
    }),
    prerender: {
      handleHttpError: 'warn',
      handleMissingId: 'warn',
      entries: ['*']
    }
  }
}

export default config
