"use client"

import useDictionary from "@/stores/dictionary"
import { IconTrash } from "@tabler/icons-react"
import classNames from "classnames"
import { ChangeEvent, FC, InputHTMLAttributes, useState } from "react"

type IFileInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string
  message?: string
  error?: string
  touched?: boolean
}

const FileInput: FC<IFileInputProps> = ({
  label, message, error, touched, ...props
}) => {
  const dictionary = useDictionary()

  const [file, setFile] = useState<File>()
  const [focused, setFocused] = useState<boolean>(false)

  return <div className="flex flex-col gap-1">
    <span>{label}</span>

    {message &&
      <small className="text-neutral-500 -mt-1">
        {message}
      </small>
    }

    <label className={classNames(
      "!bg-neutral-200 dark:!bg-neutral-800 shadow-inner p-1 rounded-lg transition-all disabled:bg-neutral-50 dark:disabled:bg-neutral-950 flex items-center gap-2 relative",
      props.className, {
      "opacity-50 cursor-not-allowed": props.disabled,
      "outline-none outline-primary-500": focused,
    })}>
      <input
        {...props}
        type="file"
        className="sr-only"
        onChange={(event) => {
          setFile(event.target.files?.[0] || undefined)
          props.onChange?.(event)
        }}
        onFocus={(event) => {
          setFocused(true)
          props.onFocus?.(event)
        }}
        onBlur={(event) => {
          setFocused(false)
          props.onBlur?.(event)
        }}
      />

      <div className="text-neutral-500 p-2 shadow bg-neutral-100 dark:bg-neutral-900 rounded-md whitespace-nowrap">
        {file
          ? dictionary.input.file.change
          : dictionary.input.file.choose
        }
      </div>

      <span className={classNames(
        "grow truncate", {
        "text-primary-500 dark:text-primary-400 font-semibold": file,
        "text-neutral-500": !file
      })}>
        {file?.name
          ? dictionary.input.file.selected
          : dictionary.input.file.placeholder
        }
      </span>

      <button
        type="button"
        className="shadow-md p-2 rounded-md bg-primary-500 dark:bg-primary-400 text-white dark:text-black transition-all"
        onClick={() => {
          setFile(undefined)
          props.onChange?.({
            target: {
              value: "",
              files: null
            }
          } as ChangeEvent<HTMLInputElement>)
        }}
      >
        <IconTrash />
      </button>
    </label>

    {error && touched &&
      <small className="text-red-500">{error}</small>
    }
  </div>
}

export default FileInput