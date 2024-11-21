import dictionary from "@/i18n"
import { FC } from "react"
import CategoryDeleteRow from "./CategoryDeleteRow"
import Button from "@/components/formElements/Button"

type CategoryDeleteTableProps = {
  blogs: BlogResponse[]
  categories: CategoryResponse[]
}

const CategoryDeleteTable: FC<CategoryDeleteTableProps> = ({
  categories, blogs
}) =>
  <div className="overflow-x-auto p-1">
    {blogs.length > 0 &&
      <table className="w-full overflow-clip rounded-lg
        border-neutral-300 dark:border-neutral-700
        shadow dark:shadow-neutral-950"
      >
        <thead>
          <tr className="bg-neutral-950 text-neutral-100
            divide-x divide-neutral-900"
          >
            {Object.entries({
              cover: dictionary.categories.delete.table.cover,
              title: dictionary.categories.delete.table.title,
              action: dictionary.categories.delete.table.action
            }).map(([key, value]) =>
              <th
                key={key}
                className="py-2 px-4
                first-of-type:w-24 first-of-type:min-w-24"
              >
                {value}
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {blogs.map((blog) =>
            <CategoryDeleteRow
              key={blog.id}
              blog={blog}
              categories={categories}
            />
          )}
        </tbody>
      </table>
    }

    <Button
      type="submit"
      color="danger"
      className="mt-4 ml-auto"
    >
      {dictionary.categories.delete.submit}
    </Button>
  </div>

export default CategoryDeleteTable