class Pager {
  static convert<T>(data: T[], page: number, take: number): Paginated<T> {
    return {
      data,
      page,
      take,
      took: data.length
    }
  }
}

export default Pager