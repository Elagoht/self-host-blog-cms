import FormBlogAdd from "@/components/forms/FormBlogAdd"
import { FC } from "react"
import "@/design/article.css"
import "@/design/highlight.css"

const NewBlogPage: FC = () => {
  return <FormBlogAdd
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
}

export default NewBlogPage