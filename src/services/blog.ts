import ApiCall from "@/utilities/ApiCall"

export const getBlogs = () =>
  ApiCall.get<BlogResponse[]>("/api/blogs")

export const postBlog = (
  blog: BlogRequest
) => {
  const formData = new FormData()
  for (const key in blog) if (
    blog[key as keyof BlogRequest] !== null
  ) formData.append(
    key,
    String(blog[key as keyof BlogRequest])
  )

  return ApiCall.post(
    "/api/blogs",
    formData
  )
}

export const patchBlog = (
  slug: string,
  blog: Partial<BlogRequest>
) => ApiCall.patch(
  `/api/blogs/${slug}`,
  blog
)