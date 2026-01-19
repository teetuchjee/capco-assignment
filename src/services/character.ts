import { GET_CHARACTER_LIST_ENDPOINT } from '@/constants/endpoint'
import { PaginationQuery, StdServiceResponse } from '@/interfaces/base'
import { Character } from '@/interfaces/character'

export async function getCharacterList(
  query: PaginationQuery
): Promise<StdServiceResponse<Character[]>> {
  const res = await fetch(GET_CHARACTER_LIST_ENDPOINT(query), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })

  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch character data')
  }

  return data
}
