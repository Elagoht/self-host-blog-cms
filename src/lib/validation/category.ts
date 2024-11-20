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
