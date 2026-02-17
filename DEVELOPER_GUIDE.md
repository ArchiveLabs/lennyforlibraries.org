# Developer Guide

This guide provides instructions for developers and AI agents working on lennyforlibraries.org.

## Quick Setup

### For Human Developers

1. **Clone and install**:
   ```bash
   git clone https://github.com/ArchiveLabs/lennyforlibraries.org.git
   cd lennyforlibraries.org
   git checkout new  # Work on the 'new' branch
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000

3. **Build and test**:
   ```bash
   npm run build
   npx serve out  # Test the production build
   ```

### For AI Agents

When working on this repository:

1. **Always work on the `new` branch** - this is the active development branch
2. **The project is at the root** - all Next.js files are in the repository root (not in a subdirectory)
3. **Build output goes to `out/`** - this directory is gitignored and contains static files
4. **Test builds before committing** - always verify that `npm run build` completes successfully

## Project Architecture

### Technology Stack

- **Next.js 16**: React framework with App Router
- **TypeScript**: For type safety
- **Tailwind CSS 4**: Utility-first styling
- **Static Export**: Builds to static HTML/CSS/JS

### Key Files and Directories

```
lennyforlibraries.org/
├── .github/workflows/     # GitHub Actions CI/CD
│   └── build.yml         # Automated build workflow
├── app/                  # Next.js App Router
│   ├── page.tsx         # Homepage
│   ├── layout.tsx       # Root layout
│   ├── globals.css      # Global styles
│   └── sitemap.ts       # Sitemap generation
├── components/          # React components
│   ├── home/           # Homepage sections
│   ├── layout/         # Layout components
│   └── ui/             # Reusable UI components
├── lib/                # Utilities and hooks
├── public/             # Static assets
├── nginx/              # Nginx config examples
├── next.config.ts      # Next.js configuration
├── package.json        # Dependencies and scripts
├── README.md           # User-facing documentation
├── DEPLOYMENT.md       # Deployment instructions
└── DEVELOPER_GUIDE.md  # This file
```

### Configuration Files

- **next.config.ts**: Configured for static export with `output: 'export'`
- **tsconfig.json**: TypeScript compiler configuration
- **tailwind.config.ts**: (if exists) Tailwind CSS configuration
- **eslint.config.mjs**: ESLint rules

## Development Workflow

### Making Changes

1. **Create a feature branch** (optional but recommended):
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** - edit files as needed

3. **Test locally**:
   ```bash
   npm run dev  # Development server
   npm run lint # Check for linting errors
   npm run build # Verify build works
   ```

4. **Commit and push**:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin feature/your-feature-name
   ```

5. **Create a pull request** to merge into the `new` branch

### Testing the Build

Always test the production build before committing:

```bash
# Build the site
npm run build

# Verify the out/ directory was created
ls -la out/

# Test the static site locally
npx serve out
# or
cd out && python3 -m http.server 8000
```

Visit the local server to verify:
- All pages load correctly
- Navigation works
- Images and assets load
- No console errors

## Common Tasks

### Adding a New Page

1. Create a new directory in `app/`:
   ```bash
   mkdir app/about
   ```

2. Add a `page.tsx`:
   ```typescript
   // app/about/page.tsx
   export default function AboutPage() {
     return (
       <div>
         <h1>About</h1>
         <p>About content here</p>
       </div>
     );
   }
   ```

3. The page will be accessible at `/about`

### Adding a New Component

1. Create the component file:
   ```bash
   touch components/ui/my-component.tsx
   ```

2. Implement the component:
   ```typescript
   export function MyComponent() {
     return <div>Component content</div>;
   }
   ```

3. Import and use it:
   ```typescript
   import { MyComponent } from '@/components/ui/my-component';
   ```

### Updating Styles

- Global styles: Edit `app/globals.css`
- Component styles: Use Tailwind classes directly in JSX
- Custom utilities: Add to Tailwind config

### Adding Dependencies

```bash
# Install a new package
npm install package-name

# Install as dev dependency
npm install -D package-name

# Always run build after adding dependencies
npm run build
```

## Build Process Details

### What Happens During Build

1. **Dependency Resolution**: npm installs all required packages
2. **TypeScript Compilation**: All `.ts` and `.tsx` files are compiled
3. **Static Generation**: Next.js generates HTML for all pages
4. **Asset Optimization**: Images, CSS, and JS are optimized
5. **Output**: Static files are placed in `out/` directory

### Build Output Structure

```
out/
├── index.html           # Homepage
├── _next/              # Next.js assets
│   ├── static/         # Hashed static assets (CSS, JS)
│   └── ...
├── images/             # Optimized images
└── ...                 # Other pages and assets
```

### Build Artifacts (Gitignored)

These directories are generated during development/build and should never be committed:

- `node_modules/` - Dependencies
- `.next/` - Next.js build cache
- `out/` - Production build output
- `.vercel/` - Vercel deployment info
- `*.tsbuildinfo` - TypeScript build info

## Troubleshooting

### Build Errors

**Problem**: `npm run build` fails with TypeScript errors
**Solution**: 
```bash
# Check for type errors
npx tsc --noEmit
# Fix reported errors
```

**Problem**: Build fails with "Cannot find module"
**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Problem**: Build works locally but fails in CI
**Solution**: Check Node.js version matches CI (v20)

### Development Server Issues

**Problem**: Port 3000 already in use
**Solution**:
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Or use a different port
PORT=3001 npm run dev
```

**Problem**: Changes not reflecting
**Solution**:
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

## Testing Checklist

Before submitting changes:

- [ ] Code builds without errors (`npm run build`)
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] No linting errors (`npm run lint`)
- [ ] Development server runs (`npm run dev`)
- [ ] Production build tested locally (`npx serve out`)
- [ ] All pages accessible and working
- [ ] No console errors in browser
- [ ] Responsive design works (test mobile view)
- [ ] Images and assets load correctly

## CI/CD Pipeline

### GitHub Actions Workflow

The `.github/workflows/build.yml` workflow:

1. **Triggers on**:
   - Push to `new` branch
   - Pull requests to `new` branch
   - Manual dispatch

2. **Steps**:
   - Checkout code
   - Setup Node.js 20
   - Install dependencies with `npm ci`
   - Build site with `npm run build`
   - Upload build artifacts
   - Display build information

3. **Artifacts**: Build output is saved for 30 days

### Accessing Build Artifacts

1. Go to the Actions tab in GitHub
2. Click on the workflow run
3. Download the "static-site" artifact
4. Extract and deploy to nginx

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

Quick deployment to nginx:

```bash
# Build locally
npm run build

# Copy to server
scp -r out/* user@server:/var/www/lennyforlibraries.org/build/

# Reload nginx on server
ssh user@server 'sudo nginx -t && sudo systemctl reload nginx'
```

## Static Export Limitations

Next.js static export has some limitations:

- ❌ No server-side rendering (SSR)
- ❌ No API routes
- ❌ No dynamic routes with `getStaticPaths` fallback
- ❌ No rewrites in next.config.ts (use nginx instead)
- ❌ No headers in next.config.ts (use nginx instead)
- ✅ Static Site Generation (SSG)
- ✅ Client-side routing
- ✅ All static pages
- ✅ Image optimization (at build time)

## Best Practices

### Code Quality

- Use TypeScript for type safety
- Follow ESLint rules
- Write semantic HTML
- Use Tailwind utility classes consistently
- Keep components small and focused

### Performance

- Optimize images before committing
- Use Next.js Image component when possible
- Lazy load components when appropriate
- Minimize bundle size

### Security

- Never commit sensitive data (.env files are gitignored)
- Security headers are configured in nginx (not in Next.js config)
- Review DEPLOYMENT.md for nginx security configuration

### Git Workflow

- Work on feature branches
- Make small, focused commits
- Write descriptive commit messages
- Test before pushing
- Keep the `new` branch stable

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev/)

## Getting Help

- **Documentation**: Check README.md and DEPLOYMENT.md first
- **Issues**: Search or create GitHub issues
- **Code Review**: Request review from team members
- **Testing**: Always test thoroughly before deploying

---

**Note for AI Agents**: This guide is specifically designed to help you understand the project structure and workflow. Always follow the testing checklist before committing changes, and ensure the build process works correctly.
