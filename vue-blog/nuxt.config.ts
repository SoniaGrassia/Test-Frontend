// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  nitro: {
    esbuild: {
      options: {
        target: "es2022",
      },
    },
  },
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    //...
  ],
  vite: {
    build: {
      target: ["es2022", "edge89", "firefox89", "chrome89", "safari15"],
    },
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
