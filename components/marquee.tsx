export function Marquee() {
  const items = [
    "nolandmears3rd",
    "drop 01",
    "limited run",
    "new collection",
    "est. 2025",
    "no permission needed",
  ]
  const track = [...items, ...items]

  return (
    <div className="overflow-hidden border-y border-black/10 bg-neutral-100 py-3 dark:border-white/10 dark:bg-black">
      <div className="animate-marquee flex w-max gap-8 motion-reduce:animate-none sm:gap-12">
        {track.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-8 text-xs font-medium uppercase tracking-[0.25em] text-neutral-500 sm:gap-12 sm:tracking-[0.35em] dark:text-white/50"
          >
            {item}
            <span className="h-1 w-1 bg-neutral-400 dark:bg-white/30" />
          </span>
        ))}
      </div>
    </div>
  )
}
