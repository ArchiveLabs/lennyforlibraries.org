import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

// Security headers for production
const securityHeaders = [
  {
    // Prevent clickjacking - don't allow site to be framed
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    // Prevent MIME type sniffing
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    // Enable XSS protection in older browsers
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    // Control referrer information
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    // Force HTTPS for 1 year, include subdomains
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  {
    // Restrict browser features/APIs
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    // Content Security Policy - allows self, YouTube embeds, and common CDNs
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Required for Next.js
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "media-src 'self' https://archive.org https://*.archive.org",
      "frame-src 'self' https://www.youtube.com https://youtube.com https://archive.org https://*.archive.org",
      "connect-src 'self' https://reader.archive.org https://*.archive.org",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  // Enable experimental features for better caching
  experimental: {
    // Optimize package imports to reduce bundle size
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  
  // Output static export for nginx deployment
  output: 'export',
  
  // Set base path and asset prefix for static hosting
  // Using /_next_lfl to avoid conflict with Lenny Server's /_next
  // basePath: '',
  assetPrefix: '/_next_lfl',
  
  // Note: headers() is not supported with static export
  // Security headers should be configured in nginx instead
  // See DEPLOYMENT.md for nginx configuration
  
  // Compress output
  compress: true,
  
  // Remove X-Powered-By header (security through obscurity)
  poweredByHeader: false,

  // Note: rewrites() is not supported with static export
  // Image optimization should be handled during build
  // or configured in nginx
};

export default withBundleAnalyzer(nextConfig);
