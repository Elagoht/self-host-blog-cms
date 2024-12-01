import Container from "@/components/layout/Container"
import Content from "@/components/layout/Content"
import ResponseModels from "@/components/pages/api-model/ResponseModels"
import dictionary from "@/i18n"
import { FC } from "react"

const APIModelPage: FC = () => {
  return <Content breadcrumbs={[
    { name: "apiModel", href: "/api-model" }
  ]}>
    <Container
      className="prose dark:prose-invert"
    >
      <h1>{dictionary.apiModel.title}</h1>

      <p>{dictionary.apiModel.description}</p>

      <ResponseModels />
    </Container>
  </Content>
}

export default APIModelPage