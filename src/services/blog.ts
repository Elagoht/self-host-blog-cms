import ApiCall from "@/utilities/ApiCall"

export const postBlog = (
  blog: BlogRequest
) => ApiCall.post("/blogs", blog)