import ApiEndpoint, { ApiType } from "@/utilities/ApiEndpoint"
import { PrismaClient } from "@prisma/client"

const db = new PrismaClient()

export const GET = ApiEndpoint(async () => Response.json(
  await db.blog.findMany({
    where: { published: true },
    include: {
      category: { select: { slug: true, name: true } }
    }
  }), { status: 200 }
), ApiType.public)