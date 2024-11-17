import { IconCategory, IconDashboard, IconWritingSign } from "@tabler/icons-react"
import { ReactElement } from "react"

const navbarMenu: Array<{
  title: keyof Dictionary["navbar"]
  href: string
  icon: ReactElement
}> = [{
  title: "dashboard",
  href: "/",
  icon: <IconDashboard />
}, {
  title: "blogs",
  href: "/blogs",
  icon: <IconWritingSign />
}, {
  title: "categories",
  href: "/categories",
  icon: <IconCategory />
}]

export default navbarMenu