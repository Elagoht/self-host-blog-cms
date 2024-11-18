import dictionary from "@/i18n"

export default class Message {
  /**
   * @param message - Insert the arguments into the message template.
   * @param args - The arguments to replace in the message.
   * @example Message.format('Hello, {{name}}!', { name: 'John' });
   * @returns 'Hello, John!'
   */
  public static format = (
    message: string,
    args?: Record<string, string | number>
  ): string => {
    let formattedMessage = message
    for (
      const key in args
    ) formattedMessage = formattedMessage.replace(
      new RegExp(`{{${key}}}`, "g"),
      String(args[key])
    )
    return formattedMessage
  }

  public static errorMessage = (
    type: keyof typeof dictionary.form.error,
    fieldKey: keyof typeof dictionary.form.field,
    extra = {}
  ) => Message.format(dictionary.form.error[type], {
    field: dictionary.form.field[fieldKey],
    ...extra
  })
}