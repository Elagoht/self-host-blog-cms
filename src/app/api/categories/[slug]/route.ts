import { categoryEditScheme } from "@/lib/validation/category"
import ApiEndpoint, { ApiType } from "@/utilities/ApiEndpoint"
import FormBody from "@/utilities/FormBody"
import { PrismaClient } from "@prisma/client"

type Context = Promise<{ slug: string }>

const db = new PrismaClient()

export const GET = ApiEndpoint<Context>(async (
  request, context
) => Response.json(
  await db.category.findUnique({
    where: { slug: (await (context.params)).slug }
  })
), ApiType.public)

export const PATCH = ApiEndpoint<Context>(async (
  request, context
) => Response.json(await db.category.update({
  where: { slug: (await context.params).slug },
  data: await (
    await FormBody.fromRequest<Partial<CategoryFormModel>>(request)
  ).validate(categoryEditScheme)
})))