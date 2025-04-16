# Password Manager Backend

A Node.js Express backend service with PostgreSQL database for the Password Manager application.

## Prerequisites

- Docker
- Docker Compose
- Node.js (for local development)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd password-manager-backend
```

2. Install dependencies (for local development):
```bash
npm install
```

3. Start the services using Docker Compose:
```bash
docker-compose up --build
```

The services will be available at:
- API: http://localhost:3000
- PostgreSQL: localhost:5432

## Development

For local development without Docker:

1. Create a `.env` file with the following variables:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=password_manager
PORT=3000
```

2. Start the development server:
```bash
npm run dev
```

## API Endpoints

- `GET /`: Welcome message
- `GET /health`: Health check endpoint

## Database

The PostgreSQL database is configured with the following default credentials:
- Username: postgres
- Password: postgres
- Database: password_manager
- Port: 5432

## Docker Commands

- Start services: `docker-compose up`
- Stop services: `docker-compose down`
- Rebuild services: `docker-compose up --build`
- View logs: `docker-compose logs -f` 