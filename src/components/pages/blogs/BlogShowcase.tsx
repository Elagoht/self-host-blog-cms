"use client"

import classNames from "classnames"
import { FC, useState } from "react"
import BlogCard from "./BlogCard"
import BlogCardEmpty from "./BlogCardEmpty"
import BlogFilters from "./BlogFilters"

type BlogShowcaseProps = {
  blogs: BlogCardResponse[]
  categories: CategoryResponse[],
  searchParams: Record<string, string | undefined>
}

const BlogShowcase: FC<BlogShowcaseProps> = ({
  blogs, categories, searchParams
}) => {
  const [layout, setLayout] = useState<"grid" | "list">("grid")

  return <>
    <BlogFilters
      layout={layout}
      setLayout={setLayout}
      categories={categories}
      searchParams={searchParams}
    />

    <div className={classNames(
      "grid gap-4", {
      "grid-cols-cards": layout === "grid",
      "grid-cols-1": layout === "list"
    })}>
      {blogs.length === 0
        ? <BlogCardEmpty />
        : blogs.map(blog =>
          <BlogCard
            key={blog.slug}
            blog={blog}
            layout={layout}
          />
        )
      }
    </div>
  </>
}

export default BlogShowcase