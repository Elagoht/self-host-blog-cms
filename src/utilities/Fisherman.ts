import ApiCall from "./ApiCall"

class Fisherman {
  public static async fireWebhook(url: string, data: Record<
    PropertyKey,
    string | number | boolean | null
  > | undefined, action: string) {
    const response = await ApiCall.patch(url, data, {
      "User-Agent": process.env.WEBHOOK_USER_AGENT!,
      "X-Webhook-Secret": process.env.WEBHOOK_SECRET!,
      "X-Webhook-Action": action
    })

    // eslint-disable-next-line no-console
    console.log(`Fired webhook for ${action}:`, response)
  }
}

export default Fisherman