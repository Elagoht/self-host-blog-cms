type CategoryFormModel = {
  name: string
  description: string
  keywords: string
  spot: string
}

type CategoryRequest = CategoryFormModel

type CategoryResponse = CategoryFormModel & {
  readonly id: string
  readonly slug: string
}