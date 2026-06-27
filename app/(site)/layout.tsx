import type React from "react"
import { ClientChrome } from "@/components/client-chrome"
import { HashScrollHandler } from "@/components/hash-scroll-handler"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HashScrollHandler />
      <ClientChrome />
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  )
}
