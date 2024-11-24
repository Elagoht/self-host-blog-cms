import { blogAddScheme } from "@/lib/validation/blogs"
import Bucket from "@/utilities/Bucket"
import FormBody, { FormBodyError, FormBodyType } from "@/utilities/FormBody"
import Message from "@/utilities/Message"
import Studio from "@/utilities/Studio"
import TypeWriter from "@/utilities/TypeWriter"
import { Blog, PrismaClient } from "@prisma/client"
import { NextRequest } from "next/server"
import slugify from "slugify"
import RepositoryError from "."
import Pager from "@/utilities/Pager"

class Blogger {
  /**
   * Get a blog by its slug
   */
  public getBlog = async (
    slug: string,
    type: BlogType = "detailed"
  ) => await this.getBlogData(
    slug, type
  )

  /**
   * Get paginated list of blogs with filters
   */
  public getBlogs = async (
    filters: BlogFilters = this.DEFAULT_FILTERS,
    type: BlogType = "detailed",
    page: number = this.DEFAULT_PAGE,
    take: number = this.DEFAULT_TAKE
  ) => Pager.convert(
    await this.getBlogsData(filters, type, page, take),
    (page ?? this.DEFAULT_PAGE) < 1
      ? this.DEFAULT_PAGE
      : (page ?? this.DEFAULT_PAGE),
    (take ?? this.DEFAULT_TAKE) < 1
      ? this.DEFAULT_TAKE
      : (take ?? this.DEFAULT_TAKE)
  )

  /**
   * Create a new blog
   */
  public createBlog = async (
    request: NextRequest
  ) => {
    const blog = await (
      await FormBody.fromRequest<BlogRequest>(
        request,
        FormBodyType.FORM_DATA
      )
    ).validate(blogAddScheme)

    if (
      !(blog.cover instanceof File)
    ) throw new FormBodyError(
      Message.errorMessage("image", "cover")
    )

    const slug = slugify(blog.title, {
      lower: true, trim: true, strict: true
    })

    if (await this.prisma.blog.findUnique({
      where: { slug }
    })) throw new FormBodyError(
      Message.errorMessage("uniqueSlug", "title")
    )

    return await this.prisma.blog.create({
      data: {
        ...blog,
        slug,
        readCount: 0,
        cover: await Bucket.uploadFile(
          await new Studio(blog.cover).printPhoto(),
          /**
           * A timestamp is added with a separator
           * to prevent caching issues.
           * "+" is used as a separator because it's
           * URL-safe and won't be included when
           * slugifying the filename.
           */
          `covers/${slug}+${Date.now()}.webp`
        ),
        readTime: TypeWriter.readTime(blog.content),
        published: String(blog.published) !== "false",
        category: { connect: { slug: blog.category } }
      }
    })
  }

  private readonly DEFAULT_TAKE = 12 // Divisible by 2, 3 and 4
  private readonly DEFAULT_PAGE = 1
  private readonly DEFAULT_FILTERS: BlogFilters = {
    published: true
  }
  private readonly prisma: PrismaClient

  public constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  private getBlogData = async (
    slug: string,
    type: BlogType = "detailed"
  ) => {
    const blog = await this.prisma.blog.findUnique({
      where: { slug },
      include: { category: { select: { slug: true } } }
    }) satisfies BlogWithCategory | null
    if (!blog) throw new RepositoryError("Blog not found", "NotFound")
    return this.changeModel(blog, type)
  }

  // Paginated list of blogs
  public getBlogsData = async (
    filters: BlogFilters = this.DEFAULT_FILTERS,
    type: BlogType = "detailed",
    page: number = this.DEFAULT_PAGE,
    take: number = this.DEFAULT_TAKE
  ) => {
    const pageToUse = page < 1
      ? this.DEFAULT_PAGE
      : page
    const takeToUse = take < 1
      ? this.DEFAULT_TAKE
      : take
    return (await this.prisma.blog.findMany({
      skip: (pageToUse - 1) * takeToUse,
      take: takeToUse,
      where: {
        published: filters.published ?? undefined,

        category: filters.category ? {
          slug: filters.category
        } : undefined,
        OR: filters.search ? [
          { title: { contains: filters.search } },
          { content: { contains: filters.search } }
        ] : undefined
      },
      include: {
        category: {
          select: { slug: true }
        }
      }
    })).map(blog =>
      this.changeModel(blog, type)
    )
  }

  private changeModel(
    blog: BlogWithCategory,
    type: BlogType
  ) {
    switch (type) {
      case "card":
        return {
          title: blog.title,
          slug: blog.slug,
          spot: blog.spot,
          cover: blog.cover,
          published: blog.published,
          createdAt: blog.createdAt,
          updatedAt: blog.updatedAt,
          category: blog.category.slug
        } satisfies BlogCardResponse
      case "list":
        return {
          title: blog.title,
          cover: blog.cover,
          category: blog.category.slug
        } satisfies BlogListResponse
      case "detailed":
        return {
          id: blog.id,
          title: blog.title,
          slug: blog.slug,
          content: blog.content,
          keywords: blog.keywords,
          description: blog.description,
          spot: blog.spot,
          cover: blog.cover,
          published: blog.published,
          createdAt: blog.createdAt,
          updatedAt: blog.updatedAt,
          readTime: blog.readTime,
          readCount: blog.readCount,
          category: blog.category.slug
        } satisfies BlogDetailedResponse
      default: throw new Error("Invalid blog type for changeModel")
    }
  }
}

declare global {
  type BlogWithCategory = Blog & { category: { slug: string } }

  type BlogType = "card" | "list" | "detailed"
}

export default Blogger