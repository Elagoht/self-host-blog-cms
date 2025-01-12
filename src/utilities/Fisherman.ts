import ApiCall from "./ApiCall"

class Fisherman {
  public static async fireWebhook(url: string, data: Record<
    PropertyKey,
    string | number | boolean | null
  >, action: string) {
    await ApiCall.post(url, data, {
      "User-Agent": process.env.WEBHOOK_USER_AGENT!,
      "X-Webhook-Secret": process.env.WEBHOOK_SECRET!,
      "X-Webhook-Action": action
    })
  }
}

export default Fisherman