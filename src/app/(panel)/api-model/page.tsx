import Container from "@/components/layout/Container"
import Content from "@/components/layout/Content"
import EndpointModel from "@/components/pages/api-model/EndpointModel"
import ResponseModels from "@/components/pages/api-model/ResponseModels"
import dictionary from "@/i18n"
import { FC } from "react"
import "@/design/article.css"
import "@/design/highlight.css"

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

      {dictionary.apiModel.endpoints.map((endpoint, index) =>
        <EndpointModel
          key={index}
          title={endpoint.title}
          method={endpoint.method}
          endpoint={endpoint.url}
          description={endpoint.description}
          query={endpoint.query}
          extra={endpoint.extra}
        />
      )}
    </Container>
  </Content>
}

export default APIModelPage