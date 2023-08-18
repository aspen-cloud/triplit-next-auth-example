# Triplit · Next · Next Auth

This is an example [Triplit](https://www.triplit.dev) project that uses [Next.js](https://nextjs.org/) and [Next Auth](https://next-auth.js.org/)

## Getting Started

### Create your project

Create a new project in your [Triplit Dashboard](https://www.triplit.dev/dashboard)

### Setup your environmental variables

Create a file named `.env.local` and copy the variables from `env.example`, filling in each with info from your project details found in the dashboard.

Ensure the "External JWT Secret" in the Triplit Dashboard matches what you set as `NEXTAUTH_SECRET` in your `.env` file.

### Run the schema migrations

```bash
yarn triplit migrate up --token=<secret-token-key>
```

### Start the Nextjs dev server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Viewing your data in the Console

1. Navigate to your [Triplit Console](https://console.triplit.dev)
2. Paste in your project's Secret Key from the [Dashboard](https://www.triplit.dev/dashboard)
3. Explore your data!

## Need help?

Join our [Discord](https://discord.gg/q89sGWHqQ5) where our team and community can help you out!
