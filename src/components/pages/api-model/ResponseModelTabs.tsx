import classNames from "classnames"
import { FC, useState } from "react"
import responseModels from "@/data/responseModels.json"
import ResponseModelDetails from "./ResponseModelDetails"

type ResponseModelTabsProps = {
  title: string
  description: string
  models: typeof responseModels.blog | typeof responseModels.category
}

const ResponseModelTabs: FC<ResponseModelTabsProps> = ({
  title, description, models
}) => {
  const [tab, setTab] = useState<number>(0)

  return <>
    <h3>{title}</h3>

    <p>{description}</p>

    <div
      role="tabpanel"
      className="flex flex-col gap-4"
    >
      <nav className="grid grid-cols-3 w-full" role="tablist">
        {models.map((model, index) =>
          <button
            key={index}
            className={classNames(
              "transition-all px-4 py-2 shadow-inner",
              "first-of-type:rounded-l-lg last-of-type:rounded-r-lg", {
              "bg-primary-600 text-primary-200": tab === index,
              "font-bold shadow-primary-700": tab === index,
              "bg-neutral-200 dark:bg-neutral-800": tab !== index,
              "hover:bg-neutral-300": tab !== index,
              "dark:hover:bg-neutral-700": tab !== index,
            })}
            onClick={() => setTab(index)}
            role="tab"
            aria-selected={tab === index}
          >
            {model.title}
          </button>
        )}
      </nav>

      <ResponseModelDetails model={models[tab]} />
    </div>
  </>
}

export default ResponseModelTabs