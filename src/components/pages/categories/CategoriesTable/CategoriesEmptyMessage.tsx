import dictionary from "@/i18n"
import { FC } from "react"

const CategoriesEmptyMessage: FC = () =>
  <tr>
    <td
      colSpan={6}
      className="text-center py-4 bg-neutral-200 dark:bg-neutral-800"
    >
      {dictionary.categories.main.empty}
    </td>
  </tr>

export default CategoriesEmptyMessage