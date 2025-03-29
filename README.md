Welcome to the Geni's Personal Website repo.

## Development

First, run the development server:

```bash
cd frontend
npm run backend:prestart
npm run docker:dev:start:db
npm run dev
cd ../backend
fastapi dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the frontend app and [http://localhost:8000](http://localhost:8000) for backend API docs.

## Commiting

Run formatter and linter:

```
cd frontend
./check.sh
npm run backend:format
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
