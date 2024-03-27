import type { UserPostCount } from "./layouts/default.vue";
import type { User } from "./utils/useFetch";

export type CustomStore = { users: User[]; posts: UserPostCount[] };

const store = reactive<CustomStore>({
  users: [],
  posts: [],
});

watch(store, () => console.log("store ->", store));

export default store;
