"use client"

import { useState, useCallback, memo } from "react"
import { Check, Copy, Terminal } from "lucide-react"

import { Container, Section } from "@/components/layout/container"
import { H2, Text } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { useScaleIn, useStaggerChildren } from "@/lib/use-gsap-scroll"

const COMMAND = "curl -fsSL https://raw.githubusercontent.com/ArchiveLabs/lenny/refs/heads/main/install.sh | sudo sh"

// Memoized copy button to prevent parent re-renders
const CopyButton = memo(function CopyButton() {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(COMMAND)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [])

  return (
    <Button
      size="sm"
      variant="secondary"
      onClick={copyToClipboard}
      className="ml-4 h-8 w-8 p-0 rounded-md bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 flex-shrink-0 transition-colors"
    >
      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-neutral-400" />}
      <span className="sr-only">Copy command</span>
    </Button>
  )
})

// Memoized feature cards
const FeatureCards = memo(function FeatureCards({ cardsRef }: { cardsRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-8 sm:mt-10 max-w-3xl mx-auto">
      <div data-install-card className="p-3 sm:p-4 rounded-xl bg-[var(--card-background)] border border-[var(--card-border)] text-center shadow-sm">
        <div className="font-bold text-xs sm:text-sm mb-1 text-foreground">Downloads Dependencies</div>
        <p className="text-xs text-muted-foreground">Automatically installs Docker and all required components</p>
      </div>
      <div data-install-card className="p-3 sm:p-4 rounded-xl bg-[var(--card-background)] border border-[var(--card-border)] text-center shadow-sm">
        <div className="font-bold text-sm mb-1 text-foreground">Quick Setup</div>
        <p className="text-xs text-muted-foreground">Configures Lenny with sensible defaults for immediate use</p>
      </div>
      <div data-install-card className="p-3 sm:p-4 rounded-xl bg-[var(--card-background)] border border-[var(--card-border)] text-center shadow-sm">
        <div className="font-bold text-sm mb-1 text-foreground">Production Ready</div>
        <p className="text-xs text-muted-foreground">Includes security settings and optimization for library use</p>
      </div>
    </div>
  )
})

export function Installation() {
  const terminalRef = useScaleIn()
  const cardsRef = useStaggerChildren("[data-install-card]", { stagger: 0.15 })

  return (
    <Section id="installation" className="pt-0 pb-16 overflow-hidden installation-bg">
      <Container className="max-w-4xl text-center relative">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-zinc-200/50 dark:bg-zinc-800/20 rounded-full blur-3xl -z-10"></div>
        
        <H2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-3">Quick Installation</H2>
        <Text className="text-base text-muted-foreground mb-8 max-w-2xl mx-auto tracking-tight">
          Get Lenny running in minutes with our simple one-line installation command.
        </Text>
        
        <div ref={terminalRef} className="relative group mx-auto max-w-3xl">
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-1.5 shadow-sm hover:shadow-md transition-shadow duration-200">
             <div className="flex items-center justify-between rounded-lg bg-neutral-900 dark:bg-neutral-950 p-4">
                <div className="flex items-center gap-3 overflow-x-auto">
                   <Terminal className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-500 flex-shrink-0" />
                   <code className="font-mono text-xs sm:text-sm text-neutral-300 whitespace-nowrap text-left select-all">
                      {COMMAND}
                   </code>
                </div>
                <CopyButton />
             </div>
          </div>
        </div>

        <FeatureCards cardsRef={cardsRef} />

        {/* System Requirements note */}
        <p className="mt-6 text-xs text-muted-foreground max-w-2xl mx-auto">
          <strong>System Requirements:</strong> Requires a Mac & Linux system with curl and sudo access. Compatible with Ubuntu, Debian, and most modern Linux distributions.
        </p>
      </Container>
    </Section>
  )
}
