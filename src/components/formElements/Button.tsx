import classNames from "classnames"
import Link, { LinkProps } from "next/link"
import { AnchorHTMLAttributes, ButtonHTMLAttributes, FC, ReactNode } from "react"

type ButtonProps = {
  icon?: ReactNode
  color?: "primary" | "secondary" | "danger" | "success" | "warning"
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
    "ring-primary-500 bg-primary-500 text-white": color === "primary",
    "ring-secondary-500 bg-secondary-500 text-white": color === "secondary",
    "ring-red-500 bg-red-500 text-white": color === "danger",
    "ring-green-500 bg-green-500 text-white": color === "success",
    "ring-amber-500 bg-amber-500 text-white": color === "warning",
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