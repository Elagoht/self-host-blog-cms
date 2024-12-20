import dictionary from "@/i18n"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { NextRequest } from "next/server"
import Auth from "./Auth"
import { FormBodyError } from "./FormBody"
import RepositoryError from "@/data"

const ApiEndpoint = <T = Promise<unknown>>(
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
      switch (true) {
        case Auth.isTrustedSoftware(request.headers):
        case requireAuth === ApiType.public:
          break
        default:
          if (!await Auth.isValid(Auth.getAccessToken(request.cookies)))
            return Response.json({
              message: dictionary.api.error.unauthorized
            }, { status: 401 })
          break
      }
      return await handler(request, context)
    } catch (error) {
      // eslint-disable-next-line no-console
      if (process.env.DEBUG === "true") console.error(error)
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
        case error instanceof RepositoryError:
          switch (error.reason) {
            case "NotFound":
              return Response.json({
                message: dictionary.api.error.notFound
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

export enum ApiType {
  public,
  private
}

export default ApiEndpoint