import { IconX } from "@tabler/icons-react"
import classNames from "classnames"
import { FC, ReactNode } from "react"

type DialogProps = {
  title?: string
  message: ReactNode
  isOpen: boolean
  close: () => void
  persist?: boolean
  confirmText: string
  cancelText?: string
  onConfirm: () => void
  onCancel?: () => void
}

const Dialog: FC<DialogProps> = ({
  title, message, isOpen, close, persist = false,
  confirmText, cancelText, onConfirm, onCancel
}) => {
  return <div
    onClick={!persist
      ? close
      : undefined
    }
    className={classNames(
      "fixed inset-0 grid place-items-center p-2 bg-black bg-opacity-70",
      "backdrop-blur transition-all z-50", {
      "pointer-events-none opacity-0": !isOpen
    })}
  >
    <section
      onClick={(event) => event.stopPropagation()}
      className={classNames(
        "bg-zinc-200 dark:bg-zinc-950 rounded-lg border",
        "border-neutral-200 dark:border-neutral-800 w-full",
        "max-w-sm transition-all duration-300", {
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

      <article className="prose prose-neutral bg-zinc-100 dark:bg-zinc-900
        dark:prose-invert p-4"
      >
        {message}
      </article>

      <div className="flex justify-end border-t border-neutral-200
        dark:border-neutral-800 gap-2 p-2"
      >
        <button
          type="button"
          onClick={() => {
            close()
            onCancel?.()
          }}
          className="bg-neutral-100 dark:bg-neutral-800 font-medium
          rounded-lg transition-all hover:bg-neutral-300 px-2 py-1
          dark:hover:bg-neutral-700"
        >
          {cancelText}
        </button>

        {cancelText && onCancel &&
          <button
            type="button"
            onClick={() => {
              close()
              onConfirm?.()
            }}
            className="bg-primary-500 font-medium px-2 py-1 rounded-lg
            transition-all text-primary-50 hover:bg-primary-700
            dark:hover:bg-primary-400"
          >
            {confirmText}
          </button>
        }
      </div>
    </section>
  </div>
}

export default Dialog
