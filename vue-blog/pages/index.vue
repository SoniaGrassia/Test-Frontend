<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUsers } from "../utils/useFetch";
import type { SubmitEventPromise } from "vuetify";

const users = ref<User[]>(useUsers.items.value);
const error = ref<string | null>(useUsers.error.value);

const mail = ref("");
const router = useRouter();
const rules = ref([
  (value: string) => {
    if (!value) return "Campo obbligatorio";
    if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;
    return "Inserisci un indirizzo email valido";
  },
]);

async function login(event: SubmitEventPromise) {
  error.value = null;
  const result = await event;
  if (result.valid) {
    if (users.value?.length > 0) {
      const foundUser = users.value.find(({ email }) => email === mail.value);
      if (foundUser) {
        localStorage.setItem("userLog", JSON.stringify(foundUser));
        router.push("/dashboard");
      } else {
        error.value = "Utente non registrato";
      }
    }
  }
}
</script>

<template>
  <v-sheet class="mx-auto" max-width="400">
    <h2>Login</h2>
    <v-form @submit.prevent="login">
      <v-text-field
        v-model="mail"
        :rules="rules"
        label="E-mail"
        required
        validate-on="submit"
      ></v-text-field>
      <v-btn class="mt-2" type="submit" block>Login</v-btn>
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </v-form>
  </v-sheet>
</template>

<style scoped lang="scss"></style>
