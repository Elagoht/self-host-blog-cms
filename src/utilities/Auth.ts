import { SignJWT, jwtVerify } from "jose"
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies"

class Auth {
  public static authRoutes = ["/login"]

  public static createToken = async (
    data: Record<PropertyKey, unknown>,
    expiresIn: string = "1h"
  ) => await new SignJWT(data)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresIn)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET!))

  public static isValid = async (
    accessToken?: string
  ): Promise<boolean> => {
    if (!accessToken) return false
    try {
      const { payload } = await jwtVerify(
        accessToken,
        new TextEncoder().encode(process.env.JWT_SECRET!)
      )

      if (!payload) return false
      return true
    } catch {
      return false
    }
  }

  public static getAccessToken = (
    cookies: RequestCookies
  ) => cookies.get("accessToken")?.value
}

export default Auth
