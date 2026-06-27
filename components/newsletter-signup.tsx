"use client"

import { FormEvent, useState } from "react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError("")

    const response = await fetch("/api/newsletter/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })

    setLoading(false)

    if (!response.ok) {
      setError("Unable to subscribe right now. Please try again.")
      return
    }

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="border border-black/20 bg-black/5 px-4 py-4 dark:border-white/20 dark:bg-white/5">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-700 dark:text-white/70">
          You&apos;re on the list.
        </p>
        <p className="mt-2 text-sm text-neutral-600 dark:text-white/45">Drop updates will hit your inbox first.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-500 sm:tracking-[0.35em] dark:text-white/40">
        Newsletter
      </p>
      <p className="text-sm text-neutral-600 dark:text-white/45">
        Get drop alerts and early access. Questions? Email{" "}
        <a
          href="mailto:nmearsbrand@gmail.com"
          className="text-neutral-800 underline decoration-black/20 underline-offset-4 transition-colors hover:text-neutral-900 dark:text-white/70 dark:decoration-white/20 dark:hover:text-white"
        >
          nmearsbrand@gmail.com
        </a>
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          className="min-h-[44px] flex-1 border border-black/20 bg-transparent px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-colors focus:border-black dark:border-white/20 dark:text-white dark:placeholder:text-white/30 dark:focus:border-white"
        />
        <button
          type="submit"
          disabled={loading}
          className="min-h-[44px] border border-black bg-black px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-transparent hover:text-black active:scale-[0.98] disabled:opacity-50 dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white"
        >
          {loading ? "Joining..." : "Subscribe"}
        </button>
      </form>
      {error ? <p className="text-sm text-red-500 dark:text-red-400">{error}</p> : null}
    </div>
  )
}
