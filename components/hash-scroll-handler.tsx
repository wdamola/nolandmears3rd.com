"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { scrollToHash } from "@/lib/scroll"

export function HashScrollHandler() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== "/") {
      return
    }

    const hash = window.location.hash

    if (!hash) {
      return
    }

    const scroll = () => scrollToHash(hash)

    scroll()
    const retry = window.setTimeout(scroll, 150)

    return () => window.clearTimeout(retry)
  }, [pathname])

  useEffect(() => {
    const onHashChange = () => {
      if (pathname === "/" && window.location.hash) {
        scrollToHash(window.location.hash)
      }
    }

    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [pathname])

  return null
}
