import Container from "@/components/layout/Container"
import Content from "@/components/layout/Content"
import BlogShowcase from "@/components/pages/blogs/BlogShowcase"
import dictionary from "@/i18n"
import { getCategory, getCategoryBlogs } from "@/services/category"
import Message from "@/utilities/Message"
import { FC } from "react"

type Context = { slug: string }

const CategoryBlogsPage: FC<PageComponent<Context>> = async ({
  params
}) => {
  const { slug } = await params

  const category = await (await getCategory(slug)).json()
  const relatedBlogs = await (await getCategoryBlogs(slug)).json()

  return <Content breadcrumbs={[
    { name: "categories", href: "/categories" },
    { text: category.name, href: "/categories/blogs" }
  ]}>
    <Container
      title={dictionary.categories.blogs.title}
      description={Message.format(dictionary.categories.blogs.description, {
        category: category.name
      })}
    >
      <BlogShowcase blogs={relatedBlogs} />
    </Container>
  </Content>
}

export default CategoryBlogsPage