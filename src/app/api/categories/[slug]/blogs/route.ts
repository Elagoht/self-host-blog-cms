import ApiEndpoint, { ApiType } from "@/utilities/ApiEndpoint"
import { PrismaClient } from "@prisma/client"

type Context = Promise<{ slug: string }>

const db = new PrismaClient()

export const GET = ApiEndpoint<Context>(async (
  request, context
) => Response.json(
  await db.blog.findMany({
    where: { category: { slug: (await context.params).slug } }
  })
), ApiType.public)