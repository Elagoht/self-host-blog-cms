type BlogFormModel = {
  title: string
  content: string
  cover: File | null | string
  description: string
  spot: string
  keywords: string
  category: string
  published: boolean
}

type BlogRequest = BlogFormModel & {
  cover: File | string
}

type BlogListResponse = {
  id: string
  slug: string
  title: string
  cover: string
  category: string
}

type BlogCardResponse = {
  title: string
  slug: string
  spot: string
  cover: string
  published: boolean
  createdAt: Date
  updatedAt: Date
  category: string
}

type BlogDetailedResponse = {
  id: string
  title: string
  slug: string
  content: string
  keywords: string
  description: string
  spot: string
  cover: string
  published: boolean
  createdAt: Date
  updatedAt: Date
  readTime: number
  readCount: number
  category: string
}

type BlogFilters = {
  category?: string[]
  published?: boolean
  search?: string
  sort?: BlogSort
}