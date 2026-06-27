import type { Metadata } from "next"
import { AdminShell } from "@/components/admin/admin-shell"
import { NewsletterManager } from "@/components/admin/newsletter-manager"

export const metadata: Metadata = {
  title: "Admin Newsletter — nolandmears3rd",
  robots: { index: false, follow: false },
}

export default function AdminNewsletterPage() {
  return (
    <AdminShell>
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.25em] text-white/40">Email</p>
        <h1 className="font-display mt-2 text-4xl uppercase tracking-wide text-white">Newsletter</h1>
      </div>
      <NewsletterManager />
    </AdminShell>
  )
}
