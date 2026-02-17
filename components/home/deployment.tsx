"use client"

import { Container, Section } from "@/components/layout/container"
import { H2, Text } from "@/components/ui/typography"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Server, Cpu, Cloud, Check, ArrowRight, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

export function DeploymentOptions() {
  const options = [
    {
      title: "Self-Hosted",
      description: "Run Lenny as a Docker container on your own server. Full control, full flexibility.",
      icon: <Server className="h-6 w-6" />,
      features: ["Open source & customizable", "Standard Linux infrastructure", "Open Library integration"],
      cta: { label: "Install", href: "#installation", type: "install" as const },
    },
    {
      title: "Plug & Play",
      description: "Get Lenny pre-installed on a Raspberry Pi. Plug it in and start lending.",
      icon: <Cpu className="h-6 w-6" />,
      features: ["No setup required", "Offline-ready", "Simple updates"],
      recommended: true,
      cta: { label: "Contact Us", href: "mailto:mek@archive.org?subject=Lenny Plug & Play Inquiry", type: "contact" as const },
    },
    {
      title: "Hosted",
      description: "Let us handle everything. A hosted instance with web dashboard access.",
      icon: <Cloud className="h-6 w-6" />,
      features: ["Zero maintenance", "Web-based admin", "Scalable infrastructure"],
      cta: { label: "Contact Us", href: "mailto:mek@archive.org?subject=Lenny Hosted Inquiry", type: "contact" as const },
    }
  ]

  return (
    <Section className="py-24 bg-white dark:bg-zinc-950">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <H2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 text-zinc-900 dark:text-zinc-100">Choose Your Deployment</H2>
          <Text className="text-base text-zinc-600 dark:text-zinc-400">
            Whether you want total control or a zero-effort setup, we have an option for you.
          </Text>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {options.map((option, i) => (
            <Card 
              key={i} 
              className={cn(
                "group flex flex-col h-full rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg bg-white dark:bg-zinc-900",
                option.recommended 
                  ? "border-2 border-zinc-900 dark:border-zinc-100 relative" 
                  : "border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
              )}
            >
              <CardHeader className="p-0 pb-4">
                {option.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full">
                    Recommended
                  </div>
                )}
                <div className="h-12 w-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4 text-zinc-900 dark:text-zinc-100">
                  {option.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{option.title}</CardTitle>
                <Text className="text-zinc-600 dark:text-zinc-400 mt-2 text-sm">{option.description}</Text>
              </CardHeader>
              <CardContent className="flex-1 p-0 pt-4 flex flex-col">
                <ul className="space-y-3 flex-1">
                  {option.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                      <Check className="h-4 w-4 text-green-600 dark:text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a href={option.cta.href} className="mt-6 block">
                  <Button 
                    variant={option.cta.type === "install" ? "accent" : "outline"} 
                    className="w-full justify-center"
                  >
                    {option.cta.type === "contact" ? (
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        {option.cta.label}
                      </>
                    ) : (
                      <>
                        {option.cta.label}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}
