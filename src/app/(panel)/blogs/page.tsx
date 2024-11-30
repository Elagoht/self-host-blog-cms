import Container from "@/components/layout/Container"
import Content from "@/components/layout/Content"
import BlogShowcase from "@/components/pages/blogs/BlogShowcase"
import dictionary from "@/i18n"
import { getBlogs } from "@/services/blog"
import { FC } from "react"

const BlogsPage: FC<PageComponent> = async ({
  searchParams
}) => {
  const { data: blogs } = await (await getBlogs(
    await searchParams
  )).json()

  return <Content breadcrumbs={[
    { name: "blogs", href: "/blogs" }
  ]}>
    <Container
      title={dictionary.blogs.main.title}
      description={dictionary.blogs.main.description}
    >
      <BlogShowcase blogs={blogs} />
    </Container>
  </Content>
}

export default BlogsPage