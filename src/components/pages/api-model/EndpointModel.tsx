import dictionary from "@/i18n"
import TypeWriter from "@/utilities/TypeWriter"
import classNames from "classnames"
import { FC } from "react"

type EndpointModelProps = {
  title: string
  method: string
  endpoint: string
  description: string
  query?: Array<{
    parameter: string
    description: string
    available: string
    default?: string
  }>
  extra?: string
}

const EndpointModel: FC<EndpointModelProps> = ({
  title, description, endpoint, method, query, extra
}) => {
  return <section className="p-4 rounded-lg border
    border-neutral-300 dark:border-neutral-700"
  >
    <h2 className="mt-0">{title}</h2>

    <h3 className="font-mono flex items-center">
      <span className={classNames(
        "px-2 py-1 leading-none rounded-md", {
        "bg-green-600 text-green-200": method === "GET",
        "bg-violet-600 text-violet-200": method === "PATCH"
      })}>
        {method}
      </span>

      <span
        className="ml-2 *:text-rose-600 *:dark:text-rose-400"
        dangerouslySetInnerHTML={{
          __html: TypeWriter.markdownToHtml(endpoint)
            .replace(/<\/?p>/g, "").trim()
        }} />
    </h3>

    <p className="my-0">{description}</p>


    {query && <>
      <h4 className="m-0">Query</h4>

      <div className="overflow-x-auto">
        <table className="table-auto">
          <thead>
            <tr className="bg-primary-500">
              <th className="text-primary-100 p-2 whitespace-nowrap">
                {dictionary.apiModel.queryTable.parameter}
              </th>

              <th className="text-primary-100 p-2 whitespace-nowrap">
                {dictionary.apiModel.queryTable.description}
              </th>

              <th className="text-primary-100 p-2 whitespace-nowrap">
                {dictionary.apiModel.queryTable.available}
              </th>

              <th className="text-primary-100 p-2 whitespace-nowrap">
                {dictionary.apiModel.queryTable.default}
              </th>
            </tr>
          </thead>

          <tbody>
            {query?.map((parameter, index) =>
              <tr
                key={index}
                className="border-b border-neutral-500
                even:bg-neutral-200 dark:even:bg-neutral-800"
              >
                <td
                  className="*:m-0 p-2 font-mono font-bold"
                  dangerouslySetInnerHTML={{
                    __html: TypeWriter.markdownToHtml(parameter.parameter)
                  }} />

                <td
                  className="*:m-0 p-2"
                  dangerouslySetInnerHTML={{
                    __html: TypeWriter.markdownToHtml(parameter.description)
                      .replace(/<\/?p>/g, "")
                  }}
                />

                <td
                  className="*:m-0 p-2 *:text-blue-600 *:dark:text-blue-400"
                  dangerouslySetInnerHTML={{
                    __html: TypeWriter.markdownToHtml(parameter.available)
                      .replace(/<\/?p>/g, "")
                  }}
                />

                <td
                  className="*:m-0 p-2 font-mono text-teal-600
                  dark:text-teal-400"
                  dangerouslySetInnerHTML={{
                    __html: TypeWriter.markdownToHtml(
                      parameter.default
                      || "N/A"
                    )
                  }} />
              </tr>)}
          </tbody>
        </table>
      </div>
    </>}

    {extra &&
      <article className="mt-4" dangerouslySetInnerHTML={{
        __html: TypeWriter.markdownToHtml(extra)
      }} />
    }
  </section>
}

export default EndpointModel