export interface Product {
  id: string
  name: string
  sku: string
  price: number
  description: string
  image1: string
  image2: string
  featured: boolean
  published: boolean
  createdAt: string
  updatedAt: string
}

export interface Subscriber {
  id: string
  email: string
  subscribedAt: string
  active: boolean
}

export interface NewsletterCampaign {
  id: string
  subject: string
  body: string
  sentAt: string
  recipientCount: number
}

export interface SiteSettings {
  siteName: string
  contactEmail: string
  heroTagline: string
  brandStatement: string
}

export interface Database {
  products: Product[]
  subscribers: Subscriber[]
  campaigns: NewsletterCampaign[]
  settings: SiteSettings
}
