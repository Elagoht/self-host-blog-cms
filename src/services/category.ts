import ApiCall from "@/utilities/ApiCall"

export const postCategory = (
  category: CategoryRequest
) => ApiCall.post(
  "/api/categories",
  category
)

export const getCategories = () =>
  ApiCall.get<CategoryResponse[]>("/api/categories")

export const getCategory = (
  slug: string
) => ApiCall.get<CategoryResponse>(
  `/api/categories/${slug}`
)

export const patchCategory = (
  slug: CategoryResponse["slug"],
  category: Partial<CategoryRequest>
) => ApiCall.patch(
  `/api/categories/${slug}`,
  category
)

export const getCategoryBlogs = (
  slug: string
) => ApiCall.get<BlogResponse[]>(
  `/api/categories/${slug}/blogs`
)