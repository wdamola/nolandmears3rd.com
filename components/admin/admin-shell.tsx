"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAdminSiteUrl } from "@/components/admin/admin-site-url"
import { getAdminLoginPath } from "@/lib/site"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/newsletter", label: "Newsletter" },
  { href: "/admin/settings", label: "Settings" },
]

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const siteUrl = useAdminSiteUrl()

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    const loginPath =
      typeof window !== "undefined" ? getAdminLoginPath(window.location.host) : "/admin/login"
    router.push(loginPath)
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 px-4 py-4 md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">Admin Panel</p>
            <p className="font-display text-2xl uppercase tracking-wide">nolandmears3rd</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={siteUrl}
              className="min-h-[44px] border border-white/20 px-4 py-2.5 text-xs uppercase tracking-[0.18em] text-white/70 transition-colors hover:border-white hover:text-white"
            >
              View Site
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="min-h-[44px] border border-white bg-white px-4 py-2.5 text-xs uppercase tracking-[0.18em] text-black transition-colors hover:bg-transparent hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:grid-cols-[220px_1fr] md:px-8">
        <nav className="flex flex-row gap-2 overflow-x-auto md:flex-col md:overflow-visible">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "min-h-[44px] whitespace-nowrap border px-4 py-3 text-xs uppercase tracking-[0.18em] transition-colors",
                pathname === item.href
                  ? "border-white bg-white text-black"
                  : "border-white/20 text-white/60 hover:border-white hover:text-white",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <main>{children}</main>
      </div>
    </div>
  )
}
