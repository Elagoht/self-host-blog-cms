import Button from "@/components/formElements/Button"
import Container from "@/components/layout/Container"
import Content from "@/components/layout/Content"
import dictionary from "@/i18n"
import { FC } from "react"

const BlogsPage: FC<PageComponent> = () => {
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
    </Container>
  </Content>
}

export default BlogsPage