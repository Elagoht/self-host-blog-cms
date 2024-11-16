export default class Message {
  /**
   * @param message - The message to format.
   * @param args - The arguments to replace in the message.
   * @example Message.format('Hello, {{name}}!', { name: 'John' });
   * @returns 'Hello, John!'
   */
  public static format = (
    message: string,
    args?: Record<string, string>
  ): string => {
    let formattedMessage = message
    for (
      const key in args
    ) formattedMessage = formattedMessage.replace(
      new RegExp(`{{${key}}}`, "g"),
      args[key]
    )
    return formattedMessage
  }
}