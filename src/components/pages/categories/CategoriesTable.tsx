import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react"
import classNames from "classnames"
import Link from "next/link"
import { FC } from "react"
import CategoriesEmptyMessage from "./CategoriesEmptyMessage"
import dictionary from "@/i18n"

type CategoriesTableProps = {
  categories: CategoryResponse[]
}

const CategoriesTable: FC<CategoriesTableProps> = ({
  categories
}) =>
  <div className="overflow-x-auto p-1">
    <table className="w-full overflow-clip rounded-lg
    border-neutral-300 dark:border-neutral-700
    shadow dark:shadow-neutral-950"
    >
      <thead>
        <tr className="bg-neutral-950 text-neutral-100
        divide-x divide-neutral-900"
        >
          {[
            dictionary.categories.main.table.name,
            dictionary.categories.main.table.spot,
            dictionary.categories.main.table.keywords,
            dictionary.categories.main.table.blogs,
            dictionary.categories.main.table.edit,
            dictionary.categories.main.table.delete
          ].map((column) =>
            <th
              key={column}
              className="py-2 px-4"
            >
              {column}
            </th>
          )}
        </tr>
      </thead>

      <tbody>
        {categories.length === 0 &&
          <CategoriesEmptyMessage />
        }

        {categories.map((category: CategoryResponse) =>
          <tr
            key={category.id}
            className="odd:bg-neutral-200 dark:odd:bg-neutral-800
        divide-x divide-neutral-300 dark:divide-neutral-950"
          >
            {[
              category.name,
              category.spot,
              category.keywords,
              ...[{
                icon: <IconEye />,
                specialClassname: "hover:bg-sky-500",
                href: `/categories/blogs/${category.slug}`
              }, {
                icon: <IconEdit />,
                specialClassname: "hover:bg-secondary-500",
                href: `/categories/edit/${category.slug}`
              }, {
                icon: <IconTrash />,
                specialClassname: "hover:bg-red-500",
                href: `/categories/delete/${category.slug}`
              }].map(({ icon, specialClassname, href }, index) =>
                <Link
                  key={index}
                  href={href}
                  className={classNames(
                    "absolute inset-0 grid place-items-center",
                    "transition-all p-2 hover:text-neutral-100",
                    "hover:shadow", specialClassname
                  )}
                >
                  {icon}
                </Link>
              )
            ].map((cell, index) =>
              <td
                key={index}
                className={classNames({
                  "px-4 py-2": typeof cell === "string",
                  "relative": typeof cell !== "string"
                })}
              >
                {cell}
              </td>
            )}
          </tr>
        )}
      </tbody>
    </table>
  </div>

export default CategoriesTable