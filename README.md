# Test-Frontend

# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

ISTRUZIONI PER L'USO

-È possibile loggarsi e accedere alla /dashboard utilizzando una qualsiasi email degli utenti presenti in https://jsonplaceholder.typicode.com/users.
Una volta loggati, i dati dell'utente vengono salvati nel localStorage. Questo è stato necessario per recuperare la posizione iniziale dell'utente.

-Una volta effettuato l'accesso, nella dashboard è possibile aggiungere un nuovo post cliccando sul bottone "ADD POST".

-Cliccando sul bottone "PUBLIC" viene simulata la creazione di una nuova risorsa all'interno dei dati della chiamata api, in quanto jsonplaceholder non permette la reale aggiunta del nuovo dato (https://jsonplaceholder.typicode.com/guide/). Se entrambi i campi del form non sono compilati, verrà visualizzato un errore. È possibile chiudere la modale sia cliccando al di fuori del componente che sull'apposito bottone "CLOSE";

-Con la pubblicazione di un nuovo post tutti i dati presenti nel componente del 'Riepilogo delle statistiche personali' e il punteggio dell'utente (assegnato sulla base del numero dei post) nella classifica, verranno aggiornati.

-L'aggiornamento dei dati è stato gestito creando uno store che immagazzina due array: uno per tutti gli utenti e uno per tutti gli id con il relativo totale di post.

-I componenti select e sparkline sono entrambi fittizi data l'assenza di dati temporali nei mock di jsonplaceholder.
