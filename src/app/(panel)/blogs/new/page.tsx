import FormBlogAdd from "@/components/forms/FormBlogAdd"
import { FC } from "react"
import "@/design/article.css"
import "@/design/highlight.css"
import Content from "@/components/layout/Content"

const NewBlogPage: FC = () => {
  return <Content breadcrumbs={[
    { name: "blogs", href: "/blogs" },
    { name: "new", href: "/blogs/new" }
  ]}>
    <FormBlogAdd
      categories={[{
        id: "1",
        name: "TypeScript",
        slug: "typescript"
      }, {
        id: "2",
        name: "Bicycle",
        slug: "bicycle"
      }]}
    />
  </Content>
}

export default NewBlogPage