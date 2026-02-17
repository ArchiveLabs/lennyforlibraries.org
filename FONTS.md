# Font Configuration

## Current Setup

The project currently uses system fonts for maximum compatibility and to avoid external dependencies during build:

- **Sans Serif**: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto
- **Monospace**: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas
- **Serif**: ui-serif, Georgia, Cambria, "Times New Roman", Times

## Re-enabling Google Fonts (Optional)

The project was originally configured to use Google Fonts (Geist, Geist Mono, and Playfair Display). These are temporarily disabled to ensure the build works in environments with restricted internet access.

To re-enable Google Fonts for production deployments:

### Step 1: Update `app/layout.tsx`

Uncomment the Google Font imports and configurations:

```typescript
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  fallback: ["system-ui", "arial"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  fallback: ["ui-monospace", "monospace"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  fallback: ["serif"],
});
```

Then update the body className:

```typescript
<body
  className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased min-h-screen flex flex-col`}
>
```

Remove the inline style attribute.

### Step 2: Update `app/globals.css`

Update the font definitions to use the CSS variables:

```css
--font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
--font-mono: var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace;
--font-serif: var(--font-playfair), ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
```

### Step 3: Test the Build

Ensure your build environment has internet access:

```bash
npm run build
```

### Why Google Fonts?

Google Fonts provides:
- Professional typography
- Variable font support for better performance
- Automatic subsetting and optimization
- Cross-browser compatibility

However, they require internet access during build time, which may not be available in all CI/CD environments.

## Custom Font Files (Alternative)

If you want custom fonts without external dependencies, you can:

1. Download font files and place them in `public/fonts/`
2. Use `next/font/local` instead of `next/font/google`
3. Update `app/layout.tsx`:

```typescript
import localFont from 'next/font/local'

const customSans = localFont({
  src: [
    {
      path: '../public/fonts/CustomFont-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/CustomFont-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-custom-sans',
})
```

This approach gives you full control over fonts without external dependencies.

## Performance Considerations

- **System Fonts**: No download required, instant rendering, but less design control
- **Google Fonts**: Professional appearance, but requires download and CDN dependency
- **Local Fonts**: Full control and no external dependency, but adds to bundle size

For a static website, system fonts provide the best performance and reliability.
