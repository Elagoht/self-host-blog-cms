import dictionary from "@/i18n"
import ApiEndpoint, { ApiType } from "@/utilities/ApiEndpoint"
import { PrismaClient } from "@prisma/client"

type Context = Promise<{ slug: string }>

const db = new PrismaClient()

export const GET = ApiEndpoint<Context>(async (
  request,
  context
) => {
  const blogs = await db.blog.findMany({
    where: { category: { slug: { equals: (await context.params).slug } } }
  })

  if (!Array.isArray(blogs)) return Response.json({
    message: dictionary.api.error.notFound
  })

  return Response.json(blogs, { status: 200 })
}, ApiType.public)