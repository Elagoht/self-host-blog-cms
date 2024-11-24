import FormCategoryDelete from "@/components/forms/FormCategoryDelete"
import Container from "@/components/layout/Container"
import Content from "@/components/layout/Content"
import dictionary from "@/i18n"
import { getCategories, getCategory, getCategoryBlogs } from "@/services/category"
import Message from "@/utilities/Message"
import { notFound } from "next/navigation"
import { FC } from "react"

type Context = { slug: string }

const CategoryDeletePage: FC<PageComponent<Context>> = async ({
  params
}) => {
  const { slug } = await params
  const category = await (await getCategory(slug)).json()
  if (!category.id) notFound()

  const { data: blogs } = await (await getCategoryBlogs(slug)).json()
  const categories = await (await getCategories()).json()

  return <Content breadcrumbs={[
    { name: "categories", href: "/categories" },
    { name: "delete", href: "/categories/delete" }
  ]}>
    <Container
      title={Message.format(
        dictionary.categories.delete.title, {
        name: category.name
      })}
      description={Message.format(
        dictionary.categories.delete.description[blogs.length === 0
          ? "hasNoBlogs"
          : blogs.length === 1
            ? "hasOneBlog"
            : "hasManyBlogs"
        ], {
        name: category.name,
        count: blogs.length
      })}
    >
      <FormCategoryDelete
        blogs={blogs}
        category={category}
        categories={categories}
      />
    </Container>
  </Content>
}

export default CategoryDeletePage