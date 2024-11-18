import FormBlog from "@/components/forms/FormBlog"
import { FC } from "react"
import "@/design/article.css"
import "@/design/highlight.css"
import Content from "@/components/layout/Content"
import { getCategories } from "@/services/category"

const NewBlogPage: FC<PageComponent> = async () => {
  const categories = await (await getCategories()).json()

  return <Content breadcrumbs={[
    { name: "blogs", href: "/blogs" },
    { name: "new", href: "/blogs/new" }
  ]}>
    <FormBlog
      mode="add"
      categories={categories}
    />
  </Content>
}

export default NewBlogPage