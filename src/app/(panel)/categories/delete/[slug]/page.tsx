import Container from "@/components/layout/Container"
import Content from "@/components/layout/Content"
import dictionary from "@/i18n"
import { getCategory, getCategoryBlogs } from "@/services/category"
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

  const blogs = await (await getCategoryBlogs(slug)).json()

  return <Content breadcrumbs={[
    { name: "categories", href: "/categories" },
    { name: "delete", href: "/categories/delete" }
  ]}>
    <Container
      title={dictionary.categories.delete.title}
      description=""
    >
      <code className="prose dark:prose-invert">
        <pre>
          {JSON.stringify(category, null, 2)}<br />

          {JSON.stringify(blogs, null, 2)}
        </pre>
      </code>

      {Message.format(
        dictionary.categories.delete.description[blogs.length === 0
          ? "hasNoBlogs"
          : "hasBlogs"
        ], {
        name: category.name,
        count: blogs.length
      })}

    </Container>
  </Content>
}

export default CategoryDeletePage