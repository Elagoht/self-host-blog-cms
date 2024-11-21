import dictionary from "@/i18n"
import Message from "@/utilities/Message"
import { object, string } from "yup"

const rules = {
  name: string()
    .max(50, Message.errorMessage("max", "name", { max: 50 })),
  description: string()
    .min(75, Message.errorMessage("min", "description", { min: 75 }))
    .max(155, Message.errorMessage("max", "description", { max: 155 })),
  spot: string()
    .max(75, Message.errorMessage("max", "spot", { max: 75 })),
  keywords: string()
}

export const categoryAddScheme = object({
  name: rules.name
    .required(Message.errorMessage("required", "name")),
  description: rules.description
    .required(Message.errorMessage("required", "description")),
  spot: rules.spot
    .required(Message.errorMessage("required", "spot")),
  keywords: rules.keywords
    .required(Message.errorMessage("required", "keywords"))
})

export const categoryEditScheme = object({
  name: rules.name
    .optional(),
  description: rules.description
    .optional(),
  spot: rules.spot
    .optional(),
  keywords: rules.keywords
    .optional()
})

export const categoryDeleteScheme = object().test(
  "values-are-string-arrays",
  dictionary.api.error.badRequest,
  function (obj: Record<string, string[]>) {
    if (
      typeof obj !== "object" || obj === null
    ) return this.createError({
      message: dictionary.api.error.badRequest
    })

    const values = Object.values(obj)

    for (let i = 0; i < values.length; i++) {
      const value = values[i]
      if (
        !Array.isArray(value) ||
        !value.every((item) => typeof item === "string")
      ) return this.createError({
        message: dictionary.api.error.badRequest
      })
    }

    return true
  }
)