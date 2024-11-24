type Paginated<T> = {
  data: T[]
  page: number
  took: number
  take?: number
}