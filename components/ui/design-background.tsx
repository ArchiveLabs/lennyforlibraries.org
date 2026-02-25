"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function DesignBackground() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 -z-50 h-full w-full pointer-events-none overflow-hidden isolate">
      {/* Base Background */}
      <div className="absolute inset-0 bg-white dark:bg-zinc-950 transition-colors duration-300" />

      {/* Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient Glows */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 dark:bg-primary/10 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse duration-[10000ms]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-secondary/20 dark:bg-secondary/10 blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-pulse duration-[8000ms]" />
    </div>
  )
}
