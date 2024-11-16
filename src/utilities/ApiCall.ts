class ApiCall {
  private static fetch = <T>(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    headers?: Record<string, string>,
    body?: Record<string, unknown> | FormData,
    cacheTag: string[] = []
  ) => fetch(url.startsWith("http")
    ? url
    : `${process.env.HOST_URL}/${url}`, {
    method,
    headers: {
      ...(body instanceof FormData
        ? {} // Do not prevent boundary from being set
        : { "Content-Type": "application/json" }
      ),
      ...headers
    },
    body: body instanceof FormData
      ? body
      : JSON.stringify(body),
    next: {
      tags: cacheTag
    }
  }) as Promise<{
    json: () => Promise<T>
  } & Response>

  public static get = async <T>(
    url: string,
    headers?: Record<string, string>,
    cacheTag?: string[]
  ) => await ApiCall.fetch<T>(
    url, "GET", headers, undefined, cacheTag
  )

  public static post = async <T>(
    url: string,
    body?: Record<string, unknown> | FormData,
    headers?: Record<string, string>,
    cacheTag?: string[]
  ) => await ApiCall.fetch<T>(
    url, "POST", headers, body, cacheTag
  )

  public static put = async <T>(
    url: string,
    body?: Record<string, unknown> | FormData,
    headers?: Record<string, string>,
    cacheTag?: string[]
  ) => await ApiCall.fetch<T>(
    url, "PUT", headers, body, cacheTag
  )

  public static delete = async <T>(
    url: string,
    headers?: Record<string, string>,
    cacheTag?: string[]
  ) => await ApiCall.fetch<T>(
    url, "DELETE", headers, undefined, cacheTag
  )

  public static patch = async <T>(
    url: string,
    body?: Record<string, unknown> | FormData,
    headers?: Record<string, string>,
    cacheTag?: string[]
  ) => await ApiCall.fetch<T>(
    url, "PATCH", headers, body, cacheTag
  )
}

export class FetchError extends Error {
  constructor() {
    super("Fetch Error")
    this.name = "FetchError"
  }
}

export default ApiCall