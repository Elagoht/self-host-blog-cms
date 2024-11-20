import { FC, InputHTMLAttributes } from "react"
import classNames from "classnames"

type SwitchProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  message?: string
  error?: string
  touched?: boolean
}

const Switch: FC<SwitchProps> = ({
  label, message, error, touched, ...props
}) => {
  return <div className="flex flex-col gap-1">
    <label htmlFor={props.name}>{label}</label>

    {message &&
      <small className="text-neutral-500 -mt-1">
        {message}
      </small>
    }

    <label className="flex items-center gap-2">
      <input
        {...props}
        type="checkbox"
        className="sr-only"
      />

      <div className={classNames(
        "w-10 h-6 rounded-full p-1 relative transition-all", {
        "bg-primary-500": props.checked,
        "bg-neutral-200 dark:bg-neutral-700": !props.checked,
        "cursor-not-allowed": props.disabled
      })}>
        <div className={classNames(
          "absolute w-4 h-4 rounded-full",
          "transition-all duration-300", {
          "bg-neutral-200 dark:bg-neutral-900": props.checked,
          "bg-primary-500": !props.checked,
          "transform translate-x-full": props.checked
        })} />
      </div>
    </label>

    {error && touched &&
      <small className="text-red-500">{error}</small>
    }
  </div>
}

export default Switch