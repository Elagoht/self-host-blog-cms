import { categoryEditScheme } from "@/lib/validation/category"
import ApiEndpoint, { ApiType } from "@/utilities/ApiEndpoint"
import FormBody from "@/utilities/FormBody"
import { PrismaClient } from "@prisma/client"

type Context = Promise<{ slug: string }>

const db = new PrismaClient()

export const GET = ApiEndpoint<Context>(async (
  request, context
) => {
  const data = await db.category.findMany({
    where: { slug: (await context.params).slug },
    include: { _count: { select: { blogs: true } } }
  })

  const model: CategoryResponse[] = data.map(({
    _count: { blogs, ...count }, ...rest
  }) => ({
    ...rest,
    ...count,
    blogCount: blogs, id: rest.id.toString()
  }))

  return Response.json(
    model, { status: 200 }
  )
}, ApiType.public)

export const PATCH = ApiEndpoint<Context>(async (
  request, context
) => Response.json(await db.category.update({
  where: { slug: (await context.params).slug },
  data: await (
    await FormBody.fromRequest<Partial<CategoryFormModel>>(request)
  ).validate(categoryEditScheme)
})))

