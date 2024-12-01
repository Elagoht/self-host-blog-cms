import { FC } from "react"
import BlogActionLayout from "./BlogActionLayout"
import BlogActionDelete from "./BlogActionDelete"

type BlogActionsProps = {
  isNarrow: boolean
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
  mode, slug, title, isNarrow, preview, setPreview
}) =>
  <div className="flex gap-4 items-center md:flex-col md:sticky top-0">
    <BlogActionLayout
      isNarrow={isNarrow}
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