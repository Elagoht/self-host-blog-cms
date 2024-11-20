import FormCategory from "@/components/forms/FormCategory"
import Container from "@/components/layout/Container"
import Content from "@/components/layout/Content"
import dictionary from "@/i18n"
import { getCategory } from "@/services/category"
import { notFound } from "next/navigation"
import { FC } from "react"

type Context = { slug: string }

const CategoryEditPage: FC<PageComponent<Context>> = async ({
  params
}) => {
  const { slug } = await params
  const category = await (await getCategory(slug)).json()

  if (!category.id) notFound()

  return <Content breadcrumbs={[
    { name: "categories", href: "/categories" },
    { name: "edit", href: "/categories/edit" }
  ]}>
    <Container
      title={dictionary.categories.edit.title}
      description={dictionary.categories.edit.description}
    >
      <FormCategory
        mode="edit"
        slug={category.slug}
        initialValues={{
          name: category.name,
          description: category.description,
          spot: category.spot,
          keywords: category.keywords
        }}
      />
    </Container>
  </Content>
}

export default CategoryEditPage