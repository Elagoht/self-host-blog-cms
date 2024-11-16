import classNames from "classnames"
import { FC, InputHTMLAttributes } from "react"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  message?: string
  error?: string
  touched?: boolean
}

const Input: FC<InputProps> = ({
  label, message, error, touched, ...props
}) => {
  return <div className="flex flex-col gap-1">
    <label htmlFor={props.name}>{label}</label>

    {message &&
      <small className="text-neutral-500 -mt-1">
        {message}
      </small>
    }

    <input
      {...props}
      className={classNames(
        "!bg-neutral-200 dark:!bg-neutral-800 shadow-inner p-2 rounded-lg focus:outline-none ring-2 ring-transparent focus:outline-primary-500 transition-all read-only:bg-neutral-50 dark:read-only:bg-neutral-950 disabled:bg-neutral-50 dark:disabled:bg-neutral-950 disabled:cursor-not-allowed disabled:bg-opacity-50",
        props.className
      )}
    />

    {error && touched && <small className="text-red-500">{error}</small>}
  </div>
}

export default Input