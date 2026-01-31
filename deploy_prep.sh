#!/bin/bash

# Define the root directory
ROOT_DIR=$(pwd)
DEPLOY_DIR="$ROOT_DIR/deploy_package"
ZIP_NAME="project_deploy.zip"

echo "🚀 Starting Deployment Preparation..."

# 1. Clean previous artifacts
echo "🧹 Cleaning up old builds..."
rm -rf "$DEPLOY_DIR"
rm -f "$ZIP_NAME"

# 2. Build Frontend
echo "🏗️  Building Frontend..."
cd "$ROOT_DIR/frontend"
npm install
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed!"
    exit 1
fi

# 3. Create Deployment Package
echo "📦 Packaging files..."
mkdir -p "$DEPLOY_DIR"

# Copy Backend
cp -r "$ROOT_DIR/backend" "$DEPLOY_DIR/backend"

# Copy Frontend Build (to be served by backend)
mkdir -p "$DEPLOY_DIR/frontend"
cp -r "$ROOT_DIR/frontend/build" "$DEPLOY_DIR/frontend/build"

# Copy Root-level Configs
cp "$ROOT_DIR/package.json" "$DEPLOY_DIR/package.json"
cp "$ROOT_DIR/.env" "$DEPLOY_DIR/.env" 2>/dev/null || echo "⚠️ .env not copied (create manually on server)"

# 4. Create ZIP
echo "🤐 Zipping package..."
cd "$DEPLOY_DIR"
zip -r "../$ZIP_NAME" .
cd "$ROOT_DIR"

# 5. Cleanup
rm -rf "$DEPLOY_DIR"

echo "✅ Deployment Package Created: $ZIP_NAME"
echo "👉 Upload this file to your GoForHost cPanel File Manager."
