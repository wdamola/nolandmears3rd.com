"use client"

import { FormEvent, useEffect, useState } from "react"
import type { Subscriber } from "@/lib/types"

export function NewsletterManager() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  const loadSubscribers = async () => {
    const response = await fetch("/api/admin/subscribers")
    if (response.ok) {
      setSubscribers(await response.json())
    }
    setLoading(false)
  }

  useEffect(() => {
    loadSubscribers()
  }, [])

  const handleSend = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSending(true)
    setMessage("")

    const response = await fetch("/api/admin/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, body }),
    })

    const data = await response.json()
    setSending(false)

    if (!response.ok) {
      setMessage(data.error ?? "Unable to send newsletter.")
      return
    }

    setMessage(`Newsletter sent to ${data.sentCount} subscriber(s).`)
    setSubject("")
    setBody("")
  }

  const handleRemove = async (id: string) => {
    await fetch("/api/admin/newsletter", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    await loadSubscribers()
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="border border-white/10 p-6">
        <h2 className="font-display mb-6 text-3xl uppercase tracking-wide">Send Newsletter</h2>
        <form onSubmit={handleSend} className="space-y-4">
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/40">Subject</label>
            <input
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              required
              className="min-h-[44px] w-full border border-white/20 bg-transparent px-4 py-2.5 text-sm text-white outline-none focus:border-white"
              placeholder="Drop 01 is live"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/40">Message</label>
            <textarea
              value={body}
              onChange={(event) => setBody(event.target.value)}
              required
              rows={10}
              className="w-full border border-white/20 bg-transparent px-4 py-2.5 text-sm text-white outline-none focus:border-white"
              placeholder="Write your newsletter update..."
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="min-h-[44px] border border-white bg-white px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-black transition-colors hover:bg-transparent hover:text-white disabled:opacity-50"
          >
            {sending ? "Sending..." : "Send To All Subscribers"}
          </button>
        </form>
        {message ? <p className="mt-4 text-sm text-white/60">{message}</p> : null}
        <p className="mt-4 text-sm text-white/40">
          Email uses Gmail SMTP. Set `SMTP_PASS` in your environment with a Google App Password.
        </p>
      </section>

      <section className="border border-white/10">
        <div className="border-b border-white/10 px-6 py-4">
          <h2 className="font-display text-3xl uppercase tracking-wide">Subscribers</h2>
          <p className="mt-2 text-sm text-white/45">{subscribers.length} active subscriber(s)</p>
        </div>
        {loading ? (
          <p className="px-6 py-5 text-sm text-white/50">Loading subscribers...</p>
        ) : subscribers.length === 0 ? (
          <p className="px-6 py-5 text-sm text-white/50">No subscribers yet.</p>
        ) : (
          <div className="divide-y divide-white/10">
            {subscribers.map((subscriber) => (
              <div key={subscriber.id} className="flex items-center justify-between gap-4 px-6 py-4">
                <div>
                  <p className="text-sm text-white">{subscriber.email}</p>
                  <p className="mt-1 text-xs text-white/40">
                    {new Date(subscriber.subscribedAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(subscriber.id)}
                  className="min-h-[44px] border border-white/20 px-3 py-2 text-xs uppercase tracking-[0.16em] text-white/60"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
