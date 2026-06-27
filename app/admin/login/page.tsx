import type { Metadata } from "next"
import { Suspense } from "react"
import { AdminLoginForm } from "@/components/admin/login-form"

export const metadata: Metadata = {
  title: "Admin Login — nolandmears3rd",
  robots: { index: false, follow: false },
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 py-12">
      <div className="w-full max-w-md border border-white/10 p-8">
        <p className="text-xs uppercase tracking-[0.25em] text-white/40">Owner Access</p>
        <h1 className="font-display mt-3 text-4xl uppercase tracking-wide text-white">Admin Login</h1>
        <p className="mt-4 text-sm text-white/45">
          Password-protected area for managing products, subscribers, and site content.
        </p>
        <div className="mt-8">
          <Suspense fallback={<p className="text-sm text-white/50">Loading...</p>}>
            <AdminLoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
