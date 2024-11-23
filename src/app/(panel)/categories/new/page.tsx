import FormCategory from "@/components/forms/FormCategory"
import Container from "@/components/layout/Container"
import Content from "@/components/layout/Content"
import dictionary from "@/i18n"
import { FC } from "react"

const NewCategoryPage: FC<PageComponent> = async ({
  searchParams
}) => {
  const { deleting } = await searchParams

  return <Content breadcrumbs={[
    { name: "categories", href: "/categories" },
    { name: "new", href: "/categories/new" }
  ]}>
    <Container
      title={dictionary.categories.new.title}
      description={dictionary.categories.new.description}
    >
      <FormCategory
        mode="add"
        deleting={deleting}
      />
    </Container>
  </Content>
}

export default NewCategoryPage