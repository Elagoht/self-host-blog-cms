import Checkbox from "@/components/formElements/Checkbox"
import classNames from "classnames"
import Image from "next/image"
import { FC } from "react"

type CategoryDeleteRowProps = {
  blog: BlogResponse
  selected: boolean
  setSelected: () => void
}

const CategoryDeleteRow: FC<CategoryDeleteRowProps> = ({
  blog, selected = false, setSelected
}) =>
  <li
    className={classNames(
      "font-medium select-none text-center px-4 items-center",
      "hover:bg-neutral-100 dark:hover:bg-neutral-900",
      "cursor-pointer transition-all flex gap-4", {
      "bg-neutral-200 dark:bg-neutral-800": !selected,
      "bg-primary-400 dark:bg-primary-900": selected,
      "hover:bg-primary-300 dark:hover:bg-primary-800": selected
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