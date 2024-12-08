import Button from "@/components/formElements/Button"
import Container from "@/components/layout/Container"
import Content from "@/components/layout/Content"
import CategoriesTable from "@/components/pages/categories/CategoriesTable"
import dictionary from "@/i18n"
import { getCategories } from "@/services/category"
import { IconPlus } from "@tabler/icons-react"
import { FC } from "react"

export const dynamic = "force-dynamic"

const CategoriesPage: FC<PageComponent> = async () => {
  const categories = await (await getCategories()).json()

  return <Content breadcrumbs={[
    { name: "categories", href: "/categories" }
  ]}>
    <Container
      title={dictionary.categories.main.title}
      description="List of categories"
    >
      <CategoriesTable categories={categories} />

      <Button
        href={"/categories/new"}
        className="text-right w-fit ml-auto"
        color="success"
        icon={<IconPlus />}
      >
        {dictionary.categories.main.new}
      </Button>
    </Container>
  </Content>
}

export default CategoriesPage