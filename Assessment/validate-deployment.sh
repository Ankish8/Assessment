#!/bin/bash

# =============================================================================
# MAPIT Storybook Deployment Validation Script
# =============================================================================
# Comprehensive validation for pre and post-deployment testing
# Usage: ./validate-deployment.sh [pre|post] [url]
# =============================================================================

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Configuration
EXPECTED_STORY_COUNT=200
MAX_LOAD_TIME=5
MIN_ACCESSIBILITY_SCORE=90

# Functions for colored output
print_header() {
    echo -e "\n${CYAN}========================================${NC}"
    echo -e "${CYAN}$1${NC}"
    echo -e "${CYAN}========================================${NC}\n"
}

print_step() {
    echo -e "${BLUE}[VALIDATE]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[✓ PASS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[⚠ WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗ FAIL]${NC} $1"
}

print_info() {
    echo -e "${CYAN}[INFO]${NC} $1"
}

# Global validation counters
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0
WARNING_TESTS=0

increment_test() {
    ((TOTAL_TESTS++))
}

increment_pass() {
    ((PASSED_TESTS++))
    increment_test
}

increment_fail() {
    ((FAILED_TESTS++))
    increment_test
}

increment_warning() {
    ((WARNING_TESTS++))
    increment_test
}

# Pre-deployment validation functions
validate_environment() {
    print_header "Environment Validation"
    
    # Check Node.js version
    print_step "Checking Node.js version..."
    NODE_VERSION=$(node --version)
    if [[ "${NODE_VERSION}" =~ ^v(18|20|22)\. ]]; then
        print_success "Node.js version: $NODE_VERSION"
        increment_pass
    else
        print_error "Unsupported Node.js version: $NODE_VERSION"
        increment_fail
    fi
    
    # Check npm version
    print_step "Checking npm version..."
    NPM_VERSION=$(npm --version)
    print_success "npm version: $NPM_VERSION"
    increment_pass
    
    # Check Angular CLI
    print_step "Checking Angular CLI..."
    if command -v ng &> /dev/null; then
        NG_VERSION=$(ng version --skip-git 2>/dev/null | head -1 || echo "Angular CLI available")
        print_success "Angular CLI: $NG_VERSION"
        increment_pass
    else
        print_warning "Angular CLI not found globally"
        increment_warning
    fi
    
    # Check available memory
    print_step "Checking available memory..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        MEMORY_GB=$(sysctl -n hw.memsize | awk '{print int($1/1024/1024/1024)}')
    else
        MEMORY_GB=$(free -g | awk '/^Mem:/{print $2}')
    fi
    
    if [[ $MEMORY_GB -ge 8 ]]; then
        print_success "Available memory: ${MEMORY_GB}GB"
        increment_pass
    else
        print_warning "Low memory: ${MEMORY_GB}GB (recommended: 8GB+)"
        increment_warning
    fi
}

validate_project_structure() {
    print_header "Project Structure Validation"
    
    # Check package.json
    print_step "Checking package.json..."
    if [[ -f "package.json" ]]; then
        print_success "package.json found"
        increment_pass
        
        # Check for required scripts
        if grep -q "build-storybook" package.json; then
            print_success "build-storybook script found"
            increment_pass
        else
            print_error "build-storybook script missing"
            increment_fail
        fi
        
        if grep -q "storybook" package.json; then
            print_success "storybook script found"
            increment_pass
        else
            print_error "storybook script missing"
            increment_fail
        fi
    else
        print_error "package.json not found"
        increment_fail
    fi
    
    # Check .storybook directory
    print_step "Checking .storybook configuration..."
    if [[ -d ".storybook" ]]; then
        print_success ".storybook directory found"
        increment_pass
        
        if [[ -f ".storybook/main.ts" || -f ".storybook/main.js" ]]; then
            print_success "Storybook main configuration found"
            increment_pass
        else
            print_error "Storybook main configuration missing"
            increment_fail
        fi
        
        if [[ -f ".storybook/preview.ts" || -f ".storybook/preview.js" ]]; then
            print_success "Storybook preview configuration found"
            increment_pass
        else
            print_warning "Storybook preview configuration missing"
            increment_warning
        fi
    else
        print_error ".storybook directory not found"
        increment_fail
    fi
    
    # Check for story files
    print_step "Checking story files..."
    STORY_FILES=$(find . -name "*.stories.*" -type f | wc -l)
    if [[ $STORY_FILES -gt 0 ]]; then
        print_success "Found $STORY_FILES story files"
        increment_pass
        
        if [[ $STORY_FILES -ge $EXPECTED_STORY_COUNT ]]; then
            print_success "Story count meets expectations (${STORY_FILES} >= ${EXPECTED_STORY_COUNT})"
            increment_pass
        else
            print_warning "Story count below expectation (${STORY_FILES} < ${EXPECTED_STORY_COUNT})"
            increment_warning
        fi
    else
        print_error "No story files found"
        increment_fail
    fi
    
    # Check GitHub Actions workflow
    print_step "Checking GitHub Actions workflow..."
    if [[ -f ".github/workflows/deploy-storybook.yml" ]]; then
        print_success "Deployment workflow found"
        increment_pass
    else
        print_error "Deployment workflow missing"
        increment_fail
    fi
}

validate_dependencies() {
    print_header "Dependencies Validation"
    
    # Check if node_modules exists
    print_step "Checking node_modules..."
    if [[ -d "node_modules" ]]; then
        print_success "node_modules directory found"
        increment_pass
    else
        print_warning "node_modules not found - running npm install..."
        npm install
        if [[ -d "node_modules" ]]; then
            print_success "Dependencies installed successfully"
            increment_pass
        else
            print_error "Failed to install dependencies"
            increment_fail
        fi
    fi
    
    # Check for security vulnerabilities
    print_step "Checking for security vulnerabilities..."
    if npm audit --audit-level=high > /dev/null 2>&1; then
        print_success "No high-severity vulnerabilities found"
        increment_pass
    else
        print_warning "Security vulnerabilities detected - consider running 'npm audit fix'"
        increment_warning
    fi
    
    # Check for outdated packages
    print_step "Checking for outdated packages..."
    OUTDATED_COUNT=$(npm outdated --json 2>/dev/null | jq '. | length' || echo "0")
    if [[ $OUTDATED_COUNT -eq 0 ]]; then
        print_success "All packages are up to date"
        increment_pass
    else
        print_warning "$OUTDATED_COUNT packages are outdated"
        increment_warning
    fi
}

validate_build() {
    print_header "Build Validation"
    
    print_step "Testing Storybook build..."
    
    # Clean previous build
    if [[ -d "storybook-static" ]]; then
        rm -rf storybook-static
    fi
    
    # Measure build time
    start_time=$(date +%s)
    
    if npm run build-storybook > build.log 2>&1; then
        end_time=$(date +%s)
        build_time=$((end_time - start_time))
        
        print_success "Build completed in ${build_time}s"
        increment_pass
        
        # Check build output
        if [[ -d "storybook-static" ]]; then
            print_success "Build output directory created"
            increment_pass
            
            # Check essential files
            if [[ -f "storybook-static/index.html" ]]; then
                print_success "Main index.html created"
                increment_pass
            else
                print_error "Main index.html missing"
                increment_fail
            fi
            
            # Check build size
            BUILD_SIZE=$(du -sh storybook-static | cut -f1)
            print_info "Build size: $BUILD_SIZE"
            
            # Count generated files
            FILE_COUNT=$(find storybook-static -type f | wc -l)
            print_info "Generated files: $FILE_COUNT"
            
        else
            print_error "Build output directory not created"
            increment_fail
        fi
    else
        print_error "Build failed"
        increment_fail
        print_info "Build log saved to build.log"
    fi
}

# Post-deployment validation functions
validate_deployment_url() {
    local url=$1
    print_header "Deployment URL Validation"
    
    print_step "Checking URL accessibility: $url"
    
    # Check if URL is reachable
    if curl -sSf "$url" > /dev/null; then
        print_success "URL is accessible"
        increment_pass
    else
        print_error "URL is not accessible"
        increment_fail
        return 1
    fi
    
    # Check for Storybook content
    print_step "Checking for Storybook content..."
    CONTENT=$(curl -s "$url")
    
    if echo "$CONTENT" | grep -q "storybook\|Storybook"; then
        print_success "Storybook content detected"
        increment_pass
    else
        print_warning "Storybook content not clearly identified"
        increment_warning
    fi
    
    # Check for essential Storybook elements
    if echo "$CONTENT" | grep -q "sb-"; then
        print_success "Storybook UI elements found"
        increment_pass
    else
        print_warning "Storybook UI elements not found"
        increment_warning
    fi
    
    return 0
}

validate_performance() {
    local url=$1
    print_header "Performance Validation"
    
    print_step "Measuring page load time..."
    
    # Simple load time measurement
    start_time=$(date +%s%N)
    if curl -sSf "$url" > /dev/null; then
        end_time=$(date +%s%N)
        load_time_ms=$(( (end_time - start_time) / 1000000 ))
        load_time_s=$(echo "scale=2; $load_time_ms/1000" | bc)
        
        if (( $(echo "$load_time_s < $MAX_LOAD_TIME" | bc -l) )); then
            print_success "Load time: ${load_time_s}s (< ${MAX_LOAD_TIME}s)"
            increment_pass
        else
            print_warning "Load time: ${load_time_s}s (>= ${MAX_LOAD_TIME}s)"
            increment_warning
        fi
    else
        print_error "Failed to measure load time"
        increment_fail
    fi
    
    # Check for compression
    print_step "Checking content compression..."
    CONTENT_ENCODING=$(curl -sI "$url" | grep -i "content-encoding" || echo "")
    if [[ -n "$CONTENT_ENCODING" ]]; then
        print_success "Content compression enabled: $CONTENT_ENCODING"
        increment_pass
    else
        print_warning "Content compression not detected"
        increment_warning
    fi
    
    # Check caching headers
    print_step "Checking caching headers..."
    CACHE_CONTROL=$(curl -sI "$url" | grep -i "cache-control" || echo "")
    if [[ -n "$CACHE_CONTROL" ]]; then
        print_success "Cache headers present: $CACHE_CONTROL"
        increment_pass
    else
        print_warning "Cache headers not found"
        increment_warning
    fi
}

validate_functionality() {
    local url=$1
    print_header "Functionality Validation"
    
    print_step "Checking iframe endpoint..."
    iframe_url="${url%/}/iframe.html"
    if curl -sSf "$iframe_url" > /dev/null; then
        print_success "Iframe endpoint accessible"
        increment_pass
    else
        print_error "Iframe endpoint not accessible"
        increment_fail
    fi
    
    print_step "Checking story navigation..."
    # This is a basic check - for comprehensive testing, you'd need browser automation
    if curl -s "$url" | grep -q "navigation\|nav\|menu"; then
        print_success "Navigation elements detected"
        increment_pass
    else
        print_warning "Navigation elements not clearly detected"
        increment_warning
    fi
    
    print_step "Checking for JavaScript errors..."
    # Basic check for common error patterns in the HTML
    CONTENT=$(curl -s "$url")
    if echo "$CONTENT" | grep -q "error\|Error\|ERROR"; then
        print_warning "Potential errors detected in content"
        increment_warning
    else
        print_success "No obvious errors in content"
        increment_pass
    fi
}

# Report generation
generate_report() {
    print_header "Validation Report"
    
    echo -e "Total Tests: $TOTAL_TESTS"
    echo -e "${GREEN}Passed: $PASSED_TESTS${NC}"
    echo -e "${YELLOW}Warnings: $WARNING_TESTS${NC}"
    echo -e "${RED}Failed: $FAILED_TESTS${NC}"
    
    # Calculate success rate
    if [[ $TOTAL_TESTS -gt 0 ]]; then
        SUCCESS_RATE=$(( (PASSED_TESTS * 100) / TOTAL_TESTS ))
        echo -e "\nSuccess Rate: ${SUCCESS_RATE}%"
        
        if [[ $SUCCESS_RATE -ge 90 ]]; then
            print_success "Excellent validation results!"
        elif [[ $SUCCESS_RATE -ge 75 ]]; then
            print_warning "Good validation results with some issues"
        else
            print_error "Poor validation results - review failed tests"
        fi
    fi
    
    # Exit code based on results
    if [[ $FAILED_TESTS -eq 0 ]]; then
        exit 0
    else
        exit 1
    fi
}

# Main execution
main() {
    local mode=${1:-"pre"}
    local url=${2:-""}
    
    print_header "MAPIT Storybook Validation - $mode"
    
    if [[ "$mode" == "pre" ]]; then
        validate_environment
        validate_project_structure
        validate_dependencies
        validate_build
    elif [[ "$mode" == "post" ]]; then
        if [[ -z "$url" ]]; then
            print_error "URL required for post-deployment validation"
            echo "Usage: $0 post <url>"
            exit 1
        fi
        
        validate_deployment_url "$url"
        if [[ $? -eq 0 ]]; then
            validate_performance "$url"
            validate_functionality "$url"
        fi
    else
        print_error "Invalid mode. Use 'pre' or 'post'"
        echo "Usage: $0 [pre|post] [url]"
        exit 1
    fi
    
    generate_report
}

# Run main function
main "$@"