import type { Metadata } from "next"
import { AdminShell } from "@/components/admin/admin-shell"
import { getAdminStats } from "@/lib/db"

export const metadata: Metadata = {
  title: "Admin Dashboard — nolandmears3rd",
  robots: { index: false, follow: false },
}

export default async function AdminDashboardPage() {
  const stats = await getAdminStats()

  return (
    <AdminShell>
      <div className="space-y-8">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">Overview</p>
          <h1 className="font-display mt-2 text-4xl uppercase tracking-wide text-white md:text-5xl">Dashboard</h1>
        </div>

        <div className="grid gap-px bg-white/10 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ["Products", stats.productCount],
            ["Published", stats.publishedCount],
            ["Subscribers", stats.subscriberCount],
            ["Campaigns Sent", stats.campaignCount],
          ].map(([label, value]) => (
            <div key={label} className="bg-black p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-white/40">{label}</p>
              <p className="font-display mt-3 text-5xl text-white">{value}</p>
            </div>
          ))}
        </div>

        <div className="border border-white/10 p-6">
          <h2 className="font-display text-2xl uppercase tracking-wide text-white">Quick Actions</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              ["/admin/products", "Add Product"],
              ["/admin/newsletter", "Send Newsletter"],
              ["/admin/settings", "Edit Site Settings"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="min-h-[44px] border border-white/20 px-4 py-3 text-xs uppercase tracking-[0.18em] text-white/70 transition-colors hover:border-white hover:text-white"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
