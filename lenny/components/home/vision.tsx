"use client"

import { Container, Section } from "@/components/layout/container"
import { H2, Text } from "@/components/ui/typography"
import { useFadeInUp, useStaggerChildren } from "@/lib/use-gsap-scroll"
import { BookOpen, PenTool, Globe, Library } from "lucide-react"

export function Vision() {
  const headingRef = useFadeInUp()
  const textRef = useFadeInUp({ start: "top 90%" })
  const cardsRef = useStaggerChildren("[data-ecosystem-card]", { stagger: 0.12 })

  return (
    <Section id="about" className="py-24 bg-white dark:bg-zinc-950">
      <Container className="max-w-4xl text-center">
        <div ref={headingRef} className="mb-12">
            <H2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-0 text-zinc-900 dark:text-zinc-100">
              A Federated Future for Libraries
            </H2>
        </div>
        
         <div ref={textRef}>
           <Text className="text-lg text-zinc-600 dark:text-zinc-400 mb-6 max-w-2xl mx-auto leading-relaxed">
              Empowering libraries to join a global network of sovereign, interoperable digital collections.
           </Text>
           
           <p className="text-base text-zinc-500 dark:text-zinc-500 leading-relaxed max-w-xl mx-auto">
             Libraries should own their digital infrastructure, not just rent access to it.
           </p>
         </div>

         <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
           <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-8">
             The Open Ecosystem
           </h3>
           <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
             <a data-ecosystem-card href="/" className="group block p-6 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 hover:shadow-md transition-all duration-200 text-center">
               <div className="mx-auto w-10 h-10 flex items-center justify-center mb-4">
                 <Library className="h-6 w-6 text-zinc-900 dark:text-zinc-100" />
               </div>
               <div className="font-semibold text-base mb-1 text-zinc-900 dark:text-zinc-100">Lenny</div>
               <p className="text-sm text-zinc-600 dark:text-zinc-400">Library-in-a-Box for everyone</p>
             </a>
             <a data-ecosystem-card href="https://openlibrary.org" target="_blank" rel="noopener noreferrer" className="group block p-6 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 hover:shadow-md transition-all duration-200 text-center">
               <div className="mx-auto w-10 h-10 flex items-center justify-center mb-4">
                 <BookOpen className="h-6 w-6 text-zinc-900 dark:text-zinc-100" />
               </div>
               <div className="font-semibold text-base mb-1 text-zinc-900 dark:text-zinc-100">OpenLibrary.org</div>
               <p className="text-sm text-zinc-600 dark:text-zinc-400">11.5M readers find and borrow books</p>
             </a>
             <div data-ecosystem-card className="group block p-6 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-center opacity-60">
               <div className="mx-auto w-10 h-10 flex items-center justify-center mb-4">
                 <PenTool className="h-6 w-6 text-zinc-900 dark:text-zinc-100" />
               </div>
               <div className="font-semibold text-base mb-1 text-zinc-900 dark:text-zinc-100">OpenLibrary.press <span className="text-xs font-normal text-zinc-500">(coming soon)</span></div>
               <p className="text-sm text-zinc-600 dark:text-zinc-400">Authors sell DRM-free books</p>
             </div>
             <a data-ecosystem-card href="https://archive.org" target="_blank" rel="noopener noreferrer" className="group block p-6 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 hover:shadow-md transition-all duration-200 text-center">
               <div className="mx-auto w-10 h-10 flex items-center justify-center mb-4">
                 <Globe className="h-6 w-6 text-zinc-900 dark:text-zinc-100" />
               </div>
               <div className="font-semibold text-base mb-1 text-zinc-900 dark:text-zinc-100">Internet Archive</div>
               <p className="text-sm text-zinc-600 dark:text-zinc-400">Universal access to knowledge</p>
             </a>
           </div>
         </div>
      </Container>
    </Section>
  )
}
