"use client"

import { motion } from "framer-motion"
import { DollarSign, Lock, AlertTriangle } from "lucide-react"

import { Container, Section } from "@/components/layout/container"
import { H2, Text } from "@/components/ui/typography"

const problems = [
  {
    title: "Unsustainable Costs",
    description: "Libraries pay year after year to rent the same digital content, draining budgets that could serve communities better.",
    icon: <DollarSign className="h-6 w-6" />,
  },
  {
    title: "No Ownership",
    description: "When you rent, you never own. Libraries can't build lasting digital collections or ensure long-term access.",
    icon: <Lock className="h-6 w-6" />,
  },
  {
    title: "Limited Options",
    description: "Most libraries have no alternative to expensive rental platforms for digital lending and preservation.",
    icon: <AlertTriangle className="h-6 w-6" />,
  },
]

export function Problem() {
  return (
    <Section className="py-16 bg-zinc-50/50 dark:bg-zinc-950/30">
      <Container className="max-w-5xl">
        <div className="text-center mb-10">
          <H2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-3">Libraries Need Digital Independence</H2>
          <Text className="text-base text-muted-foreground max-w-2xl mx-auto">
            The current digital lending model is broken. Here's why libraries need a better solution.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 text-center"
            >
              <div className="h-12 w-12 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto mb-4">
                {problem.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{problem.title}</h3>
              <p className="text-sm text-muted-foreground">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
