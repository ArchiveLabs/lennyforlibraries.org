#!/bin/bash
# deploy.sh - Automated deployment script for lennyforlibraries.org
#
# This script uses Docker to build the static site in isolation,
# then copies the output for nginx to serve.

set -e  # Exit on error
set -u  # Exit on undefined variable

# Configuration - adjust these variables for your environment
REPO_DIR="${REPO_DIR:-/var/www/lennyforlibraries.org}"
BUILD_DIR="${BUILD_DIR:-$REPO_DIR/out}"
BRANCH="${BRANCH:-new}"
NODE_VERSION="${NODE_VERSION:-20}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_requirements() {
    log_info "Checking requirements..."
    
    # Check if Docker is installed
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed."
        exit 1
    fi
    
    # Check Docker version
    DOCKER_VERSION=$(docker --version)
    log_info "Using $DOCKER_VERSION"
    
    # Check if git is installed
    if ! command -v git &> /dev/null; then
        log_error "git is not installed."
        exit 1
    fi
    
    log_info "✓ All requirements met"
}

pull_latest_code() {
    log_info "Pulling latest code from branch: $BRANCH"
    
    cd "$REPO_DIR"
    
    # Fetch latest changes
    git fetch origin "$BRANCH"
    
    # Check if there are any changes
    LOCAL=$(git rev-parse HEAD)
    REMOTE=$(git rev-parse "origin/$BRANCH")
    
    if [ "$LOCAL" = "$REMOTE" ]; then
        log_warn "No new changes to deploy."
        return 1
    fi
    
    # Checkout and pull
    git checkout "$BRANCH"
    git pull origin "$BRANCH"
    
    log_info "✓ Code updated to latest version"
    return 0
}

build_site() {
    log_info "Building site with Docker..."
    
    cd "$REPO_DIR"
    
    # Remove old build artifacts
    rm -rf .next out
    
    # Build the builder image
    docker build --target builder -t lenny-builder .
    
    # Create container and copy files
    docker create --name lenny-builder-temp lenny-builder
    mkdir -p out
    docker cp lenny-builder-temp:/app/out/. out/
    docker rm lenny-builder-temp
    
    # Clean up builder image
    docker rmi lenny-builder
    
    log_info "✓ Site built successfully"
}

deploy_build() {
    log_info "Setting up build directory for nginx..."
    
    # The out/ directory is now ready for nginx
    # If you want a separate build/ directory, uncomment below:
    # mkdir -p "$BUILD_DIR"
    # rm -rf "$BUILD_DIR"/*
    # cp -r "$REPO_DIR"/out/* "$BUILD_DIR"/
    
    # Set proper permissions on out/
    find "$REPO_DIR/out" -type f -exec chmod 644 {} \;
    find "$REPO_DIR/out" -type d -exec chmod 755 {} \;
    
    log_info "✓ Build ready at $REPO_DIR/out"
}

reload_nginx() {
    log_info "Reloading nginx..."
    
    # Test nginx configuration
    if sudo nginx -t 2>/dev/null; then
        sudo systemctl reload nginx
        log_info "✓ Nginx reloaded successfully"
    else
        log_error "Nginx configuration test failed. Not reloading."
        return 1
    fi
}

display_summary() {
    log_info "Deployment complete!"
    echo ""
    echo "Summary:"
    echo "  Repository: $REPO_DIR"
    echo "  Branch: $BRANCH"
    echo "  Output directory: $REPO_DIR/out"
    echo "  Files deployed: $(find "$REPO_DIR/out" -type f | wc -l)"
    echo "  Total size: $(du -sh "$REPO_DIR/out" | cut -f1)"
    echo ""
    log_info "Your site is now live!"
}

# Main deployment flow
main() {
    log_info "Starting deployment of lennyforlibraries.org"
    echo ""
    
    check_requirements
    
    if ! pull_latest_code; then
        log_info "Deployment skipped - no changes to deploy"
        exit 0
    fi
    
    build_site
    deploy_build
    
    # Only reload nginx if it's installed and we have permissions
    if command -v nginx &> /dev/null; then
        reload_nginx || log_warn "Failed to reload nginx. You may need to reload it manually."
    else
        log_warn "nginx not found. Skipping nginx reload."
    fi
    
    display_summary
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --help|-h)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --repo-dir DIR     Repository directory (default: /var/www/lennyforlibraries.org)"
            echo "  --build-dir DIR    Build output directory (default: REPO_DIR/build)"
            echo "  --branch NAME      Git branch to deploy (default: new)"
            echo "  --help, -h         Show this help message"
            echo ""
            echo "Environment variables:"
            echo "  REPO_DIR           Same as --repo-dir"
            echo "  BUILD_DIR          Same as --build-dir"
            echo "  BRANCH             Same as --branch"
            exit 0
            ;;
        --repo-dir)
            REPO_DIR="$2"
            shift 2
            ;;
        --build-dir)
            BUILD_DIR="$2"
            shift 2
            ;;
        --branch)
            BRANCH="$2"
            shift 2
            ;;
        *)
            log_error "Unknown option: $1"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Run main deployment
main
