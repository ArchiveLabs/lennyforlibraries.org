import Link from "next/link"
import { Library } from "lucide-react"

import { Container } from "@/components/layout/container"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/images/lenny-transparent.png" className="h-8 w-8 object-contain" alt="Lenny Logo" />
              <span className="font-bold">Lenny for Libraries</span>
            </Link>
            <p className="text-sm text-muted-foreground font-medium">
               An open-source project by <br />
               <a href="https://archivelabs.org" className="underline underline-offset-4 hover:text-foreground">Archive Labs</a> & 
               <a href="https://openlibrary.org" className="underline underline-offset-4 hover:text-foreground ml-1">Open Library</a>.
            </p>
            <div className="flex gap-4">
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Quick Links</h3>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <li><Link href="#features" className="hover:text-foreground transition-colors">Features</Link></li>
              <li><Link href="#about" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="https://github.com/lennyforlibraries/lenny" className="hover:text-foreground transition-colors">GitHub</Link></li>
              <li><a href="mailto:mek@archive.org" className="hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Ecosystem</h3>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <li><a href="https://openlibrary.org" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">OpenLibrary.org</a></li>
              <li><a href="https://openlibrary.press" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">OpenLibrary.press</a></li>
              <li><a href="https://archive.org" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Internet Archive</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Lenny for Libraries. All rights reserved.
        </div>
      </Container>
    </footer>
  )
}
