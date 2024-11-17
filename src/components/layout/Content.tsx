import { FC, ReactNode } from "react"
import SetBreadCrumbs from "./Breadcrumbs/SetBreadCrumbs"

interface IContentProps {
  breadcrumbs: Breadcrumb[]
  children: ReactNode
}

const Content: FC<IContentProps> = ({ breadcrumbs, children }) => {
  return <>
    <SetBreadCrumbs breadcrumbs={breadcrumbs} />

    {children}
  </>
}

export default Content