import ApiCall from "@/utilities/ApiCall"

export const getBlogs = () =>
  ApiCall.get<BlogResponse[]>("/api/blogs")

export const getBlog = (
  slug: string
) => ApiCall.get<BlogResponse>(
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