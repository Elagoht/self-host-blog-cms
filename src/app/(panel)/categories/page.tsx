import Content from "@/components/layout/Content"
import { FC } from "react"

const CategoriesPage: FC<PageComponent> = () => {
  return <Content breadcrumbs={[
    { name: "categories", href: "/blogs" }
  ]}>
    <h1>Categories</h1>
  </Content>
}

export default CategoriesPage