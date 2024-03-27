import { VSparkline } from "vuetify/labs/VSparkline";
import { md3 } from "vuetify/blueprints";
import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify, type ThemeDefinition } from "vuetify";

const myCustomTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: "#9794cf",
    secondary: "#B0ADE0",
    error: "#6457A6",
  },
};
export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    components: {
      VSparkline,
    },
    ssr: true,
    blueprint: md3,
    theme: {
      defaultTheme: "myCustomTheme",
      themes: {
        myCustomTheme,
      },
    },
  });
  app.vueApp.use(vuetify);
});
