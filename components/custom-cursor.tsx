"use client"

import { useState, useEffect } from "react"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches
    setEnabled(hasFinePointer)

    if (!hasFinePointer) {
      return
    }

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleClick = () => {
      setClicked(true)
      setTimeout(() => setClicked(false), 300)
    }

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("click", handleClick)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("click", handleClick)
    }
  }, [])

  if (!enabled) {
    return null
  }

  return (
    <div
      className={`custom-cursor ${clicked ? "cursor-click" : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  )
}

