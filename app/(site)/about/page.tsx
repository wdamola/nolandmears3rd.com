import type { Metadata } from "next"
import { AboutPageContent } from "@/components/about-page"

export const metadata: Metadata = {
  title: "Our Story — nolandmears3rd",
  description:
    "The story of Noland Mears 3rd Brand Inc. — inspired by East Baltimore, built on faith, discipline, and purpose.",
}

export default function AboutPage() {
  return (
    <main className="flex w-full min-h-screen flex-col pt-16 md:pt-20">
      <AboutPageContent />
    </main>
  )
}
