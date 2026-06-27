import "./globals.css"
import type { Metadata, Viewport } from "next"
import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
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
      suppressHydrationWarning
      className={`scroll-smooth ${displayFont.variable} ${bodyFont.variable} ${scriptFont.variable}`}
    >
      <body
        className={`${bodyFont.className} overflow-x-clip bg-white font-body text-neutral-900 dark:bg-dark-900 dark:text-gray-100`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem storageKey="noland-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
