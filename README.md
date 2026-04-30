# Node.js API Template

RESTful API built with Express and Node.js, designed for rapid prototype deployment.

## What This Template Is For

- Building RESTful APIs
- Backend services for prototypes
- Data endpoints for frontend apps
- Quick API development and testing

## Stack

- Node.js 22
- Express
- TypeScript
- tsx for development

## Local Development

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Server runs on `http://localhost:4000`

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
PORT=4000
NODE_ENV=development
APP_NAME=node-api-prototype
```

## Available Routes

- `GET /` - API info
- `GET /health` - Health check (returns `{ "status": "ok" }`)
- `GET /api` - API documentation
- `GET /api/example` - Example endpoint with sample data

## Docker

### Build Docker Image

```bash
docker build -t prototype-node-api .
```

### Run Docker Container

```bash
docker run --rm -p 4000:4000 --env-file .env.example prototype-node-api
```

Test health check:
```bash
curl http://localhost:4000/health
```

## Deployment Configuration

- **Default Port:** 4000
- **Health Check Path:** `/health`
- **Health Check Response:** `{ "status": "ok" }`
- **Container Listens On:** `0.0.0.0:4000` (required for Docker)

## Important Implementation Notes

- Server MUST bind to `0.0.0.0`, not `localhost` (required for Docker deployment)
- Health endpoint returns JSON for automated checks
- No database required by default
- No hardcoded secrets or VM-specific paths
- Uses configurable `PORT` environment variable

## Deployment to Prototype VM

This template is designed to deploy as a Docker container on the prototype VM:

1. Main website creates repo from this template
2. GitHub Actions builds Docker image
3. Image pushed to Azure Container Registry
4. Docker Compose service created on VM
5. Caddy routes traffic to container
6. Health checks verify service is running

The deployment system expects:
- One Docker image
- One exposed port (4000)
- One health check endpoint (/health)
- No manual setup required
