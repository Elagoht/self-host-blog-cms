import Container from "@/components/layout/Container"
import Content from "@/components/layout/Content"
import BlogShowcase from "@/components/pages/blogs/BlogShowcase"
import Pagination from "@/components/ui/Pagination"
import dictionary from "@/i18n"
import { getBlogs } from "@/services/blog"
import { getCategories } from "@/services/category"
import { FC } from "react"

const BlogsPage: FC<PageComponent> = async ({
  searchParams
}) => {
  const query = await searchParams

  const blogs = await (await getBlogs(query)).json()
  const categories = await (await getCategories()).json()

  return <Content breadcrumbs={[
    { name: "blogs", href: "/blogs" }
  ]}>
    <Container
      title={dictionary.blogs.main.title}
      description={dictionary.blogs.main.description}
    >
      <BlogShowcase
        blogs={blogs.data}
        categories={categories}
        searchParams={query}
      />

      <Pagination
        totalPages={Math.ceil(blogs.total / blogs.take)}
        pageParam="page"
        pathname="/blogs"
        searchParams={query}
      />
    </Container>
  </Content>
}

export default BlogsPage