import Blogger from "@/data/Blogger"
import ApiEndpoint, { ApiType } from "@/utilities/ApiEndpoint"
import { PrismaClient } from "@prisma/client"

const db = new PrismaClient()

export const POST = ApiEndpoint(async (
  request
) => Response.json(
  await new Blogger(db).createBlog(request), {
  status: 201
}))

export const GET = ApiEndpoint(async (
  request
) => {
  const { searchParams } = request.nextUrl
  const page = Number(searchParams.get("page")) || undefined
  const take = Number(searchParams.get("take")) || undefined
  const category = searchParams.get("category") || undefined
  const query = searchParams.get("query") || undefined
  const type = ((
    ["detailed", "card", "list"].includes(
      searchParams.get("type") || ""
    ) ? searchParams.get("type")
      : "detailed"
  ) ?? "detailed") as BlogType

  return Response.json(await new Blogger(db).getBlogs({
    category,
    search: query,
    published: true
  }, type, page, take))
}, ApiType.public)