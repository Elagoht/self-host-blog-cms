import { FC } from "react"
import BlogActionLayout from "./BlogActionLayout"
import BlogActionDelete from "./BlogActionDelete"

type BlogActionsProps = {
  preview: "horizontal" | "vertical" | "disabled"
  setPreview: (
    preview: "horizontal" | "vertical" | "disabled"
  ) => void
} & ({
  mode: "edit"
  slug: string
  title: string
} | {
  mode: "add"
  slug?: never
  title?: never
})

const BlogActions: FC<BlogActionsProps> = ({
  mode, slug, title, preview, setPreview
}) =>
  <div className="flex gap-4 items-center flex-col sticky top-0">
    <BlogActionLayout
      preview={preview}
      setPreview={setPreview}
    />

    {mode === "edit" &&
      <BlogActionDelete
        slug={slug}
        title={title}
      />
    }
  </div>

export default BlogActions