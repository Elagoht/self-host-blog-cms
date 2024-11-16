import dictionary from "@/i18n"
import Message from "@/utilities/Message"
import { object, string } from "yup"

export const loginSchema = object({
  username: string().required(
    Message.format(dictionary.form.error.required, {
      field: dictionary.form.field.username
    })
  ),
  passphrase: string().required(
    Message.format(dictionary.form.error.required, {
      field: dictionary.form.field.passphrase
    })
  ).min(8, Message.format(dictionary.form.error.min, {
    field: dictionary.form.field.passphrase,
    min: "8"
  }))
})
