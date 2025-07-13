# StackLoom Frontend Deployment Guide

This guide explains how to deploy the StackLoom frontend as a static website separately from the backend.

## Static Build

The frontend is built using Vite and creates static files that can be hosted anywhere.

### Build Commands

```bash
# Install dependencies
npm install

# Build for production
npm run build:frontend

# Preview the built static files locally
npm run preview:frontend
```

### Build Output

The static files are generated in `dist/public/` and include:
- `index.html` - Main HTML file
- `assets/` - CSS, JS, and other static assets
- All necessary files for a complete static website

## Environment Configuration

### Development
```bash
# Create frontend environment file
cp client/.env.example client/.env

# Update the API URL for your backend
VITE_API_BASE_URL=http://localhost:5000
```

### Production
Update the API URL to point to your deployed backend:
```bash
VITE_API_BASE_URL=https://your-backend-api.com
```

## Deployment Options

### Option 1: Netlify
1. Build the frontend locally or connect your Git repository
2. Set build command: `npm run build:frontend`
3. Set publish directory: `dist/public`
4. Add environment variable: `VITE_API_BASE_URL=https://your-backend-url.com`

### Option 2: Vercel
1. Import your Git repository
2. Set build command: `npm run build:frontend`
3. Set output directory: `dist/public`
4. Add environment variable: `VITE_API_BASE_URL=https://your-backend-url.com`

### Option 3: Cloudflare Pages
1. Connect your Git repository
2. Set build command: `npm run build:frontend`
3. Set build output directory: `dist/public`
4. Add environment variable: `VITE_API_BASE_URL=https://your-backend-url.com`

### Option 4: AWS S3 + CloudFront
1. Build the frontend: `npm run build:frontend`
2. Upload `dist/public/` contents to S3 bucket
3. Configure CloudFront distribution
4. Set environment variable before build: `VITE_API_BASE_URL=https://your-backend-url.com`

### Option 5: GitHub Pages
1. Build the frontend with your backend URL
2. Push `dist/public/` contents to `gh-pages` branch
3. Enable GitHub Pages in repository settings

## CORS Configuration

Make sure your backend API allows requests from your frontend domain. Update your backend's CORS settings to include your frontend URL.

## Benefits of Static Deployment

1. **Cost Effective**: Static hosting is often free or very cheap
2. **Fast Performance**: CDN distribution and caching
3. **Scalability**: Automatic scaling with CDN
4. **Security**: No server-side vulnerabilities
5. **Reliability**: High uptime with CDN infrastructure
6. **Easy Deployment**: Simple build and upload process

## API Requirements

Your backend must:
- Support CORS for your frontend domain
- Be accessible via HTTPS in production
- Handle API routes as defined in the current application
- Maintain the same API contract (endpoints, request/response formats)