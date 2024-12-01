type Paginated<T> = {
  data: T[]
  page: number
  take?: number
  total: number
}