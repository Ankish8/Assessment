#!/bin/bash

# =============================================================================
# Quick Setup Script for MAPIT Storybook Deployment
# =============================================================================
# Run this FROM INSIDE /Users/ankish/Downloads/MA/coding directory
# =============================================================================

echo "🚀 Quick MAPIT Storybook Setup"
echo "==============================="

# Check if we're in the right place
if [[ ! -f "package.json" ]] || [[ ! -d ".git" ]]; then
    echo "❌ Error: Please run this from the coding directory"
    echo "Expected location: /Users/ankish/Downloads/MA/coding"
    exit 1
fi

echo "✅ Directory check passed"

# Setup git remote
echo "🔧 Setting up git remote..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/Ankish8/MAPIT-storybook.git

# Switch to main branch
CURRENT_BRANCH=$(git branch --show-current)
if [[ "$CURRENT_BRANCH" != "main" ]]; then
    echo "🔄 Switching to main branch..."
    git checkout -b main 2>/dev/null || git checkout main
fi

# Create GitHub workflows directory
echo "📁 Creating GitHub Actions directory..."
mkdir -p .github/workflows

echo ""
echo "📋 Manual Steps Required:"
echo "========================="
echo ""
echo "1. Copy the workflow file:"
echo "   cp DEPLOY-TO-CODING/deploy-storybook.yml .github/workflows/"
echo ""
echo "2. Commit and push:"
echo "   git add ."
echo "   git commit -m 'Add Storybook deployment'"
echo "   git push -u origin main"
echo ""
echo "3. Enable GitHub Pages:"
echo "   - Go to: https://github.com/Ankish8/MAPIT-storybook/settings/pages"
echo "   - Source: 'GitHub Actions'"
echo "   - Save"
echo ""
echo "4. Your Storybook will be live at:"
echo "   https://ankish8.github.io/MAPIT-storybook/"
echo ""

read -p "Press Enter to continue with automated steps..."

# Test if we can build
echo "🧪 Testing Storybook build..."
if npm run build-storybook --silent; then
    echo "✅ Build test successful"
else
    echo "⚠️  Build test failed - you may need to fix issues"
fi

echo ""
echo "🎉 Quick setup complete!"
echo "Follow the manual steps above to finish deployment."