import ApiCall from "@/utilities/ApiCall"
import QueryString from "qs"

export const getBlogs = (filters?: {
  category?: string
  page?: number
  take?: number
  published?: string
  search?: string
  sort?: string
}) => ApiCall.get<Paginated<BlogCardResponse>>(
  `/api/blogs${QueryString.stringify(filters, {
    addQueryPrefix: true,
    skipNulls: true
  })}`
)

export const getBlog = (
  slug: string
) => ApiCall.get<BlogDetailedResponse>(
  `/api/blogs/${slug}`
)

export const postBlog = (
  blog: BlogRequest
) => {
  const formData = new FormData()
  Object.entries(
    blog
  ).forEach(([key, value]) => {
    if (value instanceof FileList)
      for (let i = 0; i < value.length; i++)
        formData.append(key, value[i])
    else formData.append(key, value as string | Blob)
  })

  return ApiCall.post(
    "/api/blogs",
    formData
  )
}

export const patchBlog = (
  slug: string,
  blog: Partial<BlogRequest>
) => {
  const formData = new FormData()
  Object.entries(
    blog
  ).forEach(([key, value]) => {
    if (value instanceof FileList)
      for (let i = 0; i < value.length; i++)
        formData.append(key, value[i])
    else formData.append(key, value as string | Blob)
  })

  return ApiCall.patch(
    `/api/blogs/${slug}`,
    formData
  )
}

export const deleteBlog = (
  slug: string
) => ApiCall.delete(
  `/api/blogs/${slug}`
)