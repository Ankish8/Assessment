#!/bin/bash

# =============================================================================
# MAPIT Storybook Repository Setup Script
# =============================================================================
# This script sets up the coding directory for deployment to GitHub Pages
# Run this script FROM INSIDE /Users/ankish/Downloads/MA/coding directory
# =============================================================================

set -euo pipefail  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
REPO_URL="https://github.com/Ankish8/MAPIT-storybook.git"
REPO_NAME="MAPIT-storybook"
TARGET_BRANCH="main"

# Function to print colored output
print_step() {
    echo -e "${BLUE}[SETUP]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if we're in the right directory
check_directory() {
    print_step "Checking current directory..."
    
    if [[ ! -f "package.json" ]]; then
        print_error "package.json not found. Please run this script from the coding directory."
        exit 1
    fi
    
    if [[ ! -d ".git" ]]; then
        print_error ".git directory not found. Please run this script from the coding directory."
        exit 1
    fi
    
    # Check if this looks like the right project
    if grep -q "storybook" package.json; then
        print_success "Found Storybook project configuration"
    else
        print_warning "This doesn't appear to be a Storybook project"
        read -p "Continue anyway? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
    
    print_success "Directory validation passed"
}

# Function to backup current git configuration
backup_git_config() {
    print_step "Backing up current git configuration..."
    
    if git remote get-url origin 2>/dev/null; then
        CURRENT_ORIGIN=$(git remote get-url origin)
        echo "$CURRENT_ORIGIN" > .git-origin-backup
        print_success "Backed up current origin: $CURRENT_ORIGIN"
    else
        print_warning "No current origin found"
    fi
}

# Function to setup git repository
setup_git_repository() {
    print_step "Setting up git repository..."
    
    # Remove existing origin if it exists
    if git remote get-url origin 2>/dev/null; then
        print_step "Removing existing origin..."
        git remote remove origin
    fi
    
    # Add new origin
    print_step "Adding new origin: $REPO_URL"
    git remote add origin "$REPO_URL"
    
    # Verify remote
    if git remote get-url origin; then
        print_success "Origin set successfully"
    else
        print_error "Failed to set origin"
        exit 1
    fi
    
    # Check current branch
    CURRENT_BRANCH=$(git branch --show-current)
    print_step "Current branch: $CURRENT_BRANCH"
    
    if [[ "$CURRENT_BRANCH" != "$TARGET_BRANCH" ]]; then
        print_step "Switching to $TARGET_BRANCH branch..."
        
        # Create main branch if it doesn't exist
        if ! git show-ref --verify --quiet "refs/heads/$TARGET_BRANCH"; then
            git checkout -b "$TARGET_BRANCH"
            print_success "Created and switched to $TARGET_BRANCH branch"
        else
            git checkout "$TARGET_BRANCH"
            print_success "Switched to $TARGET_BRANCH branch"
        fi
    fi
}

# Function to create GitHub workflows directory
setup_github_workflows() {
    print_step "Setting up GitHub Actions workflow..."
    
    # Create .github/workflows directory
    mkdir -p .github/workflows
    
    # Check if workflow file exists
    if [[ -f ".github/workflows/deploy-storybook.yml" ]]; then
        print_warning "Workflow file already exists"
        read -p "Overwrite existing workflow? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_step "Skipping workflow setup"
            return
        fi
    fi
    
    print_step "You need to copy the deploy-storybook.yml file to .github/workflows/"
    print_step "The file is located at: DEPLOY-TO-CODING/deploy-storybook.yml"
    
    read -p "Press Enter after you've copied the workflow file..."
    
    # Verify workflow file
    if [[ -f ".github/workflows/deploy-storybook.yml" ]]; then
        print_success "Workflow file found"
    else
        print_error "Workflow file not found. Please copy it manually."
        exit 1
    fi
}

# Function to optimize package.json for deployment
optimize_package_json() {
    print_step "Checking package.json optimization..."
    
    # Check if build-storybook script exists
    if grep -q "build-storybook" package.json; then
        print_success "build-storybook script found"
    else
        print_error "build-storybook script not found in package.json"
        print_step "Please add: \"build-storybook\": \"storybook build\""
        exit 1
    fi
    
    # Check for memory optimization
    if grep -q "max-old-space-size" package.json; then
        print_success "Memory optimization already configured"
    else
        print_warning "Consider adding memory optimization for large builds"
        print_step "Recommended: \"build-storybook\": \"NODE_OPTIONS='--max-old-space-size=8192' storybook build\""
    fi
}

# Function to check project health
check_project_health() {
    print_step "Checking project health..."
    
    # Check if node_modules exists
    if [[ -d "node_modules" ]]; then
        print_success "node_modules directory found"
    else
        print_warning "node_modules not found. Running npm install..."
        npm install
    fi
    
    # Check if storybook can build (quick test)
    print_step "Testing Storybook build (this may take a while)..."
    if timeout 300 npm run build-storybook 2>/dev/null; then
        print_success "Storybook builds successfully"
    else
        print_warning "Storybook build test failed or timed out"
        print_step "You may need to fix build issues before deployment"
    fi
}

# Function to prepare initial commit
prepare_initial_commit() {
    print_step "Preparing initial commit..."
    
    # Check git status
    if [[ -n $(git status --porcelain) ]]; then
        print_step "Found uncommitted changes"
        
        # Show status
        echo "Current git status:"
        git status --short
        echo
        
        read -p "Commit all changes for deployment? (Y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Nn]$ ]]; then
            print_step "Skipping commit. You can commit manually later."
            return
        fi
        
        # Add all files
        print_step "Adding all files..."
        git add .
        
        # Create commit
        print_step "Creating commit..."
        git commit -m "Initial Storybook deployment setup

- Add GitHub Actions workflow for automated deployment
- Configure Angular Storybook for GitHub Pages
- Optimize build configuration for large component library
- Set up automated deployment pipeline"
        
        print_success "Initial commit created"
    else
        print_success "Working directory is clean"
    fi
}

# Function to push to repository
push_to_repository() {
    print_step "Pushing to repository..."
    
    read -p "Push to GitHub repository now? (Y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Nn]$ ]]; then
        print_step "Skipping push. You can push manually with: git push -u origin $TARGET_BRANCH"
        return
    fi
    
    # Push with upstream tracking
    print_step "Pushing to origin/$TARGET_BRANCH..."
    if git push -u origin "$TARGET_BRANCH"; then
        print_success "Successfully pushed to repository"
    else
        print_error "Failed to push to repository"
        print_step "You may need to push manually or check repository permissions"
        exit 1
    fi
}

# Function to display next steps
display_next_steps() {
    echo
    echo "============================================="
    echo -e "${GREEN}🎉 Repository Setup Complete!${NC}"
    echo "============================================="
    echo
    echo "Next steps:"
    echo "1. Go to: https://github.com/Ankish8/MAPIT-storybook/settings/pages"
    echo "2. Under 'Source', select 'GitHub Actions'"
    echo "3. Click 'Save'"
    echo "4. Wait for the workflow to run (check Actions tab)"
    echo "5. Your Storybook will be live at: https://ankish8.github.io/MAPIT-storybook/"
    echo
    echo "Monitor deployment:"
    echo "- Actions: https://github.com/Ankish8/MAPIT-storybook/actions"
    echo "- Settings: https://github.com/Ankish8/MAPIT-storybook/settings/pages"
    echo
    echo -e "${YELLOW}Important:${NC} If the build fails, check the Actions tab for error details."
    echo
}

# Main execution
main() {
    echo "============================================="
    echo -e "${BLUE}🚀 MAPIT Storybook Deployment Setup${NC}"
    echo "============================================="
    echo
    
    check_directory
    backup_git_config
    setup_git_repository
    setup_github_workflows
    optimize_package_json
    check_project_health
    prepare_initial_commit
    push_to_repository
    display_next_steps
}

# Run main function
main "$@"