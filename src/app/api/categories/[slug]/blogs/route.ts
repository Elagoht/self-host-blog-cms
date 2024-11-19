import dictionary from "@/i18n"
import ApiEndpoint, { ApiType } from "@/utilities/ApiEndpoint"
import { PrismaClient } from "@prisma/client"

type Context = Promise<{ slug: string }>

const db = new PrismaClient()

export const GET = ApiEndpoint<Context>(async (
  request,
  context
) => {
  const category = await db.category.findUnique({
    where: { slug: (await context.params).slug }
  })

  if (!category) return Response.json({
    message: dictionary.api.error.notFound
  })

  return Response.json(category, { status: 200 })
}, ApiType.public)