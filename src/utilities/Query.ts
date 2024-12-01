class Query {
  private readonly searchParams: URLSearchParams

  private get = <T = string>(key: string): T => this.searchParams.get(key) as T

  public constructor(searchParams: URLSearchParams) {
    this.searchParams = searchParams
  }

  public truthy = (
    key: string
  ): boolean => ![
    "false", "0"
  ].includes(this.get(key))

  public falsy = (
    key: string
  ): boolean => [
    "true", "1"
  ].includes(this.get(key))

  public boolean = (
    key: string
  ): boolean | undefined => {
    const value = this.get(key)
    if (!value) return undefined
    if (["true", "1"].includes(value)) return true
    if (["false", "0"].includes(value)) return false
    return undefined
  }

  public array = (
    key: string
  ): string[] | undefined => {
    const value = this.get(key)
    if (!value) return undefined
    return value.split(",")
  }

  public number = (
    key: string
  ): number | undefined => Number(
    this.get(key)
  ) || undefined

  public string = (
    key: string
  ): string => this.get(key)

  public oneOf = <T>(
    key: string,
    options: T[]
  ): T | undefined => options.includes(
    this.get<T>(key)
  ) ? this.get<T>(key) : undefined

  public oneOfOrDefault = <T>(
    key: string,
    options: T[],
    defaultValue: T
  ): T => this.oneOf<T>(
    key, options
  ) || defaultValue
}

export default Query