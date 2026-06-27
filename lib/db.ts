import fs from "fs/promises"
import path from "path"
import type { Database, Product, Subscriber, SiteSettings } from "@/lib/types"

const DATA_DIR = path.join(process.cwd(), "data")
const DB_PATH = path.join(DATA_DIR, "db.json")
const SEED_PATH = path.join(DATA_DIR, "db.seed.json")

async function ensureDatabase() {
  await fs.mkdir(DATA_DIR, { recursive: true })

  try {
    await fs.access(DB_PATH)
  } catch {
    const seed = await fs.readFile(SEED_PATH, "utf-8")
    await fs.writeFile(DB_PATH, seed, "utf-8")
  }
}

async function readDatabase(): Promise<Database> {
  await ensureDatabase()
  const raw = await fs.readFile(DB_PATH, "utf-8")
  return JSON.parse(raw) as Database
}

async function writeDatabase(data: Database) {
  await ensureDatabase()
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8")
}

export async function getPublishedProducts(): Promise<Product[]> {
  const db = await readDatabase()
  return db.products
    .filter((product) => product.published)
    .sort((a, b) => Number(b.featured) - Number(a.featured))
}

export async function getAllProducts(): Promise<Product[]> {
  const db = await readDatabase()
  return db.products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const db = await readDatabase()
  return db.products.find((product) => product.id === id)
}

export async function createProduct(input: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product> {
  const db = await readDatabase()
  const now = new Date().toISOString()

  if (input.featured) {
    db.products = db.products.map((product) => ({ ...product, featured: false }))
  }

  const product: Product = {
    ...input,
    id: `prod_${crypto.randomUUID()}`,
    createdAt: now,
    updatedAt: now,
  }

  db.products.push(product)
  await writeDatabase(db)
  return product
}

export async function updateProduct(id: string, input: Partial<Product>): Promise<Product | null> {
  const db = await readDatabase()
  const index = db.products.findIndex((product) => product.id === id)

  if (index === -1) {
    return null
  }

  if (input.featured) {
    db.products = db.products.map((product) => ({ ...product, featured: product.id === id }))
  }

  db.products[index] = {
    ...db.products[index],
    ...input,
    id,
    updatedAt: new Date().toISOString(),
  }

  await writeDatabase(db)
  return db.products[index]
}

export async function deleteProduct(id: string): Promise<boolean> {
  const db = await readDatabase()
  const nextProducts = db.products.filter((product) => product.id !== id)

  if (nextProducts.length === db.products.length) {
    return false
  }

  db.products = nextProducts
  await writeDatabase(db)
  return true
}

export async function getActiveSubscribers(): Promise<Subscriber[]> {
  const db = await readDatabase()
  return db.subscribers.filter((subscriber) => subscriber.active)
}

export async function addSubscriber(email: string): Promise<Subscriber> {
  const db = await readDatabase()
  const normalized = email.trim().toLowerCase()
  const existing = db.subscribers.find((subscriber) => subscriber.email === normalized)

  if (existing) {
    existing.active = true
    await writeDatabase(db)
    return existing
  }

  const subscriber: Subscriber = {
    id: `sub_${crypto.randomUUID()}`,
    email: normalized,
    subscribedAt: new Date().toISOString(),
    active: true,
  }

  db.subscribers.push(subscriber)
  await writeDatabase(db)
  return subscriber
}

export async function removeSubscriber(id: string): Promise<boolean> {
  const db = await readDatabase()
  const subscriber = db.subscribers.find((item) => item.id === id)

  if (!subscriber) {
    return false
  }

  subscriber.active = false
  await writeDatabase(db)
  return true
}

export async function recordCampaign(subject: string, body: string, recipientCount: number) {
  const db = await readDatabase()
  db.campaigns.unshift({
    id: `camp_${crypto.randomUUID()}`,
    subject,
    body,
    sentAt: new Date().toISOString(),
    recipientCount,
  })
  await writeDatabase(db)
}

export async function getSettings(): Promise<SiteSettings> {
  const db = await readDatabase()
  return db.settings
}

export async function updateSettings(input: Partial<SiteSettings>): Promise<SiteSettings> {
  const db = await readDatabase()
  db.settings = { ...db.settings, ...input }
  await writeDatabase(db)
  return db.settings
}

export async function getAdminStats() {
  const db = await readDatabase()
  return {
    productCount: db.products.length,
    publishedCount: db.products.filter((product) => product.published).length,
    subscriberCount: db.subscribers.filter((subscriber) => subscriber.active).length,
    campaignCount: db.campaigns.length,
  }
}
