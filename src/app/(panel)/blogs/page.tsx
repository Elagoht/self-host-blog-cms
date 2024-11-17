import Content from "@/components/layout/Content"
import { FC } from "react"

const BlogsPage: FC<PageComponent> = () => {
  return <Content breadcrumbs={[
    { name: "blogs", href: "/blogs" }
  ]}>
    <h1>Blogs</h1>
  </Content>
}

export default BlogsPage