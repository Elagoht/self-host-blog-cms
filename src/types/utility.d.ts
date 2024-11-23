type Paginated<T> = {
  data: T[]
  page: number
  take: number
  took: number
}