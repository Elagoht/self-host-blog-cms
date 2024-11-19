"use client"

import classNames from "classnames"
import { FC, useState } from "react"
import BlogCard from "./BlogCard"
import { IconLayoutGrid, IconLayoutRows, IconPlus } from "@tabler/icons-react"
import Button from "@/components/formElements/Button"
import dictionary from "@/i18n"

type BlogShowcaseProps = {
  blogs: BlogResponse[]
}

const BlogShowcase: FC<BlogShowcaseProps> = ({ blogs }) => {
  const [layout, setLayout] = useState<"grid" | "list">("grid")

  return <>
    <div className="flex gap-4">
      <Button
        onClick={() => setLayout(layout === "grid"
          ? "list"
          : "grid"
        )}
        color="secondary"
      >
        {layout === "grid"
          ? <IconLayoutGrid size={24} />
          : <IconLayoutRows size={24} />
        }
      </Button>

      <Button
        href="/blogs/new"
        icon={<IconPlus />}
      >
        {dictionary.blogs.main.new}
      </Button>
    </div>

    <div className={classNames(
      "grid gap-4", {
      "grid-cols-cards": layout === "grid",
      "grid-cols-1": layout === "list"
    })}>
      {blogs.map(blog => (
        <BlogCard
          key={blog.id}
          blog={blog}
          layout={layout}
        />
      ))}
    </div>
  </>
}

export default BlogShowcase