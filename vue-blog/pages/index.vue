<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { users, error } from "../utils/fetch";

const email = ref("");
const router = useRouter();
const rules = ref([
  (value: string) => {
    if (value) return true;
    return "Inserisci un indirizzo email valido";
  },
]);

async function login() {
  if (users.value) {
    const foundUser = users.value.find((user) => user.email === email.value);
    if (foundUser) {
      router.push("/dashboard");
    } else {
      error.value = "L'email inserita non è valida";
    }
  }
}
</script>

<template>
  <v-sheet class="mx-auto" max-width="400">
    <h2>Login</h2>
    <v-form @submit.prevent="login">
      <v-text-field
        v-model="email"
        :rules="rules"
        label="E-mail"
        required
        validate-on="submit"
      ></v-text-field>
      <v-btn class="mt-2" type="submit" block>Login</v-btn>
      <div v-if="error" class="error-message">{{ error }}</div>
    </v-form>
  </v-sheet>
</template>

<style scoped lang="scss"></style>
