import classNames from "classnames"
import { FC, SelectHTMLAttributes } from "react"

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  message?: string
  error?: string
  touched?: boolean
}

const Select: FC<SelectProps> = ({
  label, message, error, touched, ...props
}) => {
  return <div className="flex flex-col gap-1">
    {label &&
      <label htmlFor={props.name}>{label}</label>
    }

    {message &&
      <small className="text-neutral-500 -mt-1">
        {message}
      </small>
    }

    <select
      {...props}
      className={classNames(
        "!bg-neutral-200 dark:!bg-neutral-800 shadow-inner",
        "focus:outline-none ring-2 ring-transparent min-w-0",
        "transition-all focus:outline-primary-500 rounded-lg",
        "read-only:bg-neutral-50 disabled:bg-opacity-50 p-2",
        "dark:read-only:bg-neutral-950 disabled:bg-neutral-50",
        "dark:disabled:bg-neutral-950 disabled:cursor-not-allowed",
        props.className
      )}
    >
      {props.children}
    </select>

    {error && touched && <small className="text-red-500">{error}</small>}
  </div>
}

export default Select