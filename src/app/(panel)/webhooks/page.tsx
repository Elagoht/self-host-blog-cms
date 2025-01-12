import Container from "@/components/layout/Container"
import Webhook from "@/components/pages/webhooks/Webhook"
import dictionary from "@/i18n"
import { FC } from "react"

const WebhooksPage: FC = () => {
  return <Container
    title={dictionary.webhooks.main.title}
    description={dictionary.webhooks.main.description}
  >
    {webhooks.map((webhook) =>
      <Webhook
        key={webhook.title}
        title={webhook.title}
        description={webhook.description}
        url={webhook.url}
        method={webhook.method}
        headers={webhook.headers}
        body={webhook.body}
      />
    )}
  </Container>
}

export default WebhooksPage

const webhooks = [
  {
    title: "Update Blogs",
    description: "Update blogs when they are created, updated or deleted",
    url: process.env.WEBHOOK_URL!,
    method: "PATCH",
    headers: {
      "User-Agent": process.env.WEBHOOK_USER_AGENT!,
      "X-Webhook-Secret": process.env.WEBHOOK_SECRET!,
      "X-Webhook-Action": "blogs"
    },
    body: undefined
  }
]
