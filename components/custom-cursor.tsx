"use client"

import { useEffect, useRef } from "react"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | undefined>(undefined)
  const positionRef = useRef({ x: 0, y: 0 })
  const enabledRef = useRef(false)

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

    enabledRef.current = true
    cursor.style.display = "block"

    const updatePosition = (event: MouseEvent) => {
      positionRef.current = { x: event.clientX, y: event.clientY }

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
      enabledRef.current = false
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("click", handleClick)
      if (rafRef.current !== undefined) {
        window.cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="custom-cursor hidden"
      aria-hidden="true"
    />
  )
}
