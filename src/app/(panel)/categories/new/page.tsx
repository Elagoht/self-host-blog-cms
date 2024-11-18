import FormCategory from "@/components/forms/FormCategory"
import Container from "@/components/layout/Container"
import Content from "@/components/layout/Content"
import dictionary from "@/i18n"
import { FC } from "react"

const NewCategoryPage: FC = () => {
  return <Content breadcrumbs={[
    { name: "categories", href: "/categories" },
    { name: "new", href: "/categories/new" }
  ]}>
    <Container
      title={dictionary.categories.new.title}
      description={dictionary.categories.new.description}
    >
      <FormCategory mode="add" />
    </Container>
  </Content>
}

export default NewCategoryPage