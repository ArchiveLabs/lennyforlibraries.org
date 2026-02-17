"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Github } from "lucide-react"

import { cn } from "@/lib/utils"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

const navItems = [
  { name: "Features", href: "#features" },
  { name: "About", href: "#about" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/40 dark:border-zinc-800/40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur backdrop-blur-safari supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-950/60">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-1.5 sm:space-x-2 group">
          <img 
            src="/images/lenny-transparent.png" 
            alt="Lenny Logo" 
            className="h-7 w-6 sm:h-8 sm:w-7 group-hover:scale-110 transition-transform"
          />
          <span className="font-extrabold text-xl tracking-tighter text-[var(--card-foreground)]">
            Lennyforlibraries<span className="text-[var(--card-muted)] font-medium">.org</span>
          </span>
        </Link>
        
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                  pathname === item.href && "text-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="https://github.com/archiveLabs/lenny"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all"
            >
              <Github className="h-4 w-4" />
              Contribute
            </a>
          </nav>
          
          <div className="hidden md:block h-4 w-px bg-border/60" />

          <div className="flex items-center gap-2">
            <ModeToggle />
            <div className="hidden md:flex md:items-center md:gap-4">
              <a href="https://reader.archive.org/?opds=https://lennyforlibraries.org/v1/api/opds" target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="outline" className="rounded-full px-5">
                  Playground
                </Button>
              </a>
              <a href="#installation">
                <Button size="sm" variant="accent" className="rounded-full px-5">
                  Try Lenny
                </Button>
              </a>
            </div>
            <Button
              variant="ghost"
              className="md:hidden"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </div>
        </div>
      </Container>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 md:hidden"
          >
            <Container className="py-4">
              <nav className="grid gap-2">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center py-2 text-sm font-medium text-muted-foreground hover:text-foreground",
                      pathname === item.href && "text-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <a
                  href="https://github.com/archiveLabs/lenny"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
                >
                  <Github className="h-4 w-4" />
                  Contribute
                </a>
                <div className="mt-4 grid gap-2">
                   <a href="https://reader.archive.org/?opds=https://lennyforlibraries.org/v1/api/opds" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full justify-start">Playground</Button>
                   </a>
                   <a href="#installation">
                    <Button variant="accent" className="w-full justify-start">Try Lenny</Button>
                   </a>
                </div>
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Theme</span>
                  <ModeToggle />
                </div>
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
