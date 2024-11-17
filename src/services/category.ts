import ApiCall from "@/utilities/ApiCall"

export const postCategory = (
  category: CategoryRequest
) => ApiCall.post("/api/category", category)

export const getCategories = () =>
  ApiCall.get("/api/category")