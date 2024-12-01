"use client"

import responseModels from "@/data/responseModels.json"
import { FC } from "react"
import ResponseModelTabs from "./ResponseModelTabs"
import dictionary from "@/i18n"

const ResponseModels: FC = () => {

  return <article>
    <h2>{dictionary.apiModel.subtitles.responseModels}</h2>

    <ResponseModelTabs
      models={responseModels.blog}
      title={responseModels.types.blog.title}
      description={responseModels.types.blog.description}
    />

    <ResponseModelTabs
      models={responseModels.category}
      title={responseModels.types.category.title}
      description={responseModels.types.category.description}
    />
  </article>
}

export default ResponseModels