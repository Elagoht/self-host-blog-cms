import dictionary from "@/i18n"
import Message from "@/utilities/Message"
import { object, string } from "yup"

export const categoryAddScheme = object({
  name: string()
    .required(Message.format(
      dictionary.form.error.required, {
      field: dictionary.form.field.name
    })).max(50, Message.format(
      dictionary.form.error.max, {
      field: dictionary.form.field.name,
      length: 50
    })),
  description: string()
    .required(Message.format(
      dictionary.form.error.required, {
      field: dictionary.form.field.description
    })).max(155, Message.format(
      dictionary.form.error.max, {
      field: dictionary.form.field.description,
      length: 155
    })).min(75, Message.format(
      dictionary.form.error.min, {
      field: dictionary.form.field.description,
      length: 75
    })),
  spot: string()
    .required(Message.format(
      dictionary.form.error.required, {
      field: dictionary.form.field.spot
    })).max(75, Message.format(
      dictionary.form.error.max, {
      field: dictionary.form.field.spot,
      length: 75
    })),
  keywords: string()
    .required(Message.format(
      dictionary.form.error.required, {
      field: dictionary.form.field.keywords
    }))
})