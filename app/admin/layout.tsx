import { headers } from "next/headers"
import { AdminSiteUrlProvider } from "@/components/admin/admin-site-url"
import { getPublicSiteUrl } from "@/lib/site"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const host = (await headers()).get("host") ?? ""

  return <AdminSiteUrlProvider siteUrl={getPublicSiteUrl(host)}>{children}</AdminSiteUrlProvider>
}
