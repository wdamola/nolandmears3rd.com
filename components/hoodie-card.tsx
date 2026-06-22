import Image from "next/image"
import { cn } from "@/lib/utils"

interface HoodieCardProps {
  name: string
  price: number
  sku: string
  image1?: string
  image2?: string
  featured?: boolean
}

export function HoodieCard({ name, price, sku, image1, image2, featured = false }: HoodieCardProps) {
  const hasImage = Boolean(image1)

  return (
    <article
      className={cn(
        "group flex h-full flex-col border border-white/10 bg-dark-800 transition-colors hover:border-white/25",
        featured && "lg:min-h-[520px]",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-dark-400",
          featured ? "aspect-[4/5] lg:aspect-auto lg:flex-1" : "aspect-[4/5]",
        )}
      >
        {hasImage ? (
          <>
            <Image
              src={image1!}
              alt={name}
              fill
              className={cn(
                "object-cover transition-opacity duration-300",
                image2 && "group-hover:opacity-0",
              )}
              sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
              loading={featured ? "eager" : "lazy"}
            />
            {image2 ? (
              <Image
                src={image2}
                alt={`${name} alternate view`}
                fill
                className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
                loading="lazy"
              />
            ) : null}
          </>
        ) : (
          <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-3 px-6 text-center sm:min-h-[280px]">
            <p className="font-display text-4xl uppercase tracking-wide text-white/15 sm:text-5xl md:text-6xl">
              {sku}
            </p>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/35">Image Coming Soon</p>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between border-t border-white/10 p-5">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-white/40">{sku}</p>
          <h3 className={cn("font-medium uppercase tracking-wide text-white", featured ? "text-xl" : "text-sm")}>
            {name}
          </h3>
        </div>
        <div className="mt-6 flex items-end justify-between gap-4">
          <p className="font-display text-2xl text-white">${price.toFixed(0)}</p>
          <button
            type="button"
            className="min-h-[44px] border border-white/30 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors hover:border-white hover:bg-white hover:text-black active:scale-[0.98]"
          >
            View
          </button>
        </div>
      </div>
    </article>
  )
}
