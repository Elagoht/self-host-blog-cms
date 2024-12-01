import Button from "@/components/formElements/Button"
import dictionary from "@/i18n"
import { FC } from "react"
import DashboardContent from "./DashboardContent"

type DashboardCategoriesProps = {
  categories: CategoryResponse[]
}

const DashboardCategories: FC<DashboardCategoriesProps> = ({
  categories
}) =>
  <DashboardContent
    title={dictionary.dashboard.categories.title}
    description={dictionary.dashboard.categories.description}
    className="flex flex-wrap gap-2"
  >
    {categories.map((category, index) =>
      <Button
        key={index}
        href={`/blogs?category=${category.slug}`}
      >
        {category.name}
      </Button>
    )}
  </DashboardContent>

export default DashboardCategories