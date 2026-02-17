import React from "react"
import { cn } from "@/lib/utils"

export function H1({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tighter lg:text-5xl text-foreground font-serif", // Reduced lg size
        className
      )}
      {...props}
    >
      {children}
    </h1>
  )
}

export function H2({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "scroll-m-20 text-2xl font-bold tracking-tighter transition-colors first:mt-0 text-foreground md:text-3xl font-serif", // Reduced size
        className
      )}
      {...props}
    >
      {children}
    </h2>
  )
}

export function H3({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight font-serif",
        className
      )}
      {...props}
    >
      {children}
    ,</h3>
  )
}

export function Text({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    >
      {children}
    </p>
  )
}

export function Lead({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-lg text-muted-foreground", className)} {...props}>
      {children}
    </p>
  )
}
