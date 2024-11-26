import Blogger from "@/data/Blogger"
import dictionary from "@/i18n"
import { blogEditScheme } from "@/lib/validation/blogs"
import ApiEndpoint, { ApiType } from "@/utilities/ApiEndpoint"
import Bucket from "@/utilities/Bucket"
import FormBody, { FormBodyType } from "@/utilities/FormBody"
import Query from "@/utilities/Query"
import Studio from "@/utilities/Studio"
import TypeWriter from "@/utilities/TypeWriter"
import { PrismaClient } from "@prisma/client"
import slugify from "slugify"

type Context = Promise<{ slug: string }>

const db = new PrismaClient()

export const GET = ApiEndpoint<Context>(async (
  request, context
) => {
  const { slug } = await context.params
  const type = new Query(
    request.nextUrl.searchParams
  ).oneOfOrDefault<BlogType>("type", [
    "detailed", "card", "list"
  ], "detailed")

  return Response.json(await new Blogger(db).getBlog(slug, type))
}, ApiType.public)

export const PATCH = ApiEndpoint<Context>(async (
  request, context
) => {
  const validated = await (
    await FormBody.fromRequest<Partial<BlogRequest>>(
      request,
      FormBodyType.FORM_DATA
    )
  ).validate(blogEditScheme)

  const existing = await db.blog.findUnique({
    where: { slug: (await context.params).slug }
  })

  if (!existing) return Response.json({
    message: dictionary.api.error.notFound
  })

  const slug = slugify(validated.title || existing.title, {
    lower: true, trim: true, strict: true
  })

  if (slug !== existing.slug && await db.blog.findUnique({
    where: { slug }
  })) return Response.json({
    message: dictionary.api.error.uniqueSlug
  })

  let { cover } = existing
  if (validated.cover instanceof File) {
    // Delete existing cover image
    await Bucket.deleteMatchingFiles(
      "covers",
      new RegExp(existing.cover.replace(
        /^\/uploads\/covers\//,
        ""
      ).replace(/\+\d+.*/, ""))
    )
    // Optimize and upload new cover image
    cover = await Bucket.uploadFile(
      await new Studio(validated.cover).printPhoto(),
      `covers/${slug}+${Date.now()}.webp`
    )
  }

  let { readTime } = existing
  if (validated.content) readTime = TypeWriter.readTime(
    validated.content
  )

  const blog = await db.blog.update({
    where: { slug: (await context.params).slug },
    data: {
      ...validated,
      slug,
      cover,
      readTime,
      published: validated.published
        ? String(validated.published) !== "false"
        : undefined,
      updatedAt: new Date(),
      category: validated.category
        ? { connect: { slug: validated.category } }
        : undefined
    }
  })

  return Response.json(blog, { status: 200 })
})

export const DELETE = ApiEndpoint<Context>(async (
  request, context
) => {
  const existing = await db.blog.findUnique({
    where: { slug: (await context.params).slug }
  })

  if (!existing) return Response.json({
    message: dictionary.api.error.notFound
  })

  await db.blog.delete({
    where: { slug: (await context.params).slug }
  })

  await Bucket.deleteMatchingFiles(
    "covers",
    new RegExp(existing.cover.replace(
      /^\/uploads\/covers\//,
      ""
    ).replace(/\+\d+.*/, ""))
  )

  return new Response(null, { status: 204 })
})