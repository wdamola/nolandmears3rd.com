import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/auth"
import { createProduct, getAllProducts } from "@/lib/db"

export async function GET() {
  try {
    await requireAdmin()
    const products = await getAllProducts()
    return NextResponse.json(products)
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin()
    const body = (await request.json()) as {
      name?: string
      sku?: string
      price?: number
      description?: string
      image1?: string
      image2?: string
      featured?: boolean
      published?: boolean
    }

    if (!body.name || !body.sku || typeof body.price !== "number") {
      return NextResponse.json({ error: "Name, SKU, and price are required" }, { status: 400 })
    }

    const product = await createProduct({
      name: body.name,
      sku: body.sku,
      price: body.price,
      description: body.description ?? "",
      image1: body.image1 ?? "",
      image2: body.image2 ?? "",
      featured: Boolean(body.featured),
      published: body.published ?? true,
    })

    return NextResponse.json(product, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Unable to create product" }, { status: 500 })
  }
}
