import Link from "next/link"
import { FC, ReactNode } from "react"

interface IHeaderMenuItemProps {
  href: string
  icon: ReactNode
}

const HeaderMenuItem: FC<IHeaderMenuItemProps> = ({
  href, icon
}) => {
  return <Link
    href={href}
    className="flex items-center gap-2 p-2 rounded-full transition-all
    hover:bg-primary-500 hover:text-primary-100 hover:shadow"
  >
    {icon}
  </Link>
}

export default HeaderMenuItem