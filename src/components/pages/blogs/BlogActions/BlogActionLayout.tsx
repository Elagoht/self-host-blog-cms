"use client"

import {
  IconEyeOff, IconLayoutBottombarFilled,
  IconLayoutSidebarRightFilled
} from "@tabler/icons-react"
import { FC } from "react"

type BlogActionLayoutProps = {
  preview: "horizontal" | "vertical" | "disabled"
  setPreview: (
    preview: "horizontal" | "vertical" | "disabled"
  ) => void
}

const BlogActionLayout: FC<BlogActionLayoutProps> = ({
  preview, setPreview
}) => {
  const layouts = [
    <IconLayoutBottombarFilled key="horizontal" />,
    <IconLayoutSidebarRightFilled key="vertical" />,
    <IconEyeOff key="disabled" />
  ]

  return <button
    type="button"
    className="p-2 rounded-full  shadow-inner
    bg-neutral-200 dark:bg-neutral-800"
    onClick={() => {
      const currentIndex = layouts.findIndex(
        layout => layout.key === preview
      )
      const nextIndex = (currentIndex + 1) % layouts.length
      setPreview(
        layouts[nextIndex].key as
        | "horizontal"
        | "vertical"
        | "disabled"
      )
    }}
  >
    {layouts.find(layout => layout.key === preview)}
  </button>
}

export default BlogActionLayout