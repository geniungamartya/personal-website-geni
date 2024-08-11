Welcome to the Geni's Personal Website repo.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Commiting

Run formatter and linter:

```
npm run format && npm run lint
```

Run Unit Tests:

```
npm run test:unit
```

Run E2E Tests:

```
npm run test:e2e
```

## Deployment

Build the Docker Image

```
docker compose build
```

Run the Container

```
npm run docker:start
```

Stop the Container

```
npm run docker:stop
```
