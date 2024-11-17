import Button from "@/components/formElements/Button"
import Container from "@/components/layout/Container"
import Content from "@/components/layout/Content"
import dictionary from "@/i18n"
import { FC } from "react"

const CategoriesPage: FC<PageComponent> = () => {
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
    </Container>
  </Content>
}

export default CategoriesPage