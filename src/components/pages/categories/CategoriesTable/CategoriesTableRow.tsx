import Button from "@/components/formElements/Button"
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react"
import classNames from "classnames"
import { FC } from "react"

type CategoriesTableRowProps = {
  category: CategoryResponse
  openEditModal: () => void
}

const CategoriesTableRow: FC<CategoriesTableRowProps> = ({
  category, openEditModal
}) =>
  <tr className="odd:bg-neutral-200 dark:odd:bg-neutral-800
    divide-x divide-neutral-300 dark:divide-neutral-950"
  >
    {[
      <div
        key="actions"
        className="flex justify-center gap-2"
      >
        <Button
          key={category.id}
          href={`/blogs?category=${category.slug}`}
        >
          <IconEye />
        </Button>

        <Button
          color="secondary"
          onClick={openEditModal}
        >
          <IconEdit />
        </Button>

        <Button
          href={`/categories/delete/${category.slug}`}
          color="danger"
        >
          <IconTrash />
        </Button>
      </div>,
      category.name,
      category.blogCount,
      category.spot
    ].map((cell, index) =>
      <td
        key={index}
        className={classNames(
          "p-2", {
          "text-right": index === 1,
          "w-full min-w-96": index === 3,
        })}
      >
        {cell}
      </td>
    )}
  </tr>

export default CategoriesTableRow