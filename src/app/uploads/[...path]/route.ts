import ApiEndpoint from "@/utilities/ApiEndpoint"
import Bucket, { BucketError } from "@/utilities/Bucket"

type Context = Promise<{ path: string[] }>

export const GET = ApiEndpoint<Context>(async (
  request, context
) => {
  try {
    return new Response(await Bucket.getFile((
      await context.params
    ).path.join("/")), {
      status: 200
    })

  } catch (error) {
    if (
      error instanceof BucketError
      && error.message === "read"
    ) return Response.json({
      message: "notFound"
    }, { status: 404 })

    throw error
  }
})