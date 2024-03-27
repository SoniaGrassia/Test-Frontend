<script setup lang="ts">
import { useUsers } from "../utils/useFetch";
import store from "~/store";

interface Post {
  body: string;
  id: number;
  title: string;
  userId: number;
}

export interface UserPostCount {
  userId: number;
  postCount: number;
}

const users = ref<User[]>(useUsers.items.value);
const post = ref<Post[] | null>(null);

onMounted(() => {
  async function useFetchId(url: string) {
    fetch(url)
      .then((res) => res.json())
      .then((data: Post[]) => {
        post.value = data;

        store.posts = post.value.reduce((acc: UserPostCount[], obj: Post) => {
          const foundUser = acc.find((user) => user.userId === obj.userId);
          if (foundUser) {
            foundUser.postCount++;
          } else {
            acc.push({ userId: obj.userId, postCount: 1 });
          }
          return acc;
        }, []);
      });
  }

  useFetchId("https://jsonplaceholder.typicode.com/posts");
});
</script>

<template>
  <v-layout ref="app" class="rounded rounded-md">
    <v-app-bar color="grey-lighten-2" name="app-bar"></v-app-bar>
    <v-main>
      <slot />

      <v-navigation-drawer
        color="grey-darken-2"
        location="end"
        name="drawer"
        permanent
      >
        <h1>Classifica</h1>
        <v-card class="mx-auto" max-width="300">
          <v-list-item v-for="(item, index) in store.posts"
            >{{ index + 1 }}_
            {{ users?.find((user) => user.id === item.userId)?.name }} -
            {{ item.postCount }}
          </v-list-item>
        </v-card>
      </v-navigation-drawer>
    </v-main>
  </v-layout>
</template>
