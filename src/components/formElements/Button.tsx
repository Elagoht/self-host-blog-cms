import classNames from "classnames"
import Link, { LinkProps } from "next/link"
import { AnchorHTMLAttributes, ButtonHTMLAttributes, FC, ReactNode } from "react"

type ButtonProps = {
  icon?: ReactNode
  color?: "primary" | "secondary" | "danger" | "success" | "warning" | "info"
  reverse?: boolean
} & ((ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: never
}) | (LinkProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
  disabled?: never
  href: string
}))


const Button: FC<ButtonProps> = ({
  color = "primary", icon, href, reverse, ...props
}) => {
  const buttonClass = classNames(
    "p-2 rounded-lg flex items-center gap-2 shadow",
    "block whitespace-nowrap block transition-all",
    "ring-offset-neutral-50 dark:ring-offset-neutral-900",
    props.className, {
    "flex-row-reverse": reverse,
    "hover:ring-2 hover:ring-offset-2": !props.disabled,
    "ring-primary-500 bg-primary-500 text-primary-100": color === "primary",
    "ring-secondary-500 bg-secondary-500 text-secondary-900": color === "secondary",
    "ring-red-500 bg-red-500 text-red-100": color === "danger",
    "ring-green-500 bg-green-500 text-green-100": color === "success",
    "ring-amber-500 bg-amber-500 text-amber-900": color === "warning",
    "ring-blue-500 bg-blue-500 text-blue-100": color === "info",
    "cursor-not-allowed opacity-50": !href && props.disabled
  })

  if (href)
    return <Link
      {...props as LinkProps}
      href={href}
      className={buttonClass}
    >
      <span className="grow">
        {props.children}
      </span>

      {icon}
    </Link>

  return <button
    {...props as ButtonHTMLAttributes<HTMLButtonElement>}
    className={buttonClass}
  >
    <span className="grow">
      {props.children}
    </span>

    {icon}
  </button>
}

export default Button