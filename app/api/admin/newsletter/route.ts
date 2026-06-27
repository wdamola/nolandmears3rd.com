import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth"
import { getActiveSubscribers, recordCampaign, removeSubscriber } from "@/lib/db"
import { buildNewsletterHtml, sendNewsletterEmail } from "@/lib/email"

export async function POST(request: Request) {
  try {
    await requireAdmin()
    const { subject, body } = (await request.json()) as { subject?: string; body?: string }

    if (!subject?.trim() || !body?.trim()) {
      return NextResponse.json({ error: "Subject and body are required" }, { status: 400 })
    }

    const subscribers = await getActiveSubscribers()

    if (subscribers.length === 0) {
      return NextResponse.json({ error: "No active subscribers to email" }, { status: 400 })
    }

    const html = buildNewsletterHtml(subject.trim(), body.trim())
    let sentCount = 0
    const failures: string[] = []

    for (const subscriber of subscribers) {
      try {
        await sendNewsletterEmail({
          to: subscriber.email,
          subject: subject.trim(),
          html,
        })
        sentCount += 1
      } catch {
        failures.push(subscriber.email)
      }
    }

    if (sentCount === 0) {
      return NextResponse.json(
        { error: "Unable to send emails. Check SMTP configuration.", failures },
        { status: 500 },
      )
    }

    await recordCampaign(subject.trim(), body.trim(), sentCount)

    return NextResponse.json({
      success: true,
      sentCount,
      failures,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to send newsletter"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    await requireAdmin()
    const { id } = (await request.json()) as { id?: string }

    if (!id) {
      return NextResponse.json({ error: "Subscriber id is required" }, { status: 400 })
    }

    await removeSubscriber(id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Unable to remove subscriber" }, { status: 401 })
  }
}
