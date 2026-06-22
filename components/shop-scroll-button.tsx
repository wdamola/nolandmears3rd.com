"use client"

import { type ReactNode } from "react"

interface ShopScrollButtonProps {
  children: ReactNode
  className?: string
  targetId?: string
}

export function ShopScrollButton({
  children,
  className,
  targetId = "product-section",
}: ShopScrollButtonProps) {
  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  )
}
