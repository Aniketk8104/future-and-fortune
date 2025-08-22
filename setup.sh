#!/bin/bash

# Future & Fortune - Setup Script
# This script helps set up the complete Future & Fortune website

echo "🚀 Setting up Future & Fortune website..."
echo "============================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to install dependencies"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "⚙️ Creating .env file..."
    cp .env.example .env
    echo "✅ Created .env file from template"
    echo "📝 Please edit .env with your actual values"
else
    echo "✅ .env file already exists"
fi

# Build the site
echo "🔨 Building the site..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to build the site"
    exit 1
fi

echo ""
echo "🎉 Setup completed successfully!"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Edit .env with your actual values (domain, email, phone, etc.)"
echo "2. Update contact information in components"
echo "3. Add your actual company logos and testimonial images"
echo "4. Replace placeholder phone numbers and social media links"
echo "5. Add a custom OG image (1200x630px) at public/og-image.jpg"
echo ""
echo "To start development server:"
echo "  npm run dev"
echo ""
echo "To build for production:"
echo "  npm run build"
echo ""
echo "To preview production build:"
echo "  npm run preview"
echo ""
echo "Deploy to Vercel:"
echo "  vercel --prod"
echo ""
echo "Deploy to Netlify:"
echo "  netlify deploy --prod --dir=dist"
echo ""
echo "🌟 Your Future & Fortune website is ready!"
