import { NextRequest, NextResponse } from "next/server"
import Auth from "./utilities/Auth"

export const middleware = async (
  request: NextRequest
) => {
  const isAuthorized = await Auth.isValid(
    Auth.getAccessToken(request.cookies)
  )
  const isOnAuthPage = Auth.authRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )

  if (!isAuthorized && !isOnAuthPage)
    return NextResponse.redirect(`${request.nextUrl.origin
      }/login?next=${encodeURIComponent(request.nextUrl.toString())
      }`)
  if (isOnAuthPage && isAuthorized)
    return NextResponse.redirect(`${request.nextUrl.origin}/`)
  return NextResponse.next()
}

export const config = {
  matcher: "/((?!_next/static|uploads|api|assets|_next/image|favicon.ico).*)"
}
