import { useInfiniteQuery } from '@tanstack/react-query'

import { StdServiceResponse } from '@/interfaces/base'
import { Character } from '@/interfaces/character'
import { getCharacterList } from '@/services/character'

export function useCharacters() {
  return useInfiniteQuery<StdServiceResponse<Character[]>>({
    queryKey: ['characters'],
    queryFn: async ({ pageParam = 1 }) => {
      // await new Promise((resolve) => setTimeout(resolve, 1500))
      return getCharacterList({ page: pageParam as number })
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.info.next) return undefined
      const url = new URL(lastPage.info.next)
      const nextPage = url.searchParams.get('page')
      return nextPage ? Number(nextPage) : undefined
    },
    initialPageParam: 1
  })
}
