import classNames from "classnames"
import { FC, InputHTMLAttributes } from "react"

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  message?: string
  error?: string
  touched?: boolean
}

const Checkbox: FC<CheckboxProps> = ({
  label, message, error, touched, ...props
}) => {
  return <div className="flex flex-col gap-1">
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <input
        {...props}
        type="checkbox"
        className={classNames(
          "appearance-none w-5 h-5 border-2 rounded overflow-clip",
          "transition-all relative",
          "checked:bg-primary-500 checked:border-primary-500",
          "ring-offset-neutral-100 dark:ring-offset-neutral-800",
          "after:content-empty after:absolute after:transition-all",
          "after:-rotate-180 checked:after:rotate-45 after:border-r-2",
          "checked:after:opacity-100 after:w-2 after:h-3",
          "after:opacity-0 after:border-b-2 after:origin-bottom",
          "after:-translate-x-full after:-translate-y-1/2 after:bottom-0",
          "checked:after:left-1/2 after:left-0  after:border-white",
          "focus:ring-2 focus:ring-offset-2 ring-primary-500",
          props.className, {
          "border-red-500": error && touched,
          "border-neutral-300 dark:border-neutral-700": !error || !touched
        })}
      />

      {label}
    </label>

    {message &&
      <small className="text-neutral-500 -mt-1">
        {message}
      </small>
    }

    {error && touched &&
      <small className="text-red-500">
        {error}
      </small>
    }
  </div>
}

export default Checkbox