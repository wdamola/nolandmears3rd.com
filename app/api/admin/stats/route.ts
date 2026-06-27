import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth"
import { getAdminStats } from "@/lib/db"

export async function GET() {
  try {
    await requireAdmin()
    const stats = await getAdminStats()
    return NextResponse.json(stats)
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
