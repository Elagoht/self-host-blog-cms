"use client"

import Button from "@/components/formElements/Button"
import Checkbox from "@/components/formElements/Checkbox"
import Select from "@/components/formElements/Select"
import dictionary from "@/i18n"
import { IconTransferVertical, IconTrash } from "@tabler/icons-react"
import { FC, useEffect, useMemo, useRef, useState } from "react"
import CategoryDeleteRow from "./CategoryDeleteRow"
import Message from "@/utilities/Message"

type CategoryDeleteTableProps = {
  name: CategoryResponse["name"]
  slug: CategoryResponse["slug"]
  blogs: BlogListResponse[]
  categories: CategoryResponse[]
  list: BlogListResponse["slug"][]
  handleTransfer: (
    source: CategoryResponse["id"],
    target: CategoryResponse["id"],
    slugs: BlogListResponse["slug"][]
  ) => void
  deleting: CategoryResponse["slug"]
  isTrash?: boolean
}

/**
 * Rows are draggable object and this is the container
 * that users can drop the dragged row into. This is
 * the place where we can handle the drop event.
 *
 * Target data will be text/plain and it will contain
 * the json data of slug of the blog and source category.
 *
 * @example
 * ```json
 * {
 *   "blog": "why-my-phone-is-slow",
 *   "source": "technology"
 * }
 * ```
 *
 * @see CategoryDeleteRow
 */
const CategoryDeleteTable: FC<CategoryDeleteTableProps> = ({
  categories, blogs, name, slug, list,
  handleTransfer, deleting, isTrash
}) => {
  const selfRef = useRef<HTMLDivElement>(null)

  const [target, setTarget] = useState<CategoryResponse["id"]>(
    categories?.[0]?.slug
  )
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

  useEffect(() => {
    if (!selfRef.current) return

    const self = selfRef.current

    const handleDragOver = (event: DragEvent) => {
      if (!event.dataTransfer) return
      event.preventDefault()
      event.dataTransfer.dropEffect = "move"
    }

    const handleDrop = (event: DragEvent) => {
      if (!event.dataTransfer) return
      event.preventDefault()
      const data = event.dataTransfer.getData("text/plain")
      const { blog, source } = JSON.parse(data)

      handleTransfer(source, slug, [blog])
    }

    self.addEventListener("dragover", handleDragOver)
    self.addEventListener("drop", handleDrop)

    return () => {
      self.removeEventListener("dragover", handleDragOver)
      self.removeEventListener("drop", handleDrop)
    }
  }, [handleTransfer])

  return <div
    ref={selfRef}
    className="overflow-x-auto p-1"
  >
    <h2 className="text-xl font-semibold px-2">
      {Message.format(dictionary.categories.delete.table[isTrash
        ? "delete"
        : "newCategory"
      ], {
        name
      })}
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
          disabled={!someSelected || !target}
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
          disabled={!someSelected || !target}
          onClick={() => {
            if (!target) return
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

        {!isTrash &&
          <Button
            type="button"
            color="danger"
            className="ml-auto"
            disabled={!someSelected}
            onClick={() => {
              setSelected({})
              handleTransfer(
                slug, deleting, blogs.filter(
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
            key={blog.slug}
            blog={blog}
            isTrash={isTrash}
            selected={selected[blog.id]}
            slug={slug}
            setSelected={() => setSelected({
              ...selected,
              [blog.id]: !selected[blog.id]
            })}
          />
        )}
      </ul>
    </div>
  </div >
}

export default CategoryDeleteTable

type Selection = { [key: BlogListResponse["id"]]: boolean }