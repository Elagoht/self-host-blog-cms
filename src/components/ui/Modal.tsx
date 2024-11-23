import { IconX } from "@tabler/icons-react"
import classNames from "classnames"
import { FC, ReactNode } from "react"

type DialogProps = {
  title?: string
  isOpen: boolean
  close: () => void
  persist?: boolean
  children: ReactNode
}

const Dialog: FC<DialogProps> = ({
  title, isOpen, close, persist = false, children
}) => {
  return <div
    onClick={!persist
      ? close
      : undefined
    }
    className={classNames(
      "fixed inset-0 grid place-items-center p-2 bg-black",
      "bg-opacity-70", "backdrop-blur transition-all", {
      "pointer-events-none opacity-0": !isOpen
    })}
  >
    <section
      onClick={(event) => event.stopPropagation()}
      className={classNames(
        "bg-neutral-200 dark:bg-neutral-950 rounded-lg border",
        "border-neutral-200 dark:border-neutral-800 w-full",
        "max-w-screen-md w-full transition-all duration-300", {
        "translate-y-full opacity-0 pointer-events-none": !isOpen
      })}
    >
      <div className="flex justify-between items-center border-b
        border-neutral-200 dark:border-neutral-800 p-2"
      >
        {title && <h2 className="text-lg font-bold">{title}</h2>}

        {!persist &&
          <button
            type="button"
            disabled={!isOpen}
            className="w-8 h-8 place-items-center grid text-neutral-500
            hover:text-red-900 dark:hover:text-red-100 hover:bg-red-500
            hover:bg-opacity-50 rounded-full transition-all"
            onClick={close}
          >
            <IconX size={24} />
          </button>
        }
      </div>

      <article className="bg-neutral-100
        dark:bg-neutral-900 dark:prose-invert p-4"
      >
        {children}
      </article>
    </section>
  </div>
}

export default Dialog
