import classNames from "classnames"
import { FC, HTMLAttributes } from "react"

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  title?: string
  description?: string
}

const Container: FC<ParentComponent<ContainerProps>> = ({
  title, description, ...props
}) =>
  <div
    {...props}
    className={classNames(
      "max-w-screen-lg mx-auto w-full space-y-4 animate-fade-in",
      props.className
    )}
  >
    {title && <h1 className="text-2xl font-bold">{title}</h1>}

    {description && <p className="text-neutral-500">{description}</p>}

    {props.children}
  </div>

export default Container