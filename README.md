Welcome to the Geni's Personal Website repo.


## Development

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Commiting

Run formatter and linter:

```
./check.sh
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
npm run docker:build
```

Run the Container

```
npm run docker:start
```

Stop the Container

```
npm run docker:stop
```
