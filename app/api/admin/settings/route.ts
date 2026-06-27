import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth"
import { getSettings, updateSettings } from "@/lib/db"

export async function GET() {
  try {
    await requireAdmin()
    const settings = await getSettings()
    return NextResponse.json(settings)
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

export async function PATCH(request: Request) {
  try {
    await requireAdmin()
    const body = (await request.json()) as Record<string, string>
    const settings = await updateSettings(body)
    return NextResponse.json(settings)
  } catch {
    return NextResponse.json({ error: "Unable to update settings" }, { status: 500 })
  }
}
