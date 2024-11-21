import ApiEndpoint from "@/utilities/ApiEndpoint"
import Bucket from "@/utilities/Bucket"

type Context = Promise<{ path: string[] }>

export const GET = ApiEndpoint<Context>(async (
  request,
  context
) => new Response(await Bucket.getFile((
  await context.params
).path.join("/"))))
