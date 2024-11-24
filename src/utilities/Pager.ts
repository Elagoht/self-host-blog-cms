class Pager {
  static convert = <T>(
    data: T[],
    page: number,
    take: number | undefined
  ): Paginated<T> => ({
    data,
    page,
    take,
    took: data.length
  })
}

export default Pager