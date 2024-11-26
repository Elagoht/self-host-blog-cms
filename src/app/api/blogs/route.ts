import Blogger from "@/data/Blogger"
import ApiEndpoint, { ApiType } from "@/utilities/ApiEndpoint"
import Query from "@/utilities/Query"
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
  const query = new Query(request.nextUrl.searchParams)

  const search = query.string("search")
  const page = query.number("page")
  const take = query.number("take")
  const category = query.string("category")
  const published = query.boolean("published")
  const type = query.oneOfOrDefault<BlogType>("type", [
    "detailed", "card", "list"
  ], "card")

  return Response.json(await new Blogger(db).getBlogs({
    category,
    published,
    search
  }, type, page, take))
}, ApiType.public)