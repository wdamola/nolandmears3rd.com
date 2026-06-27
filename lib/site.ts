export function isAdminSubdomainHost(host: string) {
  const hostname = host.split(":")[0]
  return hostname.startsWith("admin.")
}

export function resolveAdminPathname(pathname: string, onAdminSubdomain: boolean) {
  if (!onAdminSubdomain || pathname.startsWith("/admin") || pathname.startsWith("/api")) {
    return pathname
  }

  return pathname === "/" ? "/admin" : `/admin${pathname}`
}

export function toAdminSubdomainPath(adminPathname: string) {
  if (adminPathname === "/admin") {
    return "/"
  }

  if (adminPathname.startsWith("/admin/")) {
    return adminPathname.slice("/admin".length) || "/"
  }

  return adminPathname
}

export function getAdminLoginPath(host: string) {
  return isAdminSubdomainHost(host) ? "/login" : "/admin/login"
}

export function getAdminDashboardPath(host: string) {
  return isAdminSubdomainHost(host) ? "/" : "/admin"
}

export function getPublicSiteUrl(host: string) {
  const hostname = host.split(":")[0]

  if (!isAdminSubdomainHost(host)) {
    return process.env.NEXT_PUBLIC_SITE_URL ?? "/"
  }

  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL
  if (configuredSiteUrl) {
    return configuredSiteUrl
  }

  const port = host.includes(":") ? `:${host.split(":")[1]}` : ""
  const mainHost = hostname.replace(/^admin\./, "")
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http"

  return `${protocol}://${mainHost}${port}`
}
