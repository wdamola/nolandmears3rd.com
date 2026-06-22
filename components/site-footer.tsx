import Link from "next/link"
import { ArrowUpRight, Github, Instagram, Linkedin } from "lucide-react"
import { scriptFont } from "@/lib/fonts"

const productLinks = [
  { label: "Latest Collection", href: "#product-section" },
  { label: "New Arrivals", href: "#product-section" },
  { label: "Lookbook", href: "#lookbook" },
  { label: "Shop All", href: "#product-section" },
]

const resourceLinks = [
  { label: "Size Guide", href: "#" },
  { label: "Shipping & Returns", href: "#" },
  { label: "FAQ", href: "#" },
  { label: "Support", href: "mailto:hello@nolandmears3rd.com" },
]

const companyLinks = [
  { label: "About", href: "#about" },
  { label: "Contact", href: "mailto:hello@nolandmears3rd.com" },
  { label: "Wholesale", href: "#" },
  { label: "Partners", href: "#" },
]

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookies Settings", href: "#" },
]

const socialLinks = [
  { label: "X", href: "#", icon: XIcon },
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "GitHub", href: "#", icon: Github },
]

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function FooterLinkColumn({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div>
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-white/40 sm:tracking-[0.35em]">{title}</p>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-white/50 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <section className="w-full">
      <div className="relative border-y border-white/10 bg-black px-4 py-16 md:px-8 md:py-20 lg:px-12">
        <div className="grain pointer-events-none absolute inset-0 opacity-[0.12]" />
        <div className="container relative mx-auto max-w-6xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-white/40 sm:tracking-[0.35em]">
            Drop 01
          </p>
          <h2 className="font-display max-w-3xl text-balance text-4xl uppercase leading-[0.9] tracking-tight text-white sm:text-5xl md:text-7xl">
            Ready for the collection?
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/50">
            Limited-run streetwear. Heavyweight fabrics. Sharp construction. Available while quantities last.
          </p>
          <Link
            href="#product-section"
            className="mt-8 inline-flex min-h-[44px] items-center border border-white bg-white px-8 py-3 text-xs font-medium uppercase tracking-[0.22em] text-black transition-colors hover:bg-transparent hover:text-white active:scale-[0.98] sm:tracking-[0.28em]"
          >
            Shop Collection
          </Link>
        </div>
      </div>

      <footer className="relative overflow-hidden bg-dark-900 px-4 py-12 md:px-8 md:py-14 lg:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 overflow-hidden md:h-24"
        >
          <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-[30%] items-end justify-center gap-1 whitespace-nowrap md:gap-1.5 lg:gap-2">
            {"nolandmears3rd".split("").map((char, index) => (
              <span
                key={`${char}-${index}`}
                className="font-display text-[4.5rem] uppercase leading-none text-white/[0.04] md:text-[7.5rem] lg:text-[9rem]"
              >
                {char}
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 container mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr] lg:gap-16">
            <div className="space-y-6">
              <Link href="/" className="inline-block">
                <span className="font-display text-2xl uppercase tracking-wide text-white md:text-3xl">
                  nolandmears3rd
                </span>
              </Link>

              <p className="max-w-sm text-sm leading-relaxed text-white/45">
                Elevated streetwear with brutalist intent — sharp silhouettes, heavy fabrics, and pieces built
                to outlast the trend cycle.
              </p>

              <div className="flex items-center gap-2">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center border border-white/20 text-white transition-colors hover:border-white hover:bg-white hover:text-black"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              <FooterLinkColumn title="Product" links={productLinks} />
              <FooterLinkColumn title="Resources" links={resourceLinks} />
              <FooterLinkColumn title="Company" links={companyLinks} />
            </div>
          </div>

          <div className="relative z-10 my-10 h-px w-full bg-white/10" />

          <div className="relative z-10 flex flex-col gap-6 pb-2 md:pb-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-white/35">
                &copy; {year} nolandmears3rd. All rights reserved.
              </p>
              <p className="text-sm text-white/45">
                <span className={`text-base text-white/60 md:text-lg ${scriptFont.className}`}>
                  Built and managed by
                </span>{" "}
                <a
                  href="https://luminyrlabs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-white"
                >
                  LuminyrLabs
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                </a>
              </p>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs font-medium uppercase tracking-[0.18em] text-white/35 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </section>
  )
}
