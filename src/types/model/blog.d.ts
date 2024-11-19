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

type BlogResponse = BlogRequest & {
  readonly id: number
  readonly slug: string
  readonly createdAt: string
  readonly updatedAt: string
  readonly cover: string
  readonly readTime: number
  readonly readCount: number
  readonly category: {
    readonly slug: string
    readonly name: string
  }
}