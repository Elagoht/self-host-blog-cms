import dictionary from "@/i18n"
import { IconMoodEmpty } from "@tabler/icons-react"
import { FC } from "react"

const BlogCardEmpty: FC = () =>
  <div className="p-2 flex flex-col items-center justify-center
    rounded-lg shadow min-h-64 bg-neutral-50 dark:bg-neutral-800
    text-center font-semibold col-span-3"
  >
    <IconMoodEmpty
      size={128}
      stroke={0.75}
    />

    {dictionary.blogs.card.empty}
  </div>

export default BlogCardEmpty