import Button from "@/components/formElements/Button"
import Container from "@/components/layout/Container"
import Content from "@/components/layout/Content"
import dictionary from "@/i18n"
import { getCategories } from "@/services/category"
import { FC } from "react"

const CategoriesPage: FC<PageComponent> = async () => {
  const categories = await (await getCategories()).json()

  return <Content breadcrumbs={[
    { name: "categories", href: "/blogs" }
  ]}>
    <Container
      title={dictionary.categories.main.title}
      description="List of categories"
    >
      <Button href={"/categories/new"}>
        {dictionary.categories.main.new}
      </Button>

      <pre>
        {JSON.stringify(categories, null, 2)}
      </pre>
    </Container>
  </Content>
}

export default CategoriesPage