import type { Metadata } from "next"
import { AdminShell } from "@/components/admin/admin-shell"
import { SettingsManager } from "@/components/admin/settings-manager"

export const metadata: Metadata = {
  title: "Admin Settings — nolandmears3rd",
  robots: { index: false, follow: false },
}

export default function AdminSettingsPage() {
  return (
    <AdminShell>
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.25em] text-white/40">Configuration</p>
        <h1 className="font-display mt-2 text-4xl uppercase tracking-wide text-white">Settings</h1>
      </div>
      <SettingsManager />
    </AdminShell>
  )
}
