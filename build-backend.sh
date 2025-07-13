#!/bin/bash
# Backend build script for separate deployment

echo "Building StackLoom backend for deployment..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Build the backend
echo "Building backend with esbuild..."
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

echo "Backend build complete! Built files are in dist/"
echo "Start the backend with: NODE_ENV=production node dist/index.js"