import dictionary from "@/i18n"
import { loginSchema } from "@/lib/validation/login"
import ApiEndpoint from "@/utilities/ApiEndpoint"
import FormBody from "@/utilities/FormBody"
import { NextRequest } from "next/server"

export const POST = ApiEndpoint(async (
  request: NextRequest
) => {
  const validated = await (
    await FormBody.fromRequest<LoginRequest>(request)
  ).validate(loginSchema)

  if (
    validated.username === process.env.USERNAME &&
    validated.passphrase === process.env.PASSPHRASE
  ) return Response.json({
    message: dictionary.auth.login.success
  }, { status: 200 })

  return Response.json({
    message: dictionary.auth.login.failure
  }, { status: 401 })
})