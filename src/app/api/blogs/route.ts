import { blogAddScheme } from "@/lib/validation/blogs"
import ApiEndpoint, { ApiType } from "@/utilities/ApiEndpoint"
import Bucket from "@/utilities/Bucket"
import FormBody, { FormBodyType } from "@/utilities/FormBody"
import TypeWriter from "@/utilities/TypeWriter"
import { PrismaClient } from "@prisma/client"
import slugify from "slugify"

const db = new PrismaClient()

export const POST = ApiEndpoint(async (
  request
) => {
  const validated = await (
    await FormBody.fromRequest<BlogRequest>(
      request,
      FormBodyType.FORM_DATA
    )
  ).validate(blogAddScheme)

  const slug = slugify(validated.title, {
    lower: true, trim: true, strict: true
  })

  return Response.json(
    await db.blog.create({
      data: {
        ...validated,
        slug,
        readCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        cover: await Bucket.uploadFile(
          validated.cover,
          /**
           * A timestamp is added with a separator
           * to prevent caching issues.
           * "+" is used as a separator because it's
           * URL-safe and won't be included when
           * slugifying the filename.
           */
          `/covers/${slug}+${Date.now()}.webp`
        ),
        readTime: TypeWriter.readTime(validated.content),
        published: String(validated.published) !== "false",
        category: { connect: { slug: validated.category } }
      }
    }), {
    status: 201
  })
})

export const GET = ApiEndpoint(async () => Response.json(
  await db.blog.findMany({
    include: { category: true }
  }), { status: 200 }
), ApiType.public)

