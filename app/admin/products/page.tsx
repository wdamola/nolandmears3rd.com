import type { Metadata } from "next"
import { AdminShell } from "@/components/admin/admin-shell"
import { ProductsManager } from "@/components/admin/products-manager"

export const metadata: Metadata = {
  title: "Admin Products — nolandmears3rd",
  robots: { index: false, follow: false },
}

export default function AdminProductsPage() {
  return (
    <AdminShell>
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.25em] text-white/40">Catalog</p>
        <h1 className="font-display mt-2 text-4xl uppercase tracking-wide text-white">Products</h1>
      </div>
      <ProductsManager />
    </AdminShell>
  )
}
