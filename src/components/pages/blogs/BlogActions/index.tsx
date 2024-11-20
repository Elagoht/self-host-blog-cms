import { FC } from "react"
import BlogActionLayout from "./BlogActionLayout"

type BlogActionsProps = {
  preview: "horizontal" | "vertical" | "disabled"
  setPreview: (
    preview: "horizontal" | "vertical" | "disabled"
  ) => void
}

const BlogActions: FC<BlogActionsProps> = ({
  preview, setPreview
}) =>
  <div className="flex gap-4 items-center flex-col sticky top-0">
    <BlogActionLayout
      preview={preview}
      setPreview={setPreview}
    />
  </div>

export default BlogActions