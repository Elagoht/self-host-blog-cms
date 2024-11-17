"use client"

import useBreadcrumbs from "@/stores/breadcrumbs"
import { FC, useEffect } from "react"

type SetBreadCrumbsProps = {
  breadcrumbs: Breadcrumb[]
}

const SetBreadCrumbs: FC<SetBreadCrumbsProps> = ({ breadcrumbs }) => {
  const setBreadcrumbs = useBreadcrumbs(state => state.setBreadcrumbs)

  useEffect(() => {
    setBreadcrumbs(breadcrumbs)
  }, [breadcrumbs, setBreadcrumbs])

  return null
}

export default SetBreadCrumbs