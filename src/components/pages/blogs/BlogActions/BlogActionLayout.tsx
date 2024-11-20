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
}) =>
  <button
    type="button"
    className="shadow-md p-2 rounded-full
  bg-neutral-200 dark:bg-neutral-800"
    onClick={() => setPreview(
      preview === "horizontal"
        ? "vertical"
        : preview === "vertical"
          ? "disabled"
          : "horizontal"
    )}
  >
    {preview === "horizontal"
      ? <IconLayoutBottombarFilled />
      : preview === "vertical"
        ? <IconLayoutSidebarRightFilled />
        : <IconEyeOff />
    }
  </button>

export default BlogActionLayout