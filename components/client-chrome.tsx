"use client"

import dynamic from "next/dynamic"
import { CustomCursor } from "@/components/custom-cursor"

const SplashScreen = dynamic(
  () => import("@/components/splash-screen").then((mod) => mod.SplashScreen),
  { ssr: false },
)

export function ClientChrome() {
  return (
    <>
      <SplashScreen />
      <CustomCursor />
    </>
  )
}
