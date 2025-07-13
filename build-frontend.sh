#!/bin/bash
# Frontend build script for static deployment

echo "Building StackLoom frontend for static deployment..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Build the frontend
echo "Building frontend with Vite..."
npx vite build

echo "Frontend build complete! Static files are in dist/public/"
echo "You can now deploy the contents of dist/public/ to any static hosting service."