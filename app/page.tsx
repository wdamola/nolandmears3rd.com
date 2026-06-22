import { HoodieCard } from "@/components/hoodie-card"
import { AutoSliderBanner } from "@/components/auto-slider-banner"
import { Marquee } from "@/components/marquee"
import { BrandStatement } from "@/components/brand-statement"

export default function Home() {
  const hoodies = [
    {
      id: 1,
      name: "Classic Black Hoodie",
      price: 149.99,
      sku: "NM3-HD-01",
      featured: true,
    },
    {
      id: 2,
      name: "Premium Gray Hoodie",
      price: 154.99,
      sku: "NM3-HD-02",
    },
    {
      id: 3,
      name: "Signature Navy Hoodie",
      price: 159.99,
      sku: "NM3-HD-03",
    },
    {
      id: 4,
      name: "Limited Edition Hoodie",
      price: 199.99,
      sku: "NM3-HD-04",
    },
  ]

  const [featured, ...rest] = hoodies

  return (
    <main className="flex w-full min-h-screen flex-col">
      <AutoSliderBanner />
      <Marquee />
      <BrandStatement />

      <section id="product-section" className="w-full border-b border-white/10 bg-dark-900 py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-12">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-white/40 sm:tracking-[0.35em]">
                Drop 01
              </p>
              <h2 className="font-display text-balance text-4xl uppercase tracking-tight text-white sm:text-5xl md:text-6xl">
                Latest Collection
              </h2>
            </div>
            <p className="max-w-sm text-sm text-white/45">
              Four core pieces. Heavyweight fleece. Cut sharp. Produced in limited runs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px bg-white/10 md:grid-cols-12">
            <div className="bg-dark-900 md:col-span-7">
              <HoodieCard {...featured} />
            </div>
            <div className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 md:col-span-5 md:grid-cols-1">
              {rest.map((hoodie) => (
                <div key={hoodie.id} className="bg-dark-900">
                  <HoodieCard {...hoodie} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="lookbook" className="border-b border-white/10 bg-black py-16 md:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-8 lg:px-12">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-white/40 sm:tracking-[0.35em]">
            Lookbook
          </p>
          <h2 className="font-display mb-10 text-balance text-3xl uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
            Visual Study 01
          </h2>
          <div className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 md:grid-cols-3">
            {["01", "02", "03"].map((item) => (
              <div
                key={item}
                className="flex aspect-[3/4] items-center justify-center bg-dark-800"
              >
                <span className="font-display text-6xl text-white/10 sm:text-7xl">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
