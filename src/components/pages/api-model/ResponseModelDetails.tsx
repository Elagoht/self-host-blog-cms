import responseModels from "@/data/responseModels.json"
import classNames from "classnames"
import { FC } from "react"

type ResponseModelDetailsProps = {
  model:
  | typeof responseModels.blog[number]
  | typeof responseModels.category[number]
}

const ResponseModelDetails: FC<ResponseModelDetailsProps> = ({
  model
}) =>
  <div
    role="tab"
    className="border-neutral-400 dark:border-neutral-700 border p-4 rounded-lg"
  >
    <h2 className="my-0">{model.title}</h2>

    <p>{model.description}</p>

    <pre className="flex flex-col leading-none my-0">
      {Object.entries(model.values).map(([key, value]) => (
        <li key={key} className="flex gap-4">
          <span className="font-bold text-green-500">{key}</span>
          &rarr;
          <span
            className={classNames({
              "text-yellow-500": value === "string",
              "text-teal-500": value === "number",
              "text-pink-500": value === "boolean",
              "text-cyan-500": /[A-Z].*/.test(value),
            })}
          >
            {value}
          </span>
        </li>
      ))}
    </pre>
  </div>

export default ResponseModelDetails