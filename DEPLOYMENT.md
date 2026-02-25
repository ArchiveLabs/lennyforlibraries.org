# Deployment Guide

This guide explains how to deploy the lennyforlibraries.org website to an nginx server.

## Overview

The build process generates static HTML, CSS, and JavaScript files in the `out/` directory. These files can be served by any static web server, including nginx.

## Build Process

### Automated Build (GitHub Actions)

The repository includes a GitHub Actions workflow that automatically builds the site when code is merged to the `new` branch. The workflow:

1. Checks out the code
2. Sets up Node.js
3. Installs dependencies
4. Runs the build process
5. Uploads the `out/` directory as a build artifact

You can download the build artifacts from the Actions tab in GitHub.

### Manual Build

To build the site manually:

```bash
# Install dependencies (first time only)
bun install

# Build the static site
bun run build
```

This creates an `out/` directory containing all static files.

## Nginx Deployment

### Current Setup

Based on your current setup, nginx serves from `/var/www/lennyforlibraries.org/`.

### Deployment Options

#### Option 1: Deploy to a build/ subdirectory (Recommended)

This approach keeps the git repository separate from the build artifacts:

1. Build the site (locally or via CI/CD)
2. Copy the `out/` directory contents to `/var/www/lennyforlibraries.org/build/`:

```bash
# On your local machine or CI server
bun run build

# Copy to server
scp -r out/* user@server:/var/www/lennyforlibraries.org/build/
```

3. Update nginx configuration to point to the build directory:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name lennyforlibraries.org www.lennyforlibraries.org;

    root /var/www/lennyforlibraries.org/build;
    index index.html;

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), interest-cohort=()" always;
    
    # Content Security Policy
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; media-src 'self' https://archive.org https://*.archive.org; frame-src 'self' https://www.youtube.com https://youtube.com https://archive.org https://*.archive.org; connect-src 'self' https://reader.archive.org https://*.archive.org; frame-ancestors 'none'; base-uri 'self'; form-action 'self'" always;

    # Serve static files with proper caching
    location /_next/static/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        add_header Cache-Control "public, max-age=604800";
    }

    # Handle Next.js routing
    location / {
        try_files $uri $uri.html $uri/ /index.html;
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
    }

    # HTTPS redirect (if using HTTPS)
    # listen 443 ssl http2;
    # listen [::]:443 ssl http2;
    # ssl_certificate /path/to/cert.pem;
    # ssl_certificate_key /path/to/key.pem;
}

# Redirect HTTP to HTTPS (if using HTTPS)
# server {
#     listen 80;
#     listen [::]:80;
#     server_name lennyforlibraries.org www.lennyforlibraries.org;
#     return 301 https://$server_name$request_uri;
# }
```

4. Test and reload nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

#### Option 2: Git-based deployment

If you want to deploy directly from the git repository:

1. On the server, navigate to the repository and build:

```bash
cd /var/www/lennyforlibraries.org
git fetch origin new
git checkout new
git pull origin new
bun install
bun run build
```

2. Update nginx to serve from the `out/` directory:

```nginx
server {
    # ... other configuration ...
    
    root /var/www/lennyforlibraries.org/out;
    
    # ... rest of configuration ...
}
```

3. Reload nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Automated Deployment Script

You can create a deployment script for easier updates:

```bash
#!/bin/bash
# deploy.sh - Automated deployment script

set -e  # Exit on error

REPO_DIR="/var/www/lennyforlibraries.org"
BUILD_DIR="$REPO_DIR/build"
BRANCH="new"

echo "Deploying lennyforlibraries.org..."

# Navigate to repo
cd "$REPO_DIR"

# Pull latest changes
echo "Pulling latest code from branch: $BRANCH"
git fetch origin "$BRANCH"
git checkout "$BRANCH"
git pull origin "$BRANCH"

# Install dependencies and build
echo "Installing dependencies..."
bun install --frozen-lockfile

echo "Building site..."
bun run build

# Copy build to deployment directory
echo "Copying build files..."
mkdir -p "$BUILD_DIR"
rm -rf "$BUILD_DIR"/*
cp -r out/* "$BUILD_DIR"/

# Reload nginx
echo "Reloading nginx..."
sudo nginx -t && sudo systemctl reload nginx

echo "Deployment complete!"
```

Make it executable:

```bash
chmod +x deploy.sh
```

## Continuous Deployment with GitHub Actions

The workflow file `.github/workflows/build.yml` automates building. To add automatic deployment:

1. Set up SSH keys for server access
2. Add server details as GitHub Secrets:
   - `DEPLOY_HOST`: Server hostname
   - `DEPLOY_USER`: SSH username
   - `DEPLOY_KEY`: SSH private key
   - `DEPLOY_PATH`: Deployment path

3. The workflow will automatically build and deploy on push to the `new` branch.

See the workflow file for implementation details.

## Troubleshooting

### Build Fails

- Ensure Bun is installed (or Node.js version 20 or higher)
- Clear cache and reinstall: `rm -rf node_modules .next && bun install`
- Check build logs for specific errors

### Nginx Not Serving Files

- Verify file permissions: `ls -la /var/www/lennyforlibraries.org/build/`
- Check nginx error logs: `sudo tail -f /var/log/nginx/error.log`
- Verify nginx configuration: `sudo nginx -t`

### 404 Errors

- Ensure `try_files` directive is configured correctly
- Verify all necessary files are in the deployment directory

## Performance Optimization

### Enable Gzip Compression

Add to nginx configuration:

```nginx
gzip on;
gzip_vary on;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/json application/xml+rss;
gzip_min_length 1000;
```

### Enable HTTP/2

If using HTTPS, enable HTTP/2 for better performance:

```nginx
listen 443 ssl http2;
listen [::]:443 ssl http2;
```

## Security Considerations

1. **HTTPS**: Always use HTTPS in production (use Let's Encrypt for free certificates)
2. **Security Headers**: The provided nginx config includes security headers
3. **File Permissions**: Ensure proper file permissions (644 for files, 755 for directories)
4. **Regular Updates**: Keep dependencies updated and rebuild regularly

## Monitoring

Consider setting up monitoring to track:
- Nginx access/error logs
- Site availability
- Response times
- SSL certificate expiration

## Support

For issues or questions:
- Check GitHub Issues: https://github.com/ArchiveLabs/lennyforlibraries.org/issues
- Review Next.js deployment docs: https://nextjs.org/docs/app/building-your-application/deploying
