import { VSparkline } from "vuetify/labs/VSparkline";
import { md3 } from "vuetify/blueprints";
import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    components: {
      VSparkline,
    },
    ssr: true,
    blueprint: md3,
  });
  app.vueApp.use(vuetify);
});
