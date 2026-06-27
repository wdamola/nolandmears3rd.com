import { NextResponse } from "next/server"
import { ADMIN_COOKIE, createAdminSession, verifyAdminPassword } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { password } = (await request.json()) as { password?: string }

    if (!password || !verifyAdminPassword(password)) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }

    const token = await createAdminSession()
    const response = NextResponse.json({ success: true })

    response.cookies.set(ADMIN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch {
    return NextResponse.json({ error: "Authentication is not configured" }, { status: 500 })
  }
}
