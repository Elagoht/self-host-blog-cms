import dictionary from "@/i18n"
import ApiEndpoint, { ApiType } from "@/utilities/ApiEndpoint"
import { PrismaClient } from "@prisma/client"

type Context = Promise<{ slug: string }>

const db = new PrismaClient()

export const GET = ApiEndpoint<Context>(async (
  request,
  context
) => {
  const blog = await db.blog.findUnique({
    where: { slug: (await context.params).slug },
    include: { category: { select: { slug: true, name: true } } }
  })

  if (!blog) return Response.json({
    message: dictionary.api.error.notFound
  })

  return Response.json(blog, { status: 200 })
}, ApiType.public)