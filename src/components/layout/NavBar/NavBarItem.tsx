"use client"

import dictionary from "@/i18n"
import classNames from "classnames"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FC, ReactElement, useEffect, useState } from "react"

interface INavBarItemProps {
  href: string
  title: keyof Dictionary["navbar"]
  icon: ReactElement
}

const NavBarItem: FC<INavBarItemProps> = ({
  href, icon, title
}) => {
  const pathname = usePathname()
  const [isMatching, setIsMatching] = useState<boolean>(false)

  useEffect(() => {
    setIsMatching(pathname === "/"
      ? href === "/"
      : pathname.startsWith(href) && href !== "/"
    )
  }, [href, pathname])

  return <Link
    href={href}
    prefetch={false}
    className={classNames(
      "p-2 rounded-full flex items-center gap-4",
      "transition-all hover:shadow", {
      "hover:bg-primary-100 hover:text-primary-900": !isMatching,
      "hover:dark:bg-primary-900 hover:dark:text-primary-100": !isMatching,
      "hover:bg-primary-400 dark:hover:bg-primary-600": isMatching,
      "bg-primary-500 text-primary-50 shadow-md": isMatching
    })}
  >
    {icon}

    <span>{dictionary.navbar[title]}</span>
  </Link>
}

export default NavBarItem