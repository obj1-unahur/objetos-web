import { defineConfig, passthroughImageService } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';
import icon from 'astro-icon';
import react from '@astrojs/react';
import auth from "auth-astro";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  image: {
    service: passthroughImageService()
  },
  site: 'https://obj1-unahur.github.io',
  compressHTML: false,
  integrations: [auth(), react(), mdx(), icon(), tailwind({
    applyBaseStyles: false
  }), compress()],
  output: "server",
  adapter: vercel()
});