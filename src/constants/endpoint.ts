import { PaginationQuery } from '@/interfaces/base'

// This should come from .env in real app
const API_ENDPOINT = 'https://rickandmortyapi.com/api'

const CHARACTER_ENDPOINT = `${API_ENDPOINT}/character`
export const GET_CHARACTER_LIST_ENDPOINT = (query: PaginationQuery) => {
  const page = query?.page || '1'
  return `${CHARACTER_ENDPOINT}/?page=${page}`
}
