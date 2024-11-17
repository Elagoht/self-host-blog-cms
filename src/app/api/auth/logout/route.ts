import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const GET = async () => {
  (await cookies()).delete("accessToken")
  redirect("/login")
}