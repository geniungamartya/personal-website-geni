Welcome to the Geni's Personal Website repo.

## Development

First, run the development server:

```bash
docker compose -f dev.docker-compose.yaml up db -d
alembic downgrade base
alembic revision -m "create account table"
alembic upgrade head
fastapi dev
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the frontend app and [http://localhost:8000](http://localhost:8000) for backend API docs.

## Commiting

Run formatter and linter:

```
./backend/script/generate-client.sh
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
