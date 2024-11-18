import Button from "@/components/formElements/Button"
import Container from "@/components/layout/Container"
import Content from "@/components/layout/Content"
import dictionary from "@/i18n"
import { getBlogs } from "@/services/blog"
import { FC } from "react"

const BlogsPage: FC<PageComponent> = async () => {
  const blogs = await (await getBlogs()).json()

  return <Content breadcrumbs={[
    { name: "blogs", href: "/blogs" }
  ]}>
    <Container
      title={dictionary.blogs.main.title}
      description={dictionary.blogs.main.description}
    >
      <Button
        href="/blogs/new"
        color="primary"
      >
        {dictionary.blogs.main.new}
      </Button>

      <ul>
        {blogs.map(blog => <li key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
        </li>)}
      </ul>
    </Container>
  </Content>
}

export default BlogsPage