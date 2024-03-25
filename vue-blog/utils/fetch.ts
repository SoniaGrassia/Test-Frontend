const BASE_URL = "https://jsonplaceholder.typicode.com/";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

function useFetchUsers(url: string) {
  const users = ref<User[] | null>(null);
  const error = ref<string | null>(null);

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Errore durante il recupero degli utenti");
      }
      return res.json();
    })
    .then((data: User[]) => {
      users.value = data;
    })
    .catch((err) => {
      error.value = err.message;
    });

  return { users, error };
}

export const { users, error } = useFetchUsers(`${BASE_URL}users`);
