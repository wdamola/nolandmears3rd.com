"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { FormEvent, useState } from "react"

export function AdminLoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError("")

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })

    setLoading(false)

    if (!response.ok) {
      setError("Invalid password or admin is not configured.")
      return
    }

    const defaultNext =
      typeof window !== "undefined" && window.location.hostname.startsWith("admin.")
        ? "/"
        : "/admin"
    const nextPath = searchParams.get("next") || defaultNext
    router.push(nextPath)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="password" className="mb-2 block text-xs uppercase tracking-[0.25em] text-white/40">
          Admin Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          className="min-h-[44px] w-full border border-white/20 bg-transparent px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-white"
          placeholder="Enter admin password"
        />
      </div>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="min-h-[44px] w-full border border-white bg-white px-4 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-black transition-colors hover:bg-transparent hover:text-white disabled:opacity-50"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  )
}
