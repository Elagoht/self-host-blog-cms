import { NextRequest } from "next/server"
import { FormBodyError } from "./FormBody"
import dictionary from "@/i18n"

const ApiEndpoint = <T>(
  handler: (
    request: NextRequest,
    context: { params: T }
  ) => Promise<Response>
) => async (
  request: NextRequest,
  context: { params: T }
) => {
    try {
      return await handler(request, context)
    } catch (error) {
      return error instanceof FormBodyError
        ? Response.json({
          message: error.message,
        }, { status: 400 })
        : Response.json(
          { message: dictionary.api.error.server },
          { status: 500 }
        )
    }
  }

export default ApiEndpoint