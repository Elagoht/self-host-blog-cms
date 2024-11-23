import { categoryAddScheme } from "@/lib/validation/category"
import ApiEndpoint, { ApiType } from "@/utilities/ApiEndpoint"
import FormBody from "@/utilities/FormBody"
import { PrismaClient } from "@prisma/client"
import { NextRequest } from "next/server"
import slugify from "slugify"

const db = new PrismaClient()

export const POST = ApiEndpoint(async (
  request: NextRequest
) => {
  const validated = await (
    await FormBody.fromRequest<CategoryRequest>(request)
  ).validate(categoryAddScheme)

  return Response.json(await db.category.create({
    data: {
      name: validated.name,
      description: validated.description,
      spot: validated.spot,
      keywords: validated.keywords,
      slug: slugify(validated.name, {
        lower: true, trim: true, strict: true
      })
    }
  }))
})

export const GET = ApiEndpoint(async () => {
  const data = await db.category.findMany({
    include: { _count: { select: { blogs: true } } }
  })

  const model: CategoryResponse[] = data.map(({
    _count: { blogs, ...count }, ...rest
  }) => ({
    ...rest,
    ...count,
    blogCount: blogs, id: rest.id.toString()
  }))

  return Response.json(model, { status: 200 })
}, ApiType.public)