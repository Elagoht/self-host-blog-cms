import ApiCall from "@/utilities/ApiCall"

export const postCategory = (
  category: CategoryRequest
) => ApiCall.post(
  "/api/category",
  category
)

export const getCategories = () =>
  ApiCall.get<CategoryResponse[]>("/api/category")

export const getCategory = (
  slug: string
) => ApiCall.get<CategoryResponse>(
  `/api/category/${slug}`
)

export const patchCategory = (
  slug: CategoryResponse["slug"],
  category: Partial<CategoryRequest>
) => ApiCall.patch(
  `/api/category/${slug}`,
  category
)

export const getCategoryBlogs = (
  slug: string
) => ApiCall.get(
  `/api/category/${slug}/blogs`
)