# Quick Start Guide

This is a fast-track guide to get you up and running with lennyforlibraries.org development and deployment.

## For Developers - First Time Setup

### 1. Clone and Setup (2 minutes)

```bash
# Clone the repository
git clone https://github.com/ArchiveLabs/lennyforlibraries.org.git
cd lennyforlibraries.org

# Checkout the new branch (active development branch)
git checkout new

# Install dependencies
bun install
```

### 2. Start Development Server (30 seconds)

```bash
bun run dev
```

Visit http://localhost:3000 - the page will auto-reload as you make changes.

### 3. Make Changes and Test

- Edit files in `app/`, `components/`, or `public/`
- Changes automatically reflect in your browser
- Before committing, verify the build works:

```bash
bun run build
```

## For Quick Testing

### Test Production Build Locally

```bash
# Build the site
bun run build

# Serve the static files
bunx serve out

# Or with Python
cd out && python3 -m http.server 8000
```

Visit http://localhost:8000 (or appropriate port)

## For Deployment

### Option 1: Automated with GitHub Actions

Push or merge to the `new` branch:

```bash
git push origin new
```

- GitHub Actions automatically builds the site
- Download artifacts from the Actions tab
- Deploy to your server

### Option 2: Manual Server Deployment

On your server:

```bash
# Navigate to repository
cd /var/www/lennyforlibraries.org

# Use the deployment script
./deploy.sh
```

The script will:
1. Pull latest code from `new` branch
2. Install dependencies
3. Build the site
4. Deploy to `build/` directory
5. Reload nginx

### Option 3: Quick Manual Deploy

```bash
# On local machine
bun run build
scp -r out/* user@server:/var/www/lennyforlibraries.org/build/

# On server
ssh user@server
sudo nginx -t && sudo systemctl reload nginx
```

## Key Commands

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Build static site |
| `bun run lint` | Check code quality |
| `./deploy.sh` | Automated deployment (server) |

## File Structure Quick Reference

```
lennyforlibraries.org/
├── app/                  # Pages and layouts
│   ├── page.tsx         # Homepage
│   └── layout.tsx       # Root layout
├── components/          # React components
├── public/             # Static assets (images, etc.)
├── out/                # Build output (gitignored)
├── .github/workflows/  # CI/CD automation
└── *.md                # Documentation files
```

## Nginx Configuration (One-Time Setup)

Edit your nginx config (usually `/etc/nginx/sites-available/lennyforlibraries.org`):

```nginx
server {
    listen 80;
    server_name lennyforlibraries.org www.lennyforlibraries.org;
    
    root /var/www/lennyforlibraries.org/build;
    index index.html;
    
    location / {
        try_files $uri $uri.html $uri/ /index.html;
    }
}
```

Test and reload:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete nginx configuration including security headers.

## Troubleshooting

### Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules .next out bun.lockb
bun install
bun run build
```

### Port 3000 Already in Use

```bash
# Kill the process
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 bun run dev
```

### Changes Not Showing

```bash
# Clear Next.js cache
rm -rf .next
bun run dev
```

## Need More Help?

- **Full Setup**: See [README.md](./README.md)
- **Deployment**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Development**: See [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)
- **Fonts**: See [FONTS.md](./FONTS.md)

## Current Build Status

✅ **Working on the `new` branch**
- Static export configured
- System fonts in use (Google Fonts optional)
- GitHub Actions workflow ready
- Build produces 62 files (~7.7MB)
- Ready for nginx deployment

---

**Quick Tips:**
- Always work on the `new` branch
- Test builds before committing: `bun run build`
- The `out/` directory contains your deployable static site
- Use `./deploy.sh` on the server for automated deployments
