"use client"

import { createContext, useContext } from "react"

const AdminSiteUrlContext = createContext("/")

export function AdminSiteUrlProvider({
  siteUrl,
  children,
}: {
  siteUrl: string
  children: React.ReactNode
}) {
  return <AdminSiteUrlContext.Provider value={siteUrl}>{children}</AdminSiteUrlContext.Provider>
}

export function useAdminSiteUrl() {
  return useContext(AdminSiteUrlContext)
}
