"use client"

import { useState } from "react"
import { Container, Section } from "@/components/layout/container"
import { H2, Text } from "@/components/ui/typography"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    question: "Is Lenny really free and open source?",
    answer: "Yes. Lenny is licensed under the AGPLv3. All our code is public on GitHub, and we encourage community contributions."
  },
  {
    question: "Do I need technical skills to run Lenny?",
    answer: "Our one-line installer handles the heavy lifting, but basic knowledge of Linux or a VPS is helpful. We're also working on plug-and-play hardware for a zero-code experience."
  },
  {
    question: "Can I use Lenny for copyrighted books?",
    answer: "Lenny is a tool for digital lending. It is the responsibility of each library to ensure they have the rights or a legal basis (such as Controlled Digital Lending) to lend the titles in their collection."
  },
  {
    question: "How does the Open Library integration work?",
    answer: "Lenny automatically fetches metadata, covers, and descriptions from OpenLibrary.org using ISBNs or Open Library IDs, so you don't have to manually enter book details."
  }
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <Section className="py-16 bg-zinc-50/50 dark:bg-zinc-950/20">
      <Container className="max-w-3xl">
        <H2 className="text-3xl font-bold tracking-tighter mb-8 text-center">Frequently Asked Questions</H2>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="border border-zinc-200 dark:border-zinc-800 rounded-3xl bg-white dark:bg-zinc-900/50 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-6 flex items-center justify-between text-left hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
              >
                <span className="font-bold text-base tracking-tight">{faq.question}</span>
                {openIndex === i ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-zinc-600 dark:text-zinc-400">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
