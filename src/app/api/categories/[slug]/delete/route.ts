import dictionary from "@/i18n"
import { categoryDeleteScheme } from "@/lib/validation/category"
import ApiEndpoint from "@/utilities/ApiEndpoint"
import Bucket from "@/utilities/Bucket"
import FormBody from "@/utilities/FormBody"
import { PrismaClient } from "@prisma/client"

type Context = Promise<{ slug: string }>

const db = new PrismaClient()

export const POST = ApiEndpoint<Context>(async (
  request, context
) => {

  const { slug } = await context.params

  const validated = await (
    await FormBody.fromRequest<CategoryDeleteModel>(request)
  ).validate(categoryDeleteScheme)

  const blogsToDelete = validated[""] || []
  const blogsToTransfer = Object.entries(
    validated
  ).filter(([key]) => key !== "")

  if (
    !(await db.category.findUnique({ where: { slug } }))
  ) return Response.json({
    message: dictionary.api.error.notFound
  }, { status: 404 })

  await Promise.all(
    blogsToTransfer.map(
      async ([category, blogs]) => await db.category.update({
        where: { slug: category },
        data: {
          blogs: {
            connect: blogs.map(blog => ({ slug: blog }))
          }
        }
      })
    )
  )

  await Promise.all(blogsToDelete.map(async blog => {
    const blogData = await db.blog.findUnique({
      select: { cover: true },
      where: { slug: blog }
    })
    if (!blogData) return

    if ( // Delete existing cover image
      blogData.cover
    ) await Bucket.deleteMatchingFiles(
      "covers",
      new RegExp(blogData.cover.replace(
        /^\/uploads\/covers\//,
        ""
      ).replace(/\+\d+.*/, ""))
    )

    await db.blog.delete({ where: { slug: blog } })
  }))

  await db.category.delete({ where: { slug } })

  return Response.json({
    message: dictionary.categories.delete.success
  }, { status: 200 })
})