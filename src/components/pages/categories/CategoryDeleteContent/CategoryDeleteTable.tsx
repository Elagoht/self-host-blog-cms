"use client"

import Button from "@/components/formElements/Button"
import Checkbox from "@/components/formElements/Checkbox"
import Select from "@/components/formElements/Select"
import dictionary from "@/i18n"
import Message from "@/utilities/Message"
import { IconTransferVertical, IconTrash } from "@tabler/icons-react"
import classNames from "classnames"
import { FC, useEffect, useMemo, useRef, useState } from "react"
import CategoryDeleteRow from "./CategoryDeleteRow"

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
 * Drag and drop table for transferring blogs
 * between categories. Dragging stores a payload
 * with source and blogs slugs as an array.
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
  const [isDragging, setIsDragging] = useState<boolean>(false)

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

    const handleDragStart = (event: DragEvent) => {
      event.dataTransfer?.setData("text/plain", JSON.stringify({
        source: slug,
        blogs: blogs.filter((blog) =>
          selected[blog.id]
        ).map((blog) => blog.slug)
      }))
    }

    const handleDragOver = (event: DragEvent) => {
      if (!event.dataTransfer) return
      event.preventDefault()
      event.dataTransfer.dropEffect = "move"
    }

    const handleDrop = (event: DragEvent) => {
      if (!event.dataTransfer) return
      event.preventDefault()
      const data = event.dataTransfer.getData("text/plain")
      const { blogs, source } = JSON.parse(data)

      handleTransfer(source, slug, blogs)
      setSelected({})
    }

    self.addEventListener("dragstart", handleDragStart)
    self.addEventListener("dragover", handleDragOver)
    self.addEventListener("drop", handleDrop)

    return () => {
      self.removeEventListener("dragstart", handleDragStart)
      self.removeEventListener("dragover", handleDragOver)
      self.removeEventListener("drop", handleDrop)
    }
  }, [blogs, handleTransfer, selected, slug])

  useEffect(() => {
    const handleDragging = () => selected && setIsDragging(true)
    const handleDragEnd = () => setIsDragging(false)

    window.addEventListener("dragstart", handleDragging)
    window.addEventListener("dragend", handleDragEnd)

    return () => {
      window.removeEventListener("dragstart", handleDragging)
      window.removeEventListener("dragend", handleDragEnd)
    }
  }, [isDragging, selected])

  return <div
    ref={selfRef}
    className={classNames(
      "overflow-x-auto p-1", {
      "animate-drag-container": isDragging
    })}
  >
    <h2 className="text-xl font-semibold px-2">
      {Message.format(dictionary.categories.delete.table[isTrash
        ? "delete"
        : "newCategory"
      ], {
        name
      })}
    </h2>

    <div className={classNames(
      "rounded-2xl overflow-clip shadow dark:shadow-neutral-950", {
      "border-dashed border-2 border-primary-500": isDragging
    })}>
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
            onChange={() => setSelected(blogs.reduce((all, blog) => {
              all[blog.id] = !allSelected
              return all
            }, {} as Selection))}
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

      <ul draggable={Object.values(selected).some((selected) => selected)}>
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