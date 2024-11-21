import { NextRequest } from "next/server"
import { FormBodyError } from "./FormBody"
import dictionary from "@/i18n"
import Auth from "./Auth"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

export enum ApiType {
  public,
  private
}

const ApiEndpoint = <T>(
  /**
   * Default Next.js request handler function
   *
   * @param request Next.js request object
   * @param context Object containing route parameters
   */
  handler: (
    request: NextRequest,
    context: { params: T }
  ) => Promise<Response>,
  /**
   * Require authentication by default
   */
  requireAuth = ApiType.private
) => async (
  request: NextRequest,
  context: { params: T }
) => {
    try {
      if (requireAuth && !await Auth.isValid(
        Auth.getAccessToken(request.cookies)
      )) return Response.json({
        message: dictionary.api.error.unauthorized
      }, { status: 401 })

      return await handler(request, context)
    } catch (error) {
      switch (true) {
        case error instanceof FormBodyError:
          return Response.json({
            message: error.message,
          }, { status: 400 })
        case error instanceof PrismaClientKnownRequestError:
          switch (error.code) {
            case "P2002":
              return Response.json({
                message: dictionary.api.error.uniqueSlug
              }, { status: 404 })
            default:
              return Response.json({
                message: dictionary.api.error.server
              }, { status: 500 })
          }
        default:
          return Response.json({
            message: dictionary.api.error.server
          }, { status: 500 })
      }
    }
  }

export default ApiEndpoint