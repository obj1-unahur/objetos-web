import { defineConfig,passthroughImageService } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';
import icon from 'astro-icon';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  image: {
    service: passthroughImageService()
  },
  site: 'https://obj1-unahur.github.io',
  compressHTML: false,
  integrations: [react(),mdx(), icon(), tailwind({
    applyBaseStyles: false
  }), compress()]
});