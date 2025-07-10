#!/bin/bash

# =============================================================================
# Quick Test Script for MAPIT Storybook
# =============================================================================
# Fast validation for development and CI/CD pipelines
# Usage: ./quick-test.sh [build|deploy|url]
# =============================================================================

set -euo pipefail

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_test() {
    echo -e "${BLUE}[TEST]${NC} $1"
}

print_pass() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_fail() {
    echo -e "${RED}[✗]${NC} $1"
}

print_warn() {
    echo -e "${YELLOW}[⚠]${NC} $1"
}

# Quick build test
test_build() {
    echo "🧪 Quick Build Test"
    echo "=================="
    
    print_test "Checking dependencies..."
    if [[ -d "node_modules" ]]; then
        print_pass "Dependencies installed"
    else
        print_warn "Installing dependencies..."
        npm install --silent
    fi
    
    print_test "Checking Storybook config..."
    if [[ -f ".storybook/main.ts" ]] || [[ -f ".storybook/main.js" ]]; then
        print_pass "Storybook config found"
    else
        print_fail "Storybook config missing"
        exit 1
    fi
    
    print_test "Testing build..."
    if timeout 300 npm run build-storybook --silent > /dev/null 2>&1; then
        print_pass "Build successful"
    else
        print_fail "Build failed"
        exit 1
    fi
    
    print_test "Checking output..."
    if [[ -f "storybook-static/index.html" ]]; then
        print_pass "Build output valid"
        BUILD_SIZE=$(du -sh storybook-static | cut -f1)
        echo "   📊 Build size: $BUILD_SIZE"
    else
        print_fail "Build output invalid"
        exit 1
    fi
    
    echo -e "\n✅ Quick build test passed!"
}

# Quick deployment test
test_deploy() {
    echo "🚀 Quick Deploy Test"
    echo "==================="
    
    print_test "Checking git repository..."
    if git remote get-url origin &>/dev/null; then
        print_pass "Git remote configured"
        echo "   📍 Remote: $(git remote get-url origin)"
    else
        print_fail "Git remote not configured"
        exit 1
    fi
    
    print_test "Checking GitHub Actions workflow..."
    if [[ -f ".github/workflows/deploy-storybook.yml" ]]; then
        print_pass "Deployment workflow found"
    else
        print_fail "Deployment workflow missing"
        exit 1
    fi
    
    print_test "Checking git status..."
    if [[ -z $(git status --porcelain) ]]; then
        print_pass "Working directory clean"
    else
        print_warn "Uncommitted changes detected"
        git status --short
    fi
    
    print_test "Testing GitHub connection..."
    if git ls-remote origin HEAD &>/dev/null; then
        print_pass "GitHub repository accessible"
    else
        print_fail "Cannot access GitHub repository"
        exit 1
    fi
    
    echo -e "\n✅ Quick deploy test passed!"
}

# Quick URL test
test_url() {
    local url=$1
    echo "🌐 Quick URL Test"
    echo "================="
    echo "Testing: $url"
    
    print_test "Checking accessibility..."
    if curl -sSf --max-time 10 "$url" > /dev/null; then
        print_pass "URL accessible"
    else
        print_fail "URL not accessible"
        exit 1
    fi
    
    print_test "Checking content..."
    CONTENT=$(curl -s --max-time 10 "$url")
    if echo "$CONTENT" | grep -q "storybook\|Storybook"; then
        print_pass "Storybook content detected"
    else
        print_warn "Storybook content not clearly detected"
    fi
    
    print_test "Checking response time..."
    start_time=$(date +%s%N)
    curl -sSf --max-time 10 "$url" > /dev/null
    end_time=$(date +%s%N)
    response_time=$(( (end_time - start_time) / 1000000 ))
    
    if [[ $response_time -lt 3000 ]]; then
        print_pass "Response time: ${response_time}ms"
    else
        print_warn "Slow response time: ${response_time}ms"
    fi
    
    print_test "Checking iframe endpoint..."
    iframe_url="${url%/}/iframe.html"
    if curl -sSf --max-time 10 "$iframe_url" > /dev/null; then
        print_pass "Iframe endpoint accessible"
    else
        print_fail "Iframe endpoint not accessible"
    fi
    
    echo -e "\n✅ Quick URL test passed!"
}

# Show usage
show_usage() {
    cat << EOF
Quick Test Script for MAPIT Storybook

Usage: $0 [command] [options]

Commands:
  build             Test local Storybook build
  deploy            Test deployment readiness
  url <url>         Test deployed Storybook URL
  
Examples:
  $0 build
  $0 deploy  
  $0 url https://ankish8.github.io/MAPIT-storybook/

This script performs quick validation tests for:
- Build process and output
- Deployment configuration  
- Live site functionality

For comprehensive testing, use validate-deployment.sh
EOF
}

main() {
    if [[ $# -eq 0 ]]; then
        show_usage
        exit 1
    fi
    
    case $1 in
        "build")
            test_build
            ;;
        "deploy")
            test_deploy
            ;;
        "url")
            if [[ $# -lt 2 ]]; then
                echo "Error: URL required for url test"
                echo "Usage: $0 url <url>"
                exit 1
            fi
            test_url "$2"
            ;;
        "--help"|"-h")
            show_usage
            ;;
        *)
            echo "Error: Unknown command '$1'"
            show_usage
            exit 1
            ;;
    esac
}

main "$@"