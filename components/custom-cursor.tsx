"use client"

import { useEffect, useRef } from "react"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | undefined>(undefined)
  const positionRef = useRef({ x: 0, y: 0 })
  const hasMovedRef = useRef(false)

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!hasFinePointer || prefersReducedMotion) {
      return
    }

    const cursor = cursorRef.current
    if (!cursor) {
      return
    }

    const root = document.documentElement
    root.classList.add("custom-cursor-enabled")

    const updatePosition = (event: MouseEvent) => {
      positionRef.current = { x: event.clientX, y: event.clientY }

      if (!hasMovedRef.current) {
        hasMovedRef.current = true
        cursor.classList.add("is-visible")
      }

      if (rafRef.current !== undefined) {
        return
      }

      rafRef.current = window.requestAnimationFrame(() => {
        cursor.style.left = `${positionRef.current.x}px`
        cursor.style.top = `${positionRef.current.y}px`
        rafRef.current = undefined
      })
    }

    const handleClick = () => {
      cursor.classList.add("cursor-click")
      window.setTimeout(() => cursor.classList.remove("cursor-click"), 300)
    }

    window.addEventListener("mousemove", updatePosition, { passive: true })
    window.addEventListener("click", handleClick)

    return () => {
      root.classList.remove("custom-cursor-enabled")
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("click", handleClick)
      if (rafRef.current !== undefined) {
        window.cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />

}
