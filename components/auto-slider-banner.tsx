import { ShopScrollButton } from "@/components/shop-scroll-button"

export function AutoSliderBanner() {
  return (
    <div className="relative h-svh w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="pointer-events-none absolute top-1/2 left-1/2 min-h-full min-w-full w-auto h-auto max-w-none -translate-x-1/2 -translate-y-1/2 object-cover grayscale brightness-[0.8] contrast-[1.08] motion-reduce:grayscale-0"
        src="/hero.mp4"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.18]" />

      <div className="relative flex h-full flex-col justify-end px-4 pb-[max(4rem,env(safe-area-inset-bottom))] pt-[max(6rem,calc(env(safe-area-inset-top)+4rem))] md:px-8 md:pb-20 lg:px-12 lg:pb-24">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-white/60 sm:tracking-[0.3em]">
          Drop 01 — Available Now
        </p>
        <h1 className="font-display max-w-4xl text-balance text-[clamp(3rem,11vw,9rem)] uppercase leading-[0.85] tracking-tight text-white">
          Noland
          <br />
          Mears III
        </h1>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-white/55">
          Premium streetwear with brutalist intent. Heavyweight construction. Limited quantities.
        </p>
        <ShopScrollButton className="mt-8 min-h-[44px] w-fit border border-white bg-white px-8 py-3 text-xs font-medium uppercase tracking-[0.22em] text-black transition-colors hover:bg-transparent hover:text-white active:scale-[0.98] sm:tracking-[0.28em]">
          Shop Collection
        </ShopScrollButton>
      </div>
    </div>
  )
}
