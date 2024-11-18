import dictionary from "@/i18n"
import Message from "@/utilities/Message"
import { object, string } from "yup"

const formatMessage = (
  type: keyof typeof dictionary.form.error,
  fieldKey: keyof typeof dictionary.form.field,
  extra = {}
) => Message.format(dictionary.form.error[type], {
  field: dictionary.form.field[fieldKey],
  ...extra
})

const rules = {
  name: string()

    .max(50, formatMessage("max", "name", { length: 50 })),
  description: string()
    .max(155, formatMessage("max", "description", { length: 155 }))
    .min(75, formatMessage("min", "description", { length: 75 })),
  spot: string()
    .max(75, formatMessage("max", "spot", { length: 75 })),
  keywords: string(),
}

export const categoryAddScheme = object({
  name: rules.name
    .required(formatMessage("required", "name")),
  description: rules.description
    .required(formatMessage("required", "description")),
  spot: rules.spot
    .required(formatMessage("required", "spot")),
  keywords: rules.keywords
    .required(formatMessage("required", "keywords"))
})

export const categoryEditScheme = object({
  name: rules.name.optional(),
  description: rules.description.optional(),
  spot: rules.spot.optional(),
  keywords: rules.keywords.optional()
})
