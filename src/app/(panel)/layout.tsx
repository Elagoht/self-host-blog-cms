"use client"

import Breadcrumbs from "@/components/layout/Breadcrumbs"
import HeaderMenu from "@/components/layout/HeaderMenu"
import NavBar from "@/components/layout/NavBar"
import dictionary from "@/i18n"
import { useHamburger } from "@/stores/hamburger"
import { IconContract, IconX } from "@tabler/icons-react"
import classNames from "classnames"
import { usePathname } from "next/navigation"
import { FC, useEffect } from "react"

const PanelLayout: FC<ParentComponent> = ({
  children
}) => {
  const isOpen = useHamburger(state => state.isOpen)
  const close = useHamburger(state => state.close)

  const pathname = usePathname()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(close, [pathname])

  return <div className="h-dvh sm:p-4 p-2 sm:gap-4 gap-2 grid
    grid-rows-dashboard sm:grid-cols-dashboard transition-all"
  >
    <div
      className={classNames(
        "fixed inset-0 z-40",
        "max-sm:bg-black max-sm:transition-all", {
        "opacity-0 pointer-events-none": !isOpen,
        "max-sm:opacity-75": isOpen
      })}
      onClick={close}
    />

    <nav className={classNames(
      "flex flex-col gap-4 row-span-2 overflow-x-auto max-sm:max-w-96",
      "max-sm:fixed max-sm:top-0 max-sm:left-0 max-sm:bottom-0",
      "max-sm:z-50 max-sm:p-4 max-sm:w-screen max-sm:transition-transform", {
      "max-sm:-translate-x-full": !isOpen,
      "max-sm:bg-neutral-50 dark:max-sm:bg-neutral-950": isOpen
    })}
    >
      <figure className="flex items-center justify-center gap-4
        text-3xl font-semibold my-2"
      >
        <button
          className="flex items-center justify-center gap-2 sm:hidden
          p-2 rounded-lg bg-neutral-200 dark:bg-neutral-800"
          onClick={close}
        >
          <IconX size={24} />
        </button>

        <div className="flex items-center justify-center gap-2 grow">
          <IconContract size={48} />

          <figcaption>
            {dictionary.branding.title}
          </figcaption>
        </div>
      </figure>

      <NavBar />
    </nav>

    <header className="flex items-center justify-between">
      <nav className="flex gap-4">
        <Breadcrumbs />
      </nav>

      <HeaderMenu />
    </header>

    <main className="flex flex-col gap-4 shadow-inner p-4 rounded-2xl
      bg-neutral-100 overflow-x-auto dark:bg-neutral-900
      sm:max-w-[calc(100vw-19rem)] max-w-[calc(100vw-1rem)]"
    >
      {children}
    </main>
  </div >
}

export default PanelLayout