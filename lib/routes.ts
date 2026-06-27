export const routes = {
  home: "/",
  about: "/about",
  shop: "/#product-section",
  lookbook: "/#lookbook",
} as const

export const headerNavLinks = [
  { label: "Shop", href: routes.shop },
  { label: "Lookbook", href: routes.lookbook },
  { label: "About", href: routes.about },
] as const

export const footerProductLinks = [
  { label: "Latest Collection", href: routes.shop },
  { label: "New Arrivals", href: routes.shop },
  { label: "Lookbook", href: routes.lookbook },
  { label: "Shop All", href: routes.shop },
] as const

export const footerCompanyLinks = [
  { label: "About", href: routes.about },
  { label: "Contact", href: "mailto:nmearsbrand@gmail.com" },
  { label: "Wholesale", href: routes.home },
  { label: "Partners", href: routes.home },
] as const
