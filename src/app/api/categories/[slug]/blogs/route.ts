import Blogger from "@/data/Blogger"
import ApiEndpoint, { ApiType } from "@/utilities/ApiEndpoint"
import { PrismaClient } from "@prisma/client"

type Context = Promise<{ slug: string }>

const db = new PrismaClient()

export const GET = ApiEndpoint<Context>(async (
  request,
  context
) => Response.json(
  await new Blogger(db).getBlogs({
    category: [(await context.params).slug]
  }, "list", 1, undefined), {
  status: 200
}), ApiType.public)