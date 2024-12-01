import Blogger from "@/data/Blogger"
import ApiEndpoint, { ApiType } from "@/utilities/ApiEndpoint"
import Auth from "@/utilities/Auth"
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
  const authorized = Auth.isTrustedSoftware(request.headers)
  const query = new Query(request.nextUrl.searchParams)

  const search = query.string("search")
  const page = query.number("page")
  const take = query.number("take")
  const category = query.array("category")
  const sort = query.oneOfOrDefault<BlogSort>("sort", [
    "newest", "oldest", "popular",
    "unpopular", "a-z", "z-a"
  ], "newest")
  const published = authorized
    ? query.boolean("published")
    : true // Hide unpublished blogs from public
  const type = query.oneOfOrDefault<BlogType>("type", [
    "detailed", "card", "list"
  ], "card")

  const blog = await new Blogger(db).getBlogs({
    category,
    published,
    search,
    sort
  }, type, page, take)

  return Response.json(blog)
}, ApiType.public)