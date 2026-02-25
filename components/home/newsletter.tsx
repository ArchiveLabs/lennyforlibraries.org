"use client"

import { Container, Section } from "@/components/layout/container"
import { H2, Text } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"

export function Newsletter() {
  return (
    <Section className="bg-primary text-primary-foreground">
      <Container className="flex flex-col items-center text-center">
        <H2 className="border-none text-primary-foreground">Stay Updated</H2>
        <Text className="mx-auto mb-8 max-w-2xl text-primary-foreground/80">
          Join our newsletter to get the latest updates on open library standards, new features, and community stories.
        </Text>
        <form className="flex w-full max-w-md flex-col gap-4 sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex h-10 w-full rounded-md border border-input bg-background/10 px-3 py-2 text-sm text-primary-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-primary-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            required
          />
          <Button variant="secondary" type="submit" className="sm:w-auto">
            Subscribe
          </Button>
        </form>
        <p className="mt-4 text-xs text-primary-foreground/60">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </Container>
    </Section>
  )
}
