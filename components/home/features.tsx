"use client"
import * as React from "react"

import { BookOpen, Users, Globe, ShieldCheck, Zap, Heart } from "lucide-react"
import { motion } from "framer-motion"

import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { H2, Text } from "@/components/ui/typography"
import { Container, Section } from "@/components/layout/container"
import { cn } from "@/lib/utils"
import { useStaggerChildren } from "@/lib/use-gsap-scroll"



export function Features() {
  const options = React.useMemo(() => ({ stagger: 0.12 }), [])
  const gridRef = useStaggerChildren("[data-bento-item]", options)



  const features = [
    {
      title: "Preloaded with Ebooks",
      description: <>800+ open titles from <a href="https://standardebooks.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">Standard Ebooks</a>.</>,
      header: (
        <div className="w-full h-full p-6 sm:p-8 bg-[var(--card-inner-background)] flex items-center justify-center overflow-hidden">
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 w-full max-w-lg">
            {[
              "/images/features/book covers/0012622006-L.jpg",
              "/images/features/book covers/ring-lardner_jack-keefe-stories-c3c1432e-cover.avif",
              "/images/features/book covers/w-r-burnett_little-caesar-c3c1432e-cover.avif",
              "/images/features/book covers/c-s-forester_payment-deferred-c3c1432e-cover.avif",
              "/images/features/book covers/h-g-wells_in-the-days-of-the-comet-c3c1432e-cover.avif",
              "/images/features/book covers/0013220577-L.jpg",
              "/images/features/book covers/louis-joseph-vance_the-lone-wolf-c3c1432e-cover.avif",
              "/images/features/book covers/r-austin-freeman_the-mystery-of-31-new-inn-c3c1432e-cover.avif",
              "/images/features/book covers/walter-bagehot_the-english-constitution-c3c1432e-cover.avif",
              "/images/features/book covers/william-gerhardie_futility-c3c1432e-cover.avif"
            ].map((cover, i) => (
              <div key={i} className={cn(
                "aspect-[3/4.5] bg-[var(--card-background)] rounded-lg border border-[var(--card-border)] shadow-sm transition-all duration-500 hover:scale-110 cursor-default overflow-hidden"
              )}>
                <img 
                  src={cover} 
                  className="w-full h-full object-cover"
                  alt={`Book Cover ${i + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      ),
      icon: <Globe className="h-5 w-5 text-[var(--card-muted)]" />,
      className: "md:col-span-2",
    },
    {
      title: "Mobile Ready",
      description: "Works out of the box with the Internet Archive Reader App.",
      header: (
        <div className="w-full h-full flex justify-center items-end px-6">
          <div className="relative w-[220px] sm:w-[180px] h-full bg-zinc-950 rounded-t-[2.5rem] border-t-[6px] border-x-[6px] border-zinc-700 p-4 shadow-2xl ring-2 ring-zinc-400/30 overflow-hidden translate-y-2">
             {/* Dynamic Island */}
             <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-zinc-900 rounded-2xl flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-blue-500/50 ml-6" />
             </div>
             
             {/* Screen content - Reader App Screenshot */}
              <div className="mt-8 -mx-4 -mb-4 h-full">
                <img 
                  src="/images/features/readerapp/archivereaderapp.png"
                  className="w-full h-full object-cover object-top"
                  alt="Internet Archive Reader App"
                />
              </div>
          </div>
        </div>
      ),
      icon: <BookOpen className="h-5 w-5 text-[var(--card-muted)]" />,
      className: "md:col-span-1",
    },
    {
      title: "Metadata from Open Library",
      description: "Lenny's card catalog auto-fetches book metadata from OpenLibrary.",
      header: (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[var(--card-inner-background)]">
          <div className="w-full max-w-[280px] flex flex-col gap-3 group-hover/bento:scale-105 transition-transform duration-500">
            {[
              {
                title: "King Solomon's Mines",
                author: "H. Rider Haggard",
                cover: "/images/features/book covers/0012622006-L.jpg"
              },
              {
                title: "Jack Keefe Stories",
                author: "Ring Lardner",
                cover: "/images/features/book covers/ring-lardner_jack-keefe-stories-c3c1432e-cover.avif"
              },
              {
                title: "Little Caesar",
                author: "W. R. Burnett",
                cover: "/images/features/book covers/w-r-burnett_little-caesar-c3c1432e-cover.avif"
              }
            ].map((book, i) => (
              <div key={i} className={cn(
                "h-16 bg-[var(--card-background)] rounded-2xl border border-[var(--card-border)] shadow-sm flex items-center px-3 gap-3 overflow-hidden",
                i === 1 ? "opacity-100" : "opacity-40"
              )}>
                <div className="h-10 w-7 shrink-0 rounded-md overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-sm">
                   <img 
                     src={book.cover} 
                     className="w-full h-full object-cover"
                     alt={book.title}
                   />
                </div>
                <div className="flex-1 space-y-0.5 min-w-0">
                  <div className="text-[12px] font-bold text-[var(--card-foreground)] truncate">
                    {book.title}
                  </div>
                  <div className="text-[10px] font-medium text-[var(--card-muted)] truncate">
                    {book.author}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
      icon: <Globe className="h-5 w-5 text-[var(--card-muted)]" />,
      className: "md:col-span-1",
    },
    {
      title: "Digital Lending System",
      description: "Configurable lending rules for digital lending.",
      header: (
        <div className="w-full h-full flex items-end justify-center px-6 pt-4 pb-0">
          <div className="w-full h-48 bg-[var(--card-background)] rounded-t-3xl border-x border-t border-[var(--card-border)] p-5 overflow-visible">
              <div className="flex gap-4 h-full">
                <div className="h-full aspect-[3/4] rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-sm shrink-0">
                  <img 
                    src="/images/features/book covers/w-r-burnett_little-caesar-c3c1432e-cover.avif" 
                    className="w-full h-full object-cover"
                    alt="The Great Gatsby"
                  />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
                    <div className="text-sm font-semibold text-[var(--card-foreground)]">
                      The Great Gatsby
                    </div>
                    <div className="px-2.5 py-0.5 text-[9px] font-bold rounded-full border badge-green shrink-0">
                      Edit 
                    </div>
                  </div>
                  <div className="text-[10px] leading-relaxed text-[var(--card-muted)] line-clamp-5">
                    A 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City,...
                  </div>
                </div>
              </div>
          </div>
        </div>
      ),
      icon: <ShieldCheck className="h-5 w-5 text-[var(--card-muted)]" />,
      className: "md:col-span-1",
    },
    {
      title: "Thorium Web EPUB Reader",
      description: "High-performance reading experience built-in.",
      header: (
        <div className="relative w-full h-full bg-[var(--card-background)] border border-[var(--card-border)] rounded-3xl m-6 overflow-hidden shadow-xl scale-105 group/mockup">
          <div className="absolute top-0 left-0 right-0 h-10 bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-100 dark:border-zinc-700 px-4 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
            </div>
            <div className="text-[10px] font-semibold text-[var(--card-muted)] uppercase tracking-widest">
              Thorium Reader
            </div>
            <div className="w-12" /> {/* Spacer to center title */}
          </div>
          <div className="pt-10 h-full w-full">
            <div className="relative w-full h-full overflow-hidden border-t border-zinc-100 dark:border-zinc-800 group/image bg-zinc-950">
              <img 
                src="/images/features/thoriumreader/reader.png"
                className="w-full h-full object-contain grayscale transition-all group-hover/mockup:grayscale-0 duration-700"
                alt="Thorium Reader"
              />
            </div>
          </div>
        </div>
      ),
      icon: <Zap className="h-5 w-5 text-[var(--card-muted)]" />,
      className: "md:col-span-1",
    },
    {
      title: "Marketplace",
      description: "Expand your collection with ease.",
      hidden: true, // TODO: Enable when ready
      header: (
        <div className="w-full h-full p-8 flex flex-col items-center justify-center scale-110">
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            {[
              { title: "Moby Dick", cover: "/images/features/book covers/0012622006-L.jpg", action: "Borrow", price: "Free" },
              { title: "The Odyssey", cover: "/images/features/book covers/ring-lardner_jack-keefe-stories-c3c1432e-cover.avif", action: "Buy", price: "$2.99" },
              { title: "Great Gatsby", cover: "/images/features/book covers/w-r-burnett_little-caesar-c3c1432e-cover.avif", action: "Borrow", price: "Free" },
              { title: "The Lone Wolf", cover: "/images/features/book covers/louis-joseph-vance_the-lone-wolf-c3c1432e-cover.avif", action: "Buy", price: "$1.49" }
            ].map((item, i) => (
              <div key={i} className="bg-[var(--card-background)] border border-[var(--card-border)] rounded-xl p-3 shadow-sm flex flex-col gap-2 group/market-card hover:shadow-md transition-all">
                 <div className="aspect-[3/4] rounded-lg overflow-hidden bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800">
                    <img src={item.cover} className="w-full h-full object-cover grayscale transition-all group-hover/market-card:grayscale-0" alt={item.title} />
                 </div>
                 <div className="flex flex-col gap-1">
                    <div className="text-[10px] font-bold truncate text-[var(--card-foreground)]">{item.title}</div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[9px] font-medium text-[var(--card-muted)]">{item.price}</span>
                       <div className={cn(
                         "px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border",
                         item.action === "Buy" ? "badge-primary" : "badge-green"
                       )}>
                        {item.action}
                      </div>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      ),
      icon: <Users className="h-5 w-5 text-[var(--card-muted)]" />,
      className: "md:col-span-1",
    },
  ]

  return (
    <Section id="features" className="bg-transparent">
      <Container>
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <H2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">What is Lenny?</H2>
          <Text className="text-base text-muted-foreground">
             Lenny is a library server that features everything you need to preserve, lend, and serve digital books your way.
          </Text>
        </div>
        
        <div ref={gridRef}>
          <BentoGrid className="max-w-6xl mx-auto">
             {features.filter(item => !item.hidden).map((item, i) => (
               <BentoGridItem
                 key={i}
                 title={item.title}
                 description={item.description}
                 header={item.header}
                 icon={item.icon}
                 className={item.className}
                 data-bento-item
               />
             ))}
          </BentoGrid>
        </div>
      </Container>
    </Section>
  )
}
