import ApiCall from "@/utilities/ApiCall"

export const postLogin = (
  username: string,
  passphrase: string
) => ApiCall.post<LoginResponse>(
  "/api/auth/login", {
  username,
  passphrase
})