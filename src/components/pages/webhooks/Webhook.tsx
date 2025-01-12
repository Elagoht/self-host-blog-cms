import classNames from "classnames"
import { FC } from "react"
import WebhookFireButton from "./WebhookFireButton"

type WebhookProps = {
  title: string
  description: string
  url: string
  method?: string
  headers?: Record<string, string>
  body?: string | Record<string, string>
}

const Webhook: FC<WebhookProps> = ({
  title, description, url, method = "PATCH", headers, body
}) => {
  return <div className="flex flex-col gap-2 bg-neutral-200 dark:bg-neutral-950 p-2 rounded-md">
    <div className="flex flex-wrap p-2 bg-primary-500 rounded-md text-primary-50 gap-2 items-end">
      <div className="flex flex-col gap-2 grow">
        <h1 className="text-lg font-semibold">{title}</h1>

        <p className="text-sm text-primary-200">{description}</p>
      </div>

      <WebhookFireButton
        url={url}
        method={method}
        headers={headers}
        body={body}
      />
    </div>

    <div className="font-mono flex items-center gap-2 overflow-x-auto">
      <span className={classNames(
        "p-2 rounded-md", {
        "bg-green-600 text-green-200": method === "GET",
        "bg-violet-600 text-violet-200": method === "PATCH"
      })}>
        {method}
      </span>

      <span className="grow whitespace-nowrap bg-stone-300 dark:bg-stone-800 p-2 rounded-md">{url}</span>
    </div>

    {headers &&
      <code className="bg-stone-900 text-stone-50 p-2 rounded-md">
        <pre className="overflow-x-auto">
          HEADERS: {JSON.stringify(headers, null, 2)}
        </pre>
      </code>
    }

    {body &&
      <pre className="bg-stone-900 text-stone-50 p-2 rounded-md">
        BODY: {typeof body === "string" ? body : JSON.stringify(body, null, 2)}
      </pre>
    }
  </div>
}

export default Webhook
