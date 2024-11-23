"use client"

import dictionary from "@/i18n"
import { FC, useState } from "react"
import CategoriesEmptyMessage from "./CategoriesEmptyMessage"
import CategoriesTableRow from "./CategoriesTableRow"
import CategoriesEditModal from "./CategoryEditModal"

type CategoriesTableProps = {
  categories: CategoryResponse[]
}

const CategoriesTable: FC<CategoriesTableProps> = ({
  categories
}) => {
  const [editModal, setEditModal] = useState<{
    isOpen: boolean
    category?: CategoryResponse
  }>({
    isOpen: false,
    category: undefined
  })

  return <div className="overflow-x-auto p-1">
    <table className="w-full overflow-clip rounded-lg
      border-neutral-300 dark:border-neutral-700
      shadow dark:shadow-neutral-950"
    >
      <thead>
        <tr className="bg-neutral-950 text-neutral-100
          divide-x divide-neutral-900"
        >
          {[
            "",
            dictionary.categories.main.table.name,
            dictionary.categories.main.table.blogs,
            dictionary.categories.main.table.spot,
            dictionary.categories.main.table.actions
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
          <CategoriesTableRow
            key={category.id}
            category={category}
            openEditModal={() => setEditModal({
              isOpen: true,
              category
            })}
          />
        )}
      </tbody>
    </table>

    <CategoriesEditModal
      isOpen={editModal.isOpen}
      category={editModal.category}
      close={() => setEditModal({
        isOpen: false,
        category: undefined
      })}
    />
  </div>
}

export default CategoriesTable