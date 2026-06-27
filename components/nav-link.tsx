"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ComponentProps, MouseEvent } from "react"
import { scrollToHash } from "@/lib/scroll"

type NavLinkProps = ComponentProps<typeof Link>

function splitHref(href: string) {
  const hashIndex = href.indexOf("#")

  if (hashIndex === -1) {
    return { path: href, hash: "" }
  }

  return {
    path: href.slice(0, hashIndex) || "/",
    hash: href.slice(hashIndex),
  }
}

export function NavLink({ href, onClick, ...props }: NavLinkProps) {
  const pathname = usePathname()
  const hrefString = typeof href === "string" ? href : href.pathname ?? "/"
  const { path, hash } = splitHref(hrefString)

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)

    if (event.defaultPrevented || !hash) {
      return
    }

    const onTargetPage = path === pathname || (path === "/" && pathname === "/")

    if (onTargetPage) {
      event.preventDefault()
      scrollToHash(hash)
      window.history.pushState(null, "", hrefString)
    }
  }

  return <Link href={href} onClick={handleClick} {...props} />
}
