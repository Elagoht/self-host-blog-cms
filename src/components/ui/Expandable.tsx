import classNames from "classnames"
import { FC, ReactNode } from "react"

type ExpandableProps = {
  expanded: boolean
  className?: string
  containerClassName?: string
  children?: ReactNode
}

const Expandable: FC<ExpandableProps> = ({
  expanded, className, children, containerClassName
}) =>
  <div className={classNames(
    "grid transition-all duration-300 ease-out", containerClassName, {
    "grid-rows-expanded": expanded,
    "grid-rows-collapsed opacity-0": !expanded
  })}>
    <div className={classNames(
      className,
      "overflow-hidden"
    )}>
      {children}
    </div>
  </div>

export default Expandable