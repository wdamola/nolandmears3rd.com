import { Bebas_Neue, Caveat, Inter } from "next/font/google"

export const displayFont = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
})

export const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
})

export const scriptFont = Caveat({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-script",
})
