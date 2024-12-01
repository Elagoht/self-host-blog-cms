class Pager {
  static convert = <T>(
    data: T[],
    page: number,
    take: number,
    total: number
  ): Paginated<T> => ({
    data,
    page,
    take,
    total
  })
}

export default Pager