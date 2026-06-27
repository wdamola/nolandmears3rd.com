"use client"

import { FormEvent, useEffect, useState } from "react"
import type { SiteSettings } from "@/lib/types"

export function SettingsManager() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((response) => response.json())
      .then((data) => setSettings(data))
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!settings) {
      return
    }

    const response = await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    })

    if (response.ok) {
      setMessage("Settings saved.")
    } else {
      setMessage("Unable to save settings.")
    }
  }

  if (!settings) {
    return <p className="text-sm text-white/50">Loading settings...</p>
  }

  return (
    <section className="max-w-2xl border border-white/10 p-6">
      <h2 className="font-display mb-6 text-3xl uppercase tracking-wide">Site Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          ["siteName", "Site Name"],
          ["contactEmail", "Contact Email"],
          ["heroTagline", "Hero Tagline"],
          ["brandStatement", "Brand Statement"],
        ].map(([key, label]) => (
          <div key={key}>
            <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/40">{label}</label>
            {key === "brandStatement" || key === "heroTagline" ? (
              <textarea
                value={settings[key as keyof SiteSettings]}
                onChange={(event) => setSettings({ ...settings, [key]: event.target.value })}
                rows={4}
                className="w-full border border-white/20 bg-transparent px-4 py-2.5 text-sm text-white outline-none focus:border-white"
              />
            ) : (
              <input
                value={settings[key as keyof SiteSettings]}
                onChange={(event) => setSettings({ ...settings, [key]: event.target.value })}
                className="min-h-[44px] w-full border border-white/20 bg-transparent px-4 py-2.5 text-sm text-white outline-none focus:border-white"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="min-h-[44px] border border-white bg-white px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-black transition-colors hover:bg-transparent hover:text-white"
        >
          Save Settings
        </button>
      </form>
      {message ? <p className="mt-4 text-sm text-white/60">{message}</p> : null}
    </section>
  )
}
