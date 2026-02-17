# lennyforlibraries.org

The official website for Lenny for Libraries - a library ebook server solution.

This is a [Next.js](https://nextjs.org) project that builds a static website deployable to nginx.

> **🚀 Quick Start**: See [QUICKSTART.md](./QUICKSTART.md) for a fast-track setup guide.

## Quick Start for Developers

### Prerequisites

- Node.js 20+ (or Bun runtime)
- npm, yarn, pnpm, or bun package manager

### Initial Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ArchiveLabs/lennyforlibraries.org.git
   cd lennyforlibraries.org
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Building for Production

Build static assets for deployment:

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun run build
```

This creates an `out/` directory with static HTML, CSS, and JavaScript files ready for deployment.

### Testing the Production Build Locally

After building, you can test the static output locally using a simple HTTP server:

```bash
# Using Python
cd out
python3 -m http.server 8000

# Or using npx
npx serve out

# Or using Node.js http-server
npx http-server out
```

Then visit [http://localhost:8000](http://localhost:8000) (or the appropriate port) to test the production build.

## Project Structure

```
lennyforlibraries.org/
├── app/                    # Next.js app directory (routes and layouts)
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── home/             # Homepage sections
│   ├── layout/           # Layout components (header, footer, etc.)
│   └── ui/               # Reusable UI components
├── public/               # Static assets (images, fonts, etc.)
├── lib/                  # Utility functions and hooks
├── nginx/                # Nginx configuration examples
├── out/                  # Built static files (generated, not committed)
├── next.config.ts        # Next.js configuration
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions including:
- GitHub Actions automated builds
- Nginx configuration
- Server setup and deployment workflow

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Custom components with Radix UI primitives
- **Animations**: Framer Motion & GSAP
- **Icons**: Lucide React
- **Build Output**: Static export for nginx deployment

## Key Features

- 🚀 Static site generation for optimal performance
- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS
- ♿ Accessible components
- 🔒 Security-focused configuration
- 🌙 Dark mode support
- ⚡ Optimized bundle size with code splitting

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API
- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports) - Static site generation
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/docs/) - Typed JavaScript

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

See [LICENSE](./LICENSE) file for details.
