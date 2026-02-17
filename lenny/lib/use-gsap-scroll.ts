"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface UseScrollAnimationOptions {
  trigger?: string | Element
  start?: string
  end?: string
  scrub?: boolean | number
  markers?: boolean
  once?: boolean
}

export function useScrollAnimation() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return ref
}

// Fade in from bottom animation
export function useFadeInUp(options: UseScrollAnimationOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    
    gsap.set(element, { opacity: 0, y: 50 })
    
    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: options.start || "top 85%",
        end: options.end || "bottom 20%",
        toggleActions: options.once ? "play none none none" : "play reverse play reverse",
        ...options,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === element) trigger.kill()
      })
    }
  }, [options])

  return ref
}

// Staggered children animation
export function useStaggerChildren(
  selector: string,
  options: UseScrollAnimationOptions & { stagger?: number } = {}
) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const container = ref.current
    const children = container.querySelectorAll(selector)
    
    if (children.length === 0) return

    // Check if element is already in viewport
    const rect = container.getBoundingClientRect()
    const isInViewport = rect.top < window.innerHeight * 0.85

    if (isInViewport) {
      // Already visible - animate immediately
      gsap.set(children, { opacity: 0, y: 40 })
      gsap.to(children, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: options.stagger || 0.1,
        ease: "power2.out",
        delay: 0.2,
      })
    } else {
      // Not visible - use scroll trigger
      gsap.set(children, { opacity: 0, y: 40 })
      gsap.to(children, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: options.stagger || 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: options.start || "top 80%",
          toggleActions: "play none none none",
          ...options,
        },
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === container) trigger.kill()
      })
    }
  }, [selector, options])

  return ref
}

// Parallax effect for headings
export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    gsap.to(element, {
      y: () => -100 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === element) trigger.kill()
      })
    }
  }, [speed])

  return ref
}

// Scale in animation
export function useScaleIn(options: UseScrollAnimationOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    // Check if element is already in viewport
    const rect = element.getBoundingClientRect()
    const isInViewport = rect.top < window.innerHeight * 0.85

    if (isInViewport) {
      // Already visible - animate immediately
      gsap.set(element, { opacity: 0, scale: 0.95 })
      gsap.to(element, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.1,
      })
    } else {
      // Not visible - use scroll trigger
      gsap.set(element, { opacity: 0, scale: 0.95 })
      gsap.to(element, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: options.start || "top 85%",
          toggleActions: "play none none none",
          ...options,
        },
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === element) trigger.kill()
      })
    }
  }, [options])

  return ref
}
