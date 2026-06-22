"use client"

import Link from "next/link"
import { Menu, ShoppingBag, X } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Shop", href: "#product-section" },
  { label: "Lookbook", href: "#lookbook" },
  { label: "About", href: "#about" },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) {
      return
    }

    const scrollY = window.scrollY
    document.body.style.position = "fixed"
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = "100%"
    document.body.style.overflow = "hidden"

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false)
      }
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflow = ""
      window.scrollTo(0, scrollY)
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b pt-[env(safe-area-inset-top)] transition-colors duration-300",
          scrolled
            ? "border-white/10 bg-dark-900/95 backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="flex h-16 min-w-0 items-center justify-between gap-2 px-4 md:h-20 md:gap-4 md:px-8 lg:px-12">
          <Link
            href="/"
            className="min-w-0 max-w-[52vw] truncate font-display text-lg uppercase tracking-wide text-white sm:max-w-none sm:text-xl md:text-2xl"
          >
            nolandmears3rd
          </Link>

          <nav className="hidden items-center gap-8 lg:gap-10 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group relative text-xs font-medium uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-white"
              >
                {link.label}
                <span className="absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              aria-label="Cart"
              className="flex h-11 w-11 items-center justify-center border border-white/20 text-white transition-colors hover:border-white hover:bg-white hover:text-black"
            >
              <ShoppingBag className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="flex h-11 w-11 items-center justify-center border border-white/20 text-white transition-colors hover:border-white hover:bg-white hover:text-black md:hidden"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-[55] flex flex-col justify-center bg-dark-900 px-6 pt-[env(safe-area-inset-top)] transition-opacity duration-300 md:hidden",
          menuOpen ? "pointer-events-auto visible opacity-100" : "pointer-events-none invisible opacity-0",
        )}
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      >
        <nav className="flex flex-col gap-2" onClick={(event) => event.stopPropagation()}>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="flex min-h-[48px] items-center font-display text-4xl uppercase tracking-wide text-white sm:text-5xl"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
