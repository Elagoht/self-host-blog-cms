import dictionary from "@/i18n"
import { categoryEditScheme } from "@/lib/validation/category"
import ApiEndpoint, { ApiType } from "@/utilities/ApiEndpoint"
import Auth from "@/utilities/Auth"
import FormBody from "@/utilities/FormBody"
import { PrismaClient } from "@prisma/client"

type Context = Promise<{ slug: string }>

const db = new PrismaClient()

export const GET = ApiEndpoint<Context>(async (
  request, context
) => {
  const isTrusted = Auth.isTrustedSoftware(request.headers)

  const data = await db.category.findUnique({
    where: { slug: (await context.params).slug },
    include: {
      _count: {
        select: {
          blogs: {
            where: { published: isTrusted ? undefined : true }
          }
        }
      }
    }
  })

  if (!data) return Response.json({
    message: dictionary.api.error.notFound
  }, { status: 404 })

  const model = {
    ...data,
    _count: undefined,
    blogCount: data._count.blogs,
    id: data.id.toString()
  }

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

