import classNames from "classnames"
import { ButtonHTMLAttributes, FC, ReactNode } from "react"

type IButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode
  color?: "primary" | "danger" | "success" | "warning"
}

const Button: FC<IButtonProps> = ({
  color = "primary",
  ...props
}) => {
  return <button
    {...props}
    className={classNames(
      "p-2 rounded-lg flex items-center gap-2 shadow",
      props.className, {
      "bg-primary-500 text-white": color === "primary",
      "bg-red-500 text-white": color === "danger",
      "bg-green-500 text-white": color === "success",
      "bg-amber-500 text-white": color === "warning",
      "cursor-not-allowed opacity-75": props.disabled
    })}
  >
    <span className="grow">
      {props.children}
    </span>

    {props.icon}
  </button>
}

export default Button