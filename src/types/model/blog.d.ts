type BlogFormModel = {
  title: string
  content: string
  cover: File | null
  description: string
  spot: string
  keywords: string
  category: number
  published: boolean
}

type BlogRequest = BlogFormModel & {
  cover: File
}

type BlogResponse = BlogRequest & {
  readonly id: number
  readonly slug: string
  readonly createdAt: string
  readonly updatedAt: string
}