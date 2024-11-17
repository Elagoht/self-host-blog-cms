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
      slug: slugify(validated.name, { lower: true, trim: true })
    }
  }))
})

export const GET = ApiEndpoint(async () =>
  Response.json(
    await db.category.findMany(),
    { status: 200 }
  ), ApiType.public
)