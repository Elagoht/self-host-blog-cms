"use client"

import Button from "@/components/formElements/Button"
import Checkbox from "@/components/formElements/Checkbox"
import Select from "@/components/formElements/Select"
import dictionary from "@/i18n"
import { IconTransferVertical, IconTrash } from "@tabler/icons-react"
import { FC, useMemo, useState } from "react"
import CategoryDeleteRow from "./CategoryDeleteRow"

type CategoryDeleteTableProps = {
  name: CategoryResponse["name"]
  slug: CategoryResponse["slug"]
  blogs: BlogResponse[]
  categories: CategoryResponse[]
  list: BlogResponse["slug"][]
  handleTransfer: (
    source: CategoryResponse["id"],
    target: CategoryResponse["id"],
    slugs: BlogResponse["slug"][]
  ) => void
}

const CategoryDeleteTable: FC<CategoryDeleteTableProps> = ({
  categories, blogs, name, slug, list, handleTransfer
}) => {
  const [target, setTarget] = useState<CategoryResponse["id"]>(categories[0].slug)
  const [selected, setSelected] = useState<Selection>(
    blogs.reduce((all, blog) => {
      all[blog.id] = false
      return all
    }, {} as Selection)
  )

  const allSelected = useMemo(() => Object.keys(
    selected
  ).length > 0 && Object.values(
    selected
  ).every(
    (selected) => selected
  ), [selected])

  const someSelected = useMemo(() => Object.keys(
    selected
  ).length > 0 && Object.values(
    selected
  ).some(
    (selected) => selected
  ), [selected])

  return <div className="overflow-x-auto p-1">
    <h2 className="text-xl font-semibold">
      {name}
    </h2>

    <div className="rounded-2xl overflow-clip shadow dark:shadow-neutral-950">
      <hgroup className="bg-neutral-950 p-2 pl-4 gap-2
        text-white flex items-center justify-between"
      >
        <div className="grow">
          <Checkbox
            className="mr-2"
            label={dictionary.categories.delete.table.select[allSelected
              ? "none"
              : "all"
            ]}
            checked={allSelected}
            onChange={() =>
              setSelected(blogs.reduce((all, blog) => {
                all[blog.id] = !allSelected
                return all
              }, {} as Selection))
            }
          />
        </div>

        <Select
          className="!bg-neutral-700"
          disabled={!someSelected}
          value={target}
          onChange={({ target }) => setTarget(target.value)}
        >
          <option value="" disabled>
            {dictionary.categories.delete.table.move}
          </option>
          {categories.map((category) =>
            <option
              key={category.id}
              value={category.slug}
            >
              {category.name}
            </option>
          )}
        </Select>

        <Button
          type="button"
          color="secondary"
          disabled={!someSelected}
          onClick={() => {
            setSelected({})
            handleTransfer(
              slug, target, blogs.filter(
                (blog) => selected[blog.id]
              ).map((blog) => blog.slug)
            )
          }}
        >
          <IconTransferVertical />
        </Button>

        {slug !== "" &&
          <Button
            type="button"
            color="danger"
            className="ml-auto"
            disabled={!someSelected}
            onClick={() => {
              setSelected({})
              handleTransfer(
                slug, "", blogs.filter(
                  (blog) => selected[blog.id]
                ).map((blog) => blog.slug)
              )
            }}
          >
            <IconTrash />
          </Button>
        }
      </hgroup>

      <ul>
        {blogs.filter((blog) => list.includes(blog.slug)).map((blog) =>
          <CategoryDeleteRow
            key={blog.id}
            blog={blog}
            selected={selected[blog.id]}
            setSelected={() => setSelected({
              ...selected,
              [blog.id]: !selected[blog.id]
            })}
          />
        )}
      </ul>
    </div>
  </div>
}

export default CategoryDeleteTable

type Selection = { [key: BlogResponse["id"]]: boolean }