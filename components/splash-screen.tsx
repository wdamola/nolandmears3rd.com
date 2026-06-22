"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function SplashScreen() {
  const [progress, setProgress] = useState(0)
  const [isFading, setIsFading] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const hasSeenSplash = sessionStorage.getItem("noland-splash-seen") === "true"

    if (prefersReducedMotion || hasSeenSplash) {
      setIsHidden(true)
      return
    }

    const interval = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          window.clearInterval(interval)
          sessionStorage.setItem("noland-splash-seen", "true")
          window.setTimeout(() => setIsFading(true), 150)
          return 100
        }
        return prev + 8
      })
    }, 16)

    return () => window.clearInterval(interval)
  }, [])

  if (isHidden) {
    return null
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] flex flex-col items-center justify-center bg-dark-900 px-4 pt-[env(safe-area-inset-top)] transition-opacity duration-300 motion-reduce:opacity-0",
        isFading ? "pointer-events-none opacity-0" : "opacity-100",
      )}
      onTransitionEnd={() => {
        if (isFading) {
          setIsHidden(true)
        }
      }}
    >
      <p className="text-center font-display text-3xl uppercase tracking-wide text-white sm:text-4xl md:text-5xl">
        nolandmears3rd
      </p>
      <p className="mt-3 text-xs font-medium uppercase tracking-[0.25em] text-white/40">Loading Drop 01</p>

      <div className="mt-8 h-px w-48 overflow-hidden bg-white/10">
        <div className="h-full bg-white transition-all duration-75 ease-out" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
