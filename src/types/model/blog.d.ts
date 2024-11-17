type BlogModel = {
  title: string
  slug: string
  content: string
  cover: File | null
  description: string
  spot: string
  keywords: string
  category: string
}

type BlogRequest = BlogModel & {
  cover: File
}