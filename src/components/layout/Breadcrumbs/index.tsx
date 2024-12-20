"use client"

import dictionary from "@/i18n"
import useBreadcrumbs from "@/stores/breadcrumbs"
import { useHamburger } from "@/stores/hamburger"
import { IconHome, IconMenu } from "@tabler/icons-react"
import Link from "next/link"
import { FC, Fragment } from "react"

const Breadcrumbs: FC = () => {
  const breadcrumbs = useBreadcrumbs((state) => state.breadcrumbs)
  const open = useHamburger((state) => state.open)

  return <nav className="flex items-center rounded-full shadow-inner
    bg-neutral-100 dark:bg-neutral-800 text-neutral-500"
  >
    <button
      className="h-10 w-10 flex items-center justify-center rounded-l-full
      transition-all hover:bg-primary-400 dark:hover:bg-primary-600
      bg-primary-500 text-primary-50 shadow-md sm:hidden"
      onClick={open}
    >
      <IconMenu size={20} />
    </button>

    <Link
      href="/"
      className="flex items-center justify-center rounded-r-full sm:rounded-full h-10 w-10
      transition-all hover:bg-primary-400 dark:hover:bg-primary-600
      bg-primary-500 text-primary-50 shadow-md"
    >
      <IconHome size={20} />
    </Link>

    <div className="flex items-center overflow-clip">
      {breadcrumbs.map((breadcrumb, index) =>
        <Fragment key={index}>
          <Link
            href={breadcrumb.href}
            className="h-10 px-2 flex items-center hover:bg-neutral-300
            dark:hover:bg-neutral-700 transition-all first:ml-2 last:pr-4
            last:rounded-r-full whitespace-nowrap"
          >
            {breadcrumb.name
              ? dictionary.breadcrumbs[
              breadcrumb.name as keyof Dictionary["breadcrumbs"]
              ] || breadcrumb.name
              : breadcrumb.text
            }
          </Link>

          {index !== breadcrumbs.length - 1 &&
            <span className="text-neutral-500 select-none">
              |
            </span>
          }
        </Fragment>
      )}
    </div>
  </nav>
}

export default Breadcrumbs