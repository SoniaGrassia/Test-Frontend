<script setup lang="ts">
import { ref } from "vue";

const dialog = ref<boolean>(false);
</script>

<template>
  <v-container>
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-plus"
          text="Edit Profile"
          variant="tonal"
          v-bind="activatorProps"
          >ADD POST</v-btn
        >
      </template>

      <v-card title="New post">
        <v-card-text class="pa-5">
          <v-form ref="sendForm" lazy-validation>
            <v-textarea label="Message"></v-textarea>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

          <v-btn
            color="primary"
            text="Public"
            variant="tonal"
            @click="dialog = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
