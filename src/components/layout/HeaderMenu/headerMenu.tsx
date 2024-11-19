import { IconLogout } from "@tabler/icons-react"
import { ReactNode } from "react"

export const headerMenu: Array<{
  href: string
  icon: ReactNode
}> = [{
  href: "/api/auth/logout",
  icon: <IconLogout />
}]

export default headerMenu