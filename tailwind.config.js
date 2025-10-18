import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'vert-interra': '#5FAF74',
        'orange-interra': '#FA871C',
        'bleu-interra': '#113A4C',
        'jaune-interra': '#FDB516',
        'vert-clair-interra': '#F6FFFE',
        'orange-clair-interra': '#FFBF83',
        'white-interra': '#FFFFFF',
      },
    },
  },
  plugins: [
    typography,
  ],
}