"use client"

import Checkbox from "@/components/formElements/Checkbox"
import classNames from "classnames"
import Image from "next/image"
import { FC } from "react"

type CategoryDeleteRowProps = {
  blog: BlogListResponse
  selected: boolean
  setSelected: () => void
  slug: CategoryResponse["slug"]
  isTrash?: boolean
}

/**
 * This is a draggable element which holds a payload
 * of the blog data
 */
const CategoryDeleteRow: FC<CategoryDeleteRowProps> = ({
  blog, selected = false, setSelected, isTrash
}) =>
  <li
    className={classNames(
      "font-medium select-none text-center px-4 items-center",
      "cursor-pointer transition-all flex gap-4", {
      "hover:bg-neutral-100 dark:hover:bg-neutral-900": !isTrash && !selected,
      "bg-red-500 dark:bg-red-900 text-white": isTrash && !selected,
      "bg-neutral-200 dark:bg-neutral-800": !selected,
      "bg-blue-600 dark:bg-blue-900 text-white": selected,
      "hover:bg-blue-500 dark:hover:bg-blue-800": selected
    })}
    onClick={setSelected}
  >
    <Checkbox
      key="checkbox"
      name="blogs"
      checked={selected}
      onChange={setSelected}
    />

    <Image
      key="cover"
      src={blog.cover}
      alt={blog.title}
      width={96}
      height={54}
      className="!rounded-none"
    />

    <span>
      {blog.title}
    </span>
  </li>

export default CategoryDeleteRow