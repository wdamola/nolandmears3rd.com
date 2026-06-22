import "./globals.css"
import type { Metadata, Viewport } from "next"
import type React from "react"
import { ClientChrome } from "@/components/client-chrome"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { bodyFont, displayFont, scriptFont } from "@/lib/fonts"

export const metadata: Metadata = {
  title: "nolandmears3rd — Premium Streetwear",
  description: "Premium streetwear by Noland Mears III. Limited drops. Brutalist design.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`dark scroll-smooth ${displayFont.variable} ${bodyFont.variable} ${scriptFont.variable}`}
    >
      <body className={`${bodyFont.className} overflow-x-clip bg-dark-900 font-body text-gray-100`}>
        <ClientChrome />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
