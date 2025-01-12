"use client"

import Button from "@/components/formElements/Button"
import dictionary from "@/i18n"
import { FC } from "react"
import toast from "react-hot-toast"

type WebhookFireButtonProps = {
  url: string
  method: string
  headers?: Record<string, string>
  body?: Record<string, string> | string
}

const WebhookFireButton: FC<WebhookFireButtonProps> = ({
  url, method, headers, body
}) => {
  return <Button
    color="secondary"
    onClick={() => {
      fetch(url, {
        method,
        headers,
        body: JSON.stringify(body)
      }).then(response =>
        response.json()
      ).then(() => {
        toast.success(dictionary.webhooks.main.success)
      }).catch(() => {
        toast.error(dictionary.webhooks.main.failure)
      })
    }}
  >
    {dictionary.webhooks.main.fire}
  </Button>
}

export default WebhookFireButton