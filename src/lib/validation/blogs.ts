import Message from "@/utilities/Message"
import { mixed, object, string } from "yup"

const rules = {
  title: string()
    .max(255, Message.errorMessage("max", "title", 255)),
  content: string()
    .min(100, Message.errorMessage("min", "content", 100)),
  cover: mixed()
    .test(
      "file must be an image",
      Message.errorMessage("image", "cover"),
      (value) =>
        !(value instanceof File) ||
        value.type.startsWith("image/")
    ).test(
      "file must be less than 10 MB",
      Message.errorMessage("large", "cover", "10 MB"),
      (value) =>
        !(value instanceof File) ||
        value.size < 10 * 1024 * 1024
    ).test(
      "string must be a valid URL",
      Message.errorMessage("url", "cover"),
      (value) =>
        !(typeof value === "string") ||
        /^\/uploads\/covers\//.test(value)
    ),
  keywords: string(),
  description: string()
    .min(75, Message.errorMessage("min", "description", 75))
    .max(155, Message.errorMessage("max", "description", 155)),
  spot: string()
    .max(75, Message.errorMessage("max", "spot", 75)),
  category: string()
}

export const blogAddScheme = object({
  title: rules.title
    .required(Message.errorMessage("required", "title")),
  content: rules.content
    .required(Message.errorMessage("required", "content")),
  cover: rules.cover
    .required(Message.errorMessage("required", "cover")),
  keywords: rules.keywords
    .required(Message.errorMessage("required", "keywords")),
  description: rules.description
    .required(Message.errorMessage("required", "description")),
  spot: rules.spot
    .required(Message.errorMessage("required", "spot")),
  category: rules.category
    .required(Message.errorMessage("required", "category"))
})

export const blogEditScheme = object({
  title: rules.title
    .optional(),
  content: rules.content
    .optional(),
  cover: rules.cover
    .optional(),
  keywords: rules.keywords
    .optional(),
  description: rules.description
    .optional(),
  spot: rules.spot
    .optional(),
  category: rules.category
    .optional()
})