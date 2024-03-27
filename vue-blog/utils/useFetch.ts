import type { UserPostCount } from "~/layouts/default.vue";
import store, { type CustomStore } from "~/store";

const BASE_URL = "https://jsonplaceholder.typicode.com/";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

type Resource = User & UserPostCount;

async function useFetch<T>(resource: keyof CustomStore) {
  const items = ref<T[] | null>(null) as Ref<T[]>;
  const error = ref<string | null>(null);

  await fetch(`${BASE_URL}/${resource}`)
    .then((res) => {
      return res.json();
    })
    .then((data: T[]) => {
      items.value = data;
      if (process.client) {
        store[resource] = items.value as Resource[];
      }
    })
    .catch((err) => {
      error.value = err.message;
    });
  return { items, error };
}

export const useUsers = await useFetch<User>("users");
// export const usePosts = useFetch<Post>("posts");
