import Select from "@/components/formElements/Select"
import dictionary from "@/i18n"
import Message from "@/utilities/Message"
import Image from "next/image"
import { FC } from "react"

type CategoryDeleteRowProps = {
  blog: BlogResponse
  categories: CategoryResponse[]
}

const CategoryDeleteRow: FC<CategoryDeleteRowProps> = ({
  blog, categories
}) =>
  <tr className="divide-x divide-neutral-900 font-medium
    bg-neutral-200 dark:bg-neutral-800 text-center
    even:bg-neutral-100 dark:even:bg-neutral-900"
  >
    {[
      <Image
        key="cover"
        src={blog.cover}
        alt={blog.title}
        width={96}
        height={54}
      />,
      blog.title,
      <Select
        key="newCategory"
        name="category"
      >
        <optgroup label={dictionary.categories.delete.table.delete}>
          <option value="delete">
            {dictionary.categories.delete.table.delete}
          </option>
        </optgroup>

        <optgroup label={dictionary.categories.delete.table.move}>
          {categories.length > 0
            ? categories.map(category =>
              <option
                key={category.id}
                value={category.id}
              >
                {Message.format(
                  dictionary.categories.delete.table.newCategory, {
                  name: category.name
                })}
              </option>
            ) : <option disabled>
              {dictionary.categories.delete.table.noOtherCategory}
            </option>
          }
        </optgroup>
      </Select>
    ].map((element, index) =>
      <td
        key={index}
        className="px-2 first-of-type:px-0"
      >
        {element}
      </td>
    )}
  </tr>

export default CategoryDeleteRow