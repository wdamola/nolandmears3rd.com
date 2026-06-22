"use client"

import dynamic from "next/dynamic"

const SplashScreen = dynamic(
  () => import("@/components/splash-screen").then((mod) => mod.SplashScreen),
  { ssr: false },
)

const CustomCursor = dynamic(
  () => import("@/components/custom-cursor").then((mod) => mod.CustomCursor),
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
