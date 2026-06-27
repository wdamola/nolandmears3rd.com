import { NextResponse } from "next/server"
import { addSubscriber } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { email } = (await request.json()) as { email?: string }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    const subscriber = await addSubscriber(email)
    return NextResponse.json({ success: true, subscriber })
  } catch {
    return NextResponse.json({ error: "Unable to subscribe right now" }, { status: 500 })
  }
}
