import { IconLogout, IconSettings, IconUserCircle } from "@tabler/icons-react"
import { ReactNode } from "react"

export const headerMenu: Array<{
  href: string
  icon: ReactNode
}> = [{
  href: "/profile",
  icon: <IconUserCircle />
}, {
  href: "/api/auth/logout",
  icon: <IconLogout />
}, {
  href: "/logout",
  icon: <IconSettings />
}]

export default headerMenu