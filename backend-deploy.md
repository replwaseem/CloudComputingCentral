# StackLoom Backend Deployment Guide

This guide explains how to deploy the StackLoom backend API separately from the frontend.

## Backend Architecture

The backend is a Node.js Express application with:
- REST API endpoints for articles, categories, tags, authors
- PostgreSQL database integration with Drizzle ORM
- In-memory storage fallback for development
- TypeScript for type safety

## Build Commands

```bash
# Install dependencies
npm install

# Build the backend
npm run build:backend

# Start production server
npm run start:backend
```

## Environment Variables

### Required Variables
```bash
DATABASE_URL=postgresql://username:password@host:port/database
NODE_ENV=production
PORT=5000
```

### Optional Variables
```bash
# Session configuration
SESSION_SECRET=your-secure-session-secret

# Database connection pool
PGPOOL_MAX=20
PGPOOL_IDLE_TIMEOUT=30000
```

## Deployment Options

### Option 1: Railway
1. Connect your Git repository
2. Set build command: `npm run build:backend`
3. Set start command: `npm run start:backend`
4. Add environment variables (DATABASE_URL, etc.)
5. Railway will automatically provision PostgreSQL

### Option 2: Render
1. Create new Web Service from Git repository
2. Set build command: `npm run build:backend`
3. Set start command: `npm run start:backend`
4. Add environment variables
5. Create PostgreSQL database add-on

### Option 3: Heroku
1. Install Heroku CLI and login
2. Create new app: `heroku create your-backend-name`
3. Add PostgreSQL: `heroku addons:create heroku-postgresql:mini`
4. Set buildpacks: `heroku buildpacks:set heroku/nodejs`
5. Deploy: `git push heroku main`

### Option 4: AWS ECS (Docker)
1. Create Dockerfile for the backend
2. Build and push to ECR
3. Create ECS task definition
4. Set up RDS PostgreSQL instance
5. Configure load balancer and security groups

### Option 5: Google Cloud Run
1. Create Dockerfile
2. Build and push to Container Registry
3. Deploy to Cloud Run
4. Set up Cloud SQL PostgreSQL
5. Configure environment variables

### Option 6: DigitalOcean App Platform
1. Connect Git repository
2. Configure as Node.js app
3. Set build and run commands
4. Add managed PostgreSQL database
5. Configure environment variables

## Docker Configuration

```dockerfile
# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy built application
COPY dist/ ./dist/
COPY shared/ ./shared/

# Expose port
EXPOSE 5000

# Start application
CMD ["npm", "run", "start:backend"]
```

## Database Setup

### PostgreSQL Requirements
- PostgreSQL 12+ recommended
- Database with proper connection string
- Network access configured for your deployment platform

### Migration and Seeding
```bash
# Push database schema
npm run db:push

# Seed initial data (optional)
node seed-db.js
```

## CORS Configuration

The backend needs to allow requests from your frontend domain:

```javascript
// In server/index.ts, update CORS settings
app.use(cors({
  origin: [
    'https://your-frontend-domain.com',
    'http://localhost:3000', // for development
  ],
  credentials: true
}));
```

## Health Check Endpoint

The backend includes a health check endpoint at `/health` that returns:
```json
{
  "status": "ok",
  "timestamp": "2025-01-13T18:00:00.000Z",
  "database": "connected"
}
```

## Performance Considerations

1. **Database Connection Pooling**: Configured in `server/db.ts`
2. **Caching**: Consider adding Redis for session storage and caching
3. **Rate Limiting**: Add rate limiting middleware for production
4. **Logging**: Implement proper logging with Winston or similar
5. **Monitoring**: Set up application monitoring (New Relic, Datadog)

## Security Best Practices

1. **Environment Variables**: Never commit secrets to Git
2. **HTTPS**: Always use HTTPS in production
3. **Database Security**: Use connection encryption and proper credentials
4. **Input Validation**: Ensure all inputs are validated
5. **CORS**: Configure CORS properly for your frontend domain
6. **Rate Limiting**: Implement API rate limiting
7. **Security Headers**: Add security headers with helmet.js

## Scaling Considerations

- **Horizontal Scaling**: Multiple backend instances behind load balancer
- **Database**: Use read replicas for better performance
- **Caching**: Implement Redis for session and data caching
- **CDN**: Use CDN for static assets if serving any