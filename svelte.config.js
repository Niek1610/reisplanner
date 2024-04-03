import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  kit: {
    adapter: adapter({
      // Specify the Node.js runtime version
      esbuild: {
        target: 'node20'
      }
    })
  },
  preprocess: vitePreprocess()
};

export default config;