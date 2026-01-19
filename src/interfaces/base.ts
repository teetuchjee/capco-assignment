type Info = {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export type PaginationQuery = {
  page?: number
}

export type StdServiceResponse<T> = {
  info: Info
  results: T
}
