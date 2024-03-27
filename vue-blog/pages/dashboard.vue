<script setup lang="ts">
import { ref } from "vue";
import type { UserPostCount } from "~/layouts/default.vue";
import store from "~/store";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

interface Posts {
  postCount: number;
  userId: number;
  createdAt?: string[];
}

interface PersonalData {
  totalPosts: number;
  position?: number;
  postsToday: number;
  distanceBefore?: number;
  distanceAfter?: number;
}

const dialog = ref<boolean>(false);
const error = ref<string | null>(null);

const userLog = ref<User>();
const userData = ref<PersonalData>({
  totalPosts: 0,
  position: 0,
  postsToday: 0,
  distanceBefore: 0,
  distanceAfter: 0,
});

const userPost = ref<Posts>();

const selectValues = [
  { name: "Ultimo mese", value: 30 },
  { name: "Semestre", value: 6 },
  { name: "Anno", value: 12 },
];

const arrayValueOfSelect = ref<number[]>();

const onSelectedFilterValue = (item: { name: string; value: number }) => {
  arrayValueOfSelect.value = Array.from(
    { length: item.value },
    () => Math.floor(Math.random() * 100) + 1
  );
};

const dataChart = {
  fill: true,
  selectedGradient: ["#B0ADE0", "#ffffff"],
  padding: 8,
  smooth: true,
  value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
  lineWidth: 1,
};

const newPost = ref<{ title: string; body: string }>({
  title: "",
  body: "",
});

onMounted(() => {
  userLog.value = JSON.parse(localStorage.getItem("userLog") || "");
});
watchEffect(() => {
  store.posts.sort(
    ({ postCount: countA }, { postCount: countB }) => countB - countA
  );

  const allUser: UserPostCount[] = store.posts;
  const userPosition = allUser.findIndex((user: UserPostCount) => {
    return user.userId === userLog.value?.id;
  });
  userData.value.position = userPosition + 1;
  userPost.value = store.posts?.find((id) => id.userId === userLog.value?.id);
  if (userPost.value) {
    userData.value.totalPosts = userPost.value.postCount;
  }
  if (userData.value.position > 1) {
    const previousUser = userData.value.position - 1;
    userData.value.distanceBefore =
      store.posts[previousUser - 1].postCount - userData.value.totalPosts;
  } else if (userData.value.position === 1) {
    const followingUser = userData.value.position + 1;
    userData.value.distanceAfter =
      userData.value.totalPosts - store.posts[followingUser + 1].postCount;
  }
});

const submitPost = () => {
  if (!newPost.value.title || !newPost.value.body) {
    error.value = "Entrambi i campi sono obbligatori.";
    return;
  }
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: newPost.value.title,
      body: newPost.value.body,
      userId: userLog.value?.id,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log("Nuovo post aggiunto:", json);
      userData.value.postsToday++;
      if (userPost.value) {
        userData.value.totalPosts = userPost.value.postCount++;
      }

      dialog.value = false;
      resetForm();
    })
    .catch((error) => {
      console.error("Errore durante l'invio del post:", error);
    });
};

const resetForm = () => {
  newPost.value.title = "";
  newPost.value.body = "";
  error.value = null;
};
</script>

<template>
  <v-container>
    <div class="btn-container">
      <v-btn
        class="text-none font-weight-regular"
        prepend-icon="mdi-plus"
        text="Edit Profile"
        variant="tonal"
        @click="dialog = true"
        >ADD POST</v-btn
      >
    </div>

    <v-card class="mt-3 mb-3 ml-2 mr-2" color="primary">
      <v-card-title>Riepilogo Statistiche Personali</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <div>Numero di Post Totali: {{ userData.totalPosts }}</div>
            <div>Numero di Post Generati Oggi: {{ userData.postsToday }}</div>
          </v-col>
          <v-col cols="6">
            <div>Posizione in Classifica: {{ userData.position }}</div>
            <div>Distacco da Chi lo Precede: {{ userData.distanceBefore }}</div>
            <div>Distacco da Chi lo Insegue: {{ userData.distanceAfter }}</div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-select
      clearable
      label="Visualizza dati per:"
      item-title="name"
      :items="selectValues"
      variant="underlined"
      @update:model-value="onSelectedFilterValue"
    ></v-select>

    <v-container fluid>
      <v-sparkline
        :fill="dataChart.fill"
        :gradient="dataChart.selectedGradient"
        :line-width="dataChart.lineWidth"
        :model-value="dataChart.value"
        :padding="dataChart.padding"
        :smooth="dataChart.smooth"
        auto-draw
      ></v-sparkline>
      <v-divider></v-divider>
    </v-container>

    <v-dialog v-model="dialog" max-width="600">
      <v-card title="New post">
        <v-card-text class="pa-5">
          <v-form ref="postForm" @submit.prevent="submitPost" lazy-validation>
            <v-text-field
              v-model="newPost.title"
              label="Titolo"
              required
            ></v-text-field>
            <v-textarea
              v-model="newPost.body"
              label="Scrivi il tuo post..."
              required
            ></v-textarea>
            <v-alert v-if="error" type="error" outlined>{{ error }}</v-alert>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text="Close"
            variant="plain"
            color="error"
            @click="dialog = false"
          ></v-btn>

          <v-btn
            color="primary"
            text="Public"
            variant="tonal"
            @click="submitPost"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-banner
      v-if="userData.position === 1"
      class="my-4"
      color="deep-purple-accent-4"
      icon="mdi-account-arrow-up"
      lines="one"
    >
      <v-banner-text> Sei primo nella classifica generale! </v-banner-text>
    </v-banner>
  </v-container>
</template>

<style scoped lang="scss">
.btn-container {
  display: flex;
  justify-content: end;
}
</style>
