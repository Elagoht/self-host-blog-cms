import dictionary from "@/i18n"
import ApiEndpoint, { ApiType } from "@/utilities/ApiEndpoint"
import Message from "@/utilities/Message"
import { PrismaClient } from "@prisma/client"

type Context = Promise<{ slug: string }>;

const db = new PrismaClient()

export const PATCH = ApiEndpoint<Context>(async (
  request, context
) => {
  const { slug } = await context.params

  const blogData = await db.blog.findUnique({
    where: { slug },
    select: { readCount: true, title: true, published: true }
  })

  if (
    !blogData
  ) return Response.json({
    message: dictionary.api.error.notFound
  }, { status: 404 })

  if (
    !blogData.published
  ) return Response.json({
    message: dictionary.api.error.forbidden
  }, { status: 403 })

  await db.blog.update({
    where: { slug },
    data: { readCount: blogData.readCount + 1 }
  })

  return Response.json({
    message: Message.format(dictionary.blogs.read, {
      title: blogData.title,
      count: blogData.readCount + 1
    })
  })
}, ApiType.public)