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
  
  // Output standalone build for Docker
  output: 'standalone',
  
  // Configure headers for security
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  
  // Compress output
  compress: true,
  
  // Remove X-Powered-By header (security through obscurity)
  poweredByHeader: false,

  async rewrites() {
    return [
      {
        source: '/:path*@2x.avif',
        destination: '/:path*.avif',
      },
      {
        source: '/:path*@2x.jpg',
        destination: '/:path*.jpg',
      },
       {
        source: '/:path*@2x.png',
        destination: '/:path*.png',
      },
       {
        source: '/:path*@2x.webp',
        destination: '/:path*.webp',
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
