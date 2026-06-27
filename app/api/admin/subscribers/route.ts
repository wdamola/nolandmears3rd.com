import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth"
import { getActiveSubscribers } from "@/lib/db"

export async function GET() {
  try {
    await requireAdmin()
    const subscribers = await getActiveSubscribers()
    return NextResponse.json(subscribers)
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
