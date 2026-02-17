import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { DesignBackground } from "@/components/ui/design-background";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Lenny for Libraries - Open Source Digital Library Server",
    template: "%s | Lenny for Libraries",
  },
  description: "Lenny is a plug-and-play, open-source, Library-in-a-Box that empowers libraries to preserve, own, and lend digital books on their own terms.",
  keywords: [
    "digital library",
    "library server",
    "OPDS",
    "ebook lending",
    "open source library",
    "library software",
    "digital books",
    "LCP DRM",
    "controlled digital lending",
    "Internet Archive",
    "OpenLibrary",
  ],
  authors: [{ name: "Archive Labs" }],
  creator: "Archive Labs",
  publisher: "Lenny for Libraries",
  metadataBase: new URL("https://lennyforlibraries.org"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lennyforlibraries.org",
    siteName: "Lenny for Libraries",
    title: "Lenny for Libraries - Open Source Digital Library Server",
    description: "Lenny is a plug-and-play, open-source, Library-in-a-Box that empowers libraries to preserve, own, and lend digital books on their own terms.",
    images: [
      {
        url: "/images/lenny-og.png",
        width: 1200,
        height: 630,
        alt: "Lenny for Libraries",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lenny for Libraries - Open Source Digital Library Server",
    description: "Lenny is a plug-and-play, open-source, Library-in-a-Box that empowers libraries to preserve, own, and lend digital books on their own terms.",
    images: ["/images/lenny-og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when you have them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  icons: {
    icon: "/images/lenny-transparent.png",
    shortcut: "/images/lenny-transparent.png",
    apple: "/images/lenny-transparent.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
          <DesignBackground />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
