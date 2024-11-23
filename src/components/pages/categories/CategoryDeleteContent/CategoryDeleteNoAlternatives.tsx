import Button from "@/components/formElements/Button"
import dictionary from "@/i18n"
import { FC } from "react"

type CategoryDeleteNoAlternativesProps = {
  slug: CategoryResponse["slug"]
}

const CategoryDeleteNoAlternatives: FC<CategoryDeleteNoAlternativesProps> = ({
      slug
    }) =>
  <div className="overflow-x-auto p-1">
    <h3 className="text-xl font-semibold text-red-700 px-2">
      {dictionary.categories.delete.table.noOtherCategory.title}
    </h3>

    <div className="rounded-2xl flex flex-col p-4 gap-4
      border-2 border-dashed border-neutral-100 text-center
      dark:border-neutral-900 bg-red-500 dark:bg-red-900"
    >
      <p className="text-red-200">
        {dictionary.categories.delete.table.noOtherCategory.description}
      </p>

      <Button
        type="button"
        color="warning"
        href={`/categories/new?deleting=${slug}`}
      >
        {dictionary.categories.delete.table.noOtherCategory.create}
      </Button>
    </div>
  </div>

export default CategoryDeleteNoAlternatives