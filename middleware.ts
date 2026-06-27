import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"
import { ADMIN_COOKIE } from "@/lib/auth"
import {
  getAdminDashboardPath,
  getAdminLoginPath,
  isAdminSubdomainHost,
  resolveAdminPathname,
  toAdminSubdomainPath,
} from "@/lib/site"

async function verifyToken(token?: string) {
  const secret = process.env.ADMIN_SESSION_SECRET

  if (!secret || !token) {
    return false
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(secret))
    return true
  } catch {
    return false
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const host = request.headers.get("host") ?? ""
  const onAdminSubdomain = isAdminSubdomainHost(host)
  const resolvedPathname = resolveAdminPathname(pathname, onAdminSubdomain)

  const isAdminPage = resolvedPathname.startsWith("/admin")
  const isLoginPage = resolvedPathname === "/admin/login"
  const isAdminApi = pathname.startsWith("/api/admin")

  if ((isAdminPage && !isLoginPage) || isAdminApi) {
    const token = request.cookies.get(ADMIN_COOKIE)?.value
    const authenticated = await verifyToken(token)

    if (!authenticated) {
      if (isAdminApi) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }

      const loginUrl = request.nextUrl.clone()
      loginUrl.pathname = getAdminLoginPath(host)
      loginUrl.searchParams.set(
        "next",
        onAdminSubdomain ? toAdminSubdomainPath(resolvedPathname) : resolvedPathname,
      )
      return NextResponse.redirect(loginUrl)
    }
  }

  if (isLoginPage) {
    const token = request.cookies.get(ADMIN_COOKIE)?.value
    const authenticated = await verifyToken(token)

    if (authenticated) {
      const dashboardUrl = request.nextUrl.clone()
      dashboardUrl.pathname = getAdminDashboardPath(host)
      dashboardUrl.search = ""
      return NextResponse.redirect(dashboardUrl)
    }
  }

  if (onAdminSubdomain && !pathname.startsWith("/admin") && !pathname.startsWith("/api")) {
    const url = request.nextUrl.clone()
    url.pathname = resolvedPathname
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4)$).*)"],
}
