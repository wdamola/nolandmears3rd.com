import { HoodieCard } from "@/components/hoodie-card"
import { AutoSliderBanner } from "@/components/auto-slider-banner"
import { Marquee } from "@/components/marquee"
import { BrandStatement } from "@/components/brand-statement"
import { getPublishedProducts } from "@/lib/db"

export default async function Home() {
  const products = await getPublishedProducts()
  const featured = products.find((product) => product.featured) ?? products[0]
  const rest = featured ? products.filter((product) => product.id !== featured.id) : []

  return (
    <main className="flex w-full min-h-screen flex-col">
      <AutoSliderBanner />
      <Marquee />
      <BrandStatement />

      <section
        id="product-section"
        className="w-full border-b border-black/10 bg-neutral-50 py-16 dark:border-white/10 dark:bg-dark-900 md:py-24"
      >
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-12">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-neutral-500 sm:tracking-[0.35em] dark:text-white/40">
                Drop 01
              </p>
              <h2 className="font-display text-balance text-4xl uppercase tracking-tight text-neutral-900 sm:text-5xl md:text-6xl dark:text-white">
                Latest Collection
              </h2>
            </div>
            <p className="max-w-sm text-sm text-neutral-600 dark:text-white/45">
              {products.length} piece{products.length === 1 ? "" : "s"}. Heavyweight fleece. Cut sharp. Produced in
              limited runs.
            </p>
          </div>

          {featured ? (
            <div className="grid grid-cols-1 gap-px bg-black/10 md:grid-cols-12 dark:bg-white/10">
              <div className="bg-neutral-50 md:col-span-7 dark:bg-dark-900">
                <HoodieCard
                  name={featured.name}
                  price={featured.price}
                  sku={featured.sku}
                  image1={featured.image1 || undefined}
                  image2={featured.image2 || undefined}
                  featured
                />
              </div>
              <div className="grid grid-cols-1 gap-px bg-black/10 sm:grid-cols-2 md:col-span-5 md:grid-cols-1 dark:bg-white/10">
                {rest.map((product) => (
                  <div key={product.id} className="bg-neutral-50 dark:bg-dark-900">
                    <HoodieCard
                      name={product.name}
                      price={product.price}
                      sku={product.sku}
                      image1={product.image1 || undefined}
                      image2={product.image2 || undefined}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="border border-black/10 px-6 py-16 text-center dark:border-white/10">
              <p className="font-display text-4xl uppercase text-neutral-900/20 dark:text-white/20">
                Collection Coming Soon
              </p>
            </div>
          )}
        </div>
      </section>

      <section
        id="lookbook"
        className="border-b border-black/10 bg-white py-16 dark:border-white/10 dark:bg-black md:py-20"
      >
        <div className="mx-auto w-full max-w-6xl px-4 md:px-8 lg:px-12">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-neutral-500 sm:tracking-[0.35em] dark:text-white/40">
            Lookbook
          </p>
          <h2 className="font-display mb-10 text-balance text-3xl uppercase tracking-tight text-neutral-900 sm:text-4xl md:text-5xl dark:text-white">
            Visual Study 01
          </h2>
          <div className="grid grid-cols-1 gap-px bg-black/10 sm:grid-cols-2 md:grid-cols-3 dark:bg-white/10">
            {["01", "02", "03"].map((item) => (
              <div
                key={item}
                className="flex aspect-[3/4] items-center justify-center bg-neutral-100 dark:bg-dark-800"
              >
                <span className="font-display text-6xl text-neutral-900/10 sm:text-7xl dark:text-white/10">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
