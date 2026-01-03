#!/bin/bash

# Netflix Clone Deployment Helper Script
# This script helps you verify your environment is ready for deployment

echo "🎬 Netflix Clone - Pre-Deployment Checklist"
echo "=========================================="
echo ""

# Check if git is initialized
if [ -d .git ]; then
    echo "✅ Git repository initialized"
else
    echo "❌ Git repository not found. Run: git init"
    exit 1
fi

# Check for .env files
if [ -f backend/.env ]; then
    echo "✅ Backend .env file exists"
else
    echo "⚠️  Backend .env file not found. Copy backend/.env.example to backend/.env"
fi

if [ -f frontend/.env ]; then
    echo "✅ Frontend .env file exists"
else
    echo "⚠️  Frontend .env file not found. Copy frontend/.env.example to frontend/.env"
fi

# Check backend dependencies
echo ""
echo "Checking backend dependencies..."
cd backend
if [ -d node_modules ]; then
    echo "✅ Backend dependencies installed"
else
    echo "⚠️  Installing backend dependencies..."
    npm install
fi
cd ..

# Check frontend dependencies
echo ""
echo "Checking frontend dependencies..."
cd frontend
if [ -d node_modules ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "⚠️  Installing frontend dependencies..."
    npm install
fi
cd ..

# Test build
echo ""
echo "Testing frontend build..."
cd frontend
if npm run build; then
    echo "✅ Frontend builds successfully"
else
    echo "❌ Frontend build failed. Fix errors before deploying"
    exit 1
fi
cd ..

echo ""
echo "=========================================="
echo "🚀 Pre-deployment checks complete!"
echo ""
echo "Next steps:"
echo "1. Push your code to GitHub"
echo "2. Follow DEPLOYMENT.md for detailed instructions"
echo ""
