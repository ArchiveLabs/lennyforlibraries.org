import React from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div className={cn("container-custom", className)} {...props}>
      {children}
    </div>
  )
}

export function Section({ className, children, ...props }: ContainerProps) {
  return (
    <section className={cn("py-16 md:py-24 overflow-hidden", className)} {...props}>
      {children}
    </section>
  )
}
