import FormBlog from "@/components/forms/FormBlog"
import Content from "@/components/layout/Content"
import "@/design/article.css"
import "@/design/highlight.css"
import { getBlog } from "@/services/blog"
import { getCategories } from "@/services/category"
import { redirect } from "next/navigation"
import { FC } from "react"

type Context = { slug: string }

const BlogEditPage: FC<PageComponent<Context>> = async ({
  params
}) => {
  const { slug } = await params

  const blog = await (await getBlog(slug)).json()
  const categories = await (await getCategories()).json()

  if (!blog.id) redirect("/blogs")

  return <Content breadcrumbs={[
    { name: "blogs", href: "/blogs" },
    { name: "edit", href: "/blogs/edit" }
  ]}>
    <FormBlog
      categories={categories}
      mode="edit"
      initialValues={blog}
      slug={slug}
    />
  </Content>
}

export default BlogEditPage