"use client"

import Button from "@/components/formElements/Button"
import Expandable from "@/components/ui/Expandable"
import dictionary from "@/i18n"
import { IconFilter, IconLayoutGrid, IconLayoutRows, IconPlus } from "@tabler/icons-react"
import { FC, useState } from "react"
import BlogFilterOptions from "./BlogFilterOptions"

type BlogFiltersProps = {
  layout: "grid" | "list"
  setLayout: (layout: "grid" | "list") => void
  categories: CategoryResponse[]
  searchParams: Record<string, string | undefined>
}

const BlogFilters: FC<BlogFiltersProps> = ({
  layout, setLayout, categories, searchParams
}) => {
  const [expandedFilters, setExpandedFilters] = useState<boolean>(
    searchParams.category !== undefined ||
    searchParams.published !== undefined ||
    searchParams.search !== undefined
  )

  return <>
    <div className="flex gap-2">
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
        reverse
        color={expandedFilters ? "info" : "secondary"}
        icon={<IconFilter />}
        onClick={() => setExpandedFilters((prev) => !prev)}
      >
        {dictionary.blogs.main.filters.title}
      </Button>

      <Button
        href="/blogs/new"
        icon={<IconPlus />}
        className="ml-auto"
      >
        {dictionary.blogs.main.new}
      </Button>
    </div>

    <Expandable
      expanded={expandedFilters}
      className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950 shadow"
    >
      <BlogFilterOptions
        searchParams={searchParams}
        categories={categories}
      />
    </Expandable >
  </>
}

export default BlogFilters