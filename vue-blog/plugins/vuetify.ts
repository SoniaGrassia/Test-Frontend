// import this after install `@mdi/font` package
import { md3 } from "vuetify/blueprints";
import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // ... your configuration
    ssr: true,
    blueprint: md3,
  });
  app.vueApp.use(vuetify);
});
