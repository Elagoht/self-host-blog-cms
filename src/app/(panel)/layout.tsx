import Breadcrumbs from "@/components/layout/Breadcrumbs"
import HeaderMenu from "@/components/layout/HeaderMenu"
import NavBar from "@/components/layout/NavBar"
import dictionary from "@/i18n"
import { IconContract } from "@tabler/icons-react"
import { FC } from "react"

const PanelLayout: FC<LayoutComponent> = ({
  children
}) => {
  return <div className="h-screen sm:p-4 p-2 sm:gap-4 gap-2 grid
    grid-rows-dashboard sm:grid-cols-dashboard transition-all"
  >
    <nav className="max-sm:hidden flex flex-col gap-4
      row-span-2 overflow-x-auto"
    >
      <figure className="flex items-center justify-center gap-4
        text-3xl font-semibold my-2"
      >
        <IconContract size={48} />

        <figcaption>
          {dictionary.branding.title}
        </figcaption>
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
      bg-neutral-100 dark:bg-neutral-900 sm:max-w-[calc(100vw-19rem)]"
    >
      {children}
    </main>
  </div>
}

export default PanelLayout