"use client"

import { FormEvent, useEffect, useState } from "react"
import type { Product } from "@/lib/types"

const emptyForm = {
  name: "",
  sku: "",
  price: "",
  description: "",
  image1: "",
  image2: "",
  featured: false,
  published: true,
}

export function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([])
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")

  const loadProducts = async () => {
    const response = await fetch("/api/admin/products")
    if (response.ok) {
      setProducts(await response.json())
    }
    setLoading(false)
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage("")

    const response = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
      }),
    })

    if (!response.ok) {
      setMessage("Unable to create product.")
      return
    }

    setForm(emptyForm)
    setMessage("Product created.")
    await loadProducts()
  }

  const toggleField = async (id: string, field: "published" | "featured", value: boolean) => {
    await fetch(`/api/admin/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value }),
    })
    await loadProducts()
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this product?")) {
      return
    }

    await fetch(`/api/admin/products/${id}`, { method: "DELETE" })
    await loadProducts()
  }

  if (loading) {
    return <p className="text-sm text-white/50">Loading products...</p>
  }

  return (
    <div className="space-y-10">
      <section className="border border-white/10 p-6">
        <h2 className="font-display mb-6 text-3xl uppercase tracking-wide">Add Product</h2>
        <form onSubmit={handleCreate} className="grid gap-4 md:grid-cols-2">
          {[
            ["name", "Name"],
            ["sku", "SKU"],
            ["price", "Price"],
            ["image1", "Image URL (front)"],
            ["image2", "Image URL (back)"],
          ].map(([key, label]) => (
            <div key={key}>
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/40">{label}</label>
              <input
                value={form[key as keyof typeof form] as string}
                onChange={(event) => setForm({ ...form, [key]: event.target.value })}
                required={key === "name" || key === "sku" || key === "price"}
                className="min-h-[44px] w-full border border-white/20 bg-transparent px-4 py-2.5 text-sm text-white outline-none focus:border-white"
              />
            </div>
          ))}

          <div className="md:col-span-2">
            <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/40">Description</label>
            <textarea
              value={form.description}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
              rows={4}
              className="w-full border border-white/20 bg-transparent px-4 py-2.5 text-sm text-white outline-none focus:border-white"
            />
          </div>

          <label className="flex min-h-[44px] items-center gap-3 text-sm text-white/70">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(event) => setForm({ ...form, featured: event.target.checked })}
            />
            Featured product
          </label>

          <label className="flex min-h-[44px] items-center gap-3 text-sm text-white/70">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(event) => setForm({ ...form, published: event.target.checked })}
            />
            Published on site
          </label>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="min-h-[44px] border border-white bg-white px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-black transition-colors hover:bg-transparent hover:text-white"
            >
              Add Product
            </button>
          </div>
        </form>
        {message ? <p className="mt-4 text-sm text-white/60">{message}</p> : null}
      </section>

      <section className="border border-white/10">
        <div className="border-b border-white/10 px-6 py-4">
          <h2 className="font-display text-3xl uppercase tracking-wide">All Products</h2>
        </div>
        <div className="divide-y divide-white/10">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">{product.sku}</p>
                <h3 className="mt-1 text-lg uppercase tracking-wide text-white">{product.name}</h3>
                <p className="mt-2 text-sm text-white/50">${product.price.toFixed(2)}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => toggleField(product.id, "published", !product.published)}
                  className="min-h-[44px] border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.16em] text-white/70"
                >
                  {product.published ? "Published" : "Draft"}
                </button>
                <button
                  type="button"
                  onClick={() => toggleField(product.id, "featured", !product.featured)}
                  className="min-h-[44px] border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.16em] text-white/70"
                >
                  {product.featured ? "Featured" : "Set Featured"}
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(product.id)}
                  className="min-h-[44px] border border-red-500/40 px-4 py-2 text-xs uppercase tracking-[0.16em] text-red-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
