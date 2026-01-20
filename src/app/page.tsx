import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

import Container from '@/components/organisms/layouts/container'
import HomeTemplate from '@/components/templates/home'
import { getCharacterList } from '@/services/character'

export default async function HomePage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['characters'],
    queryFn: ({ pageParam = 1 }) => getCharacterList({ page: pageParam }),
    initialPageParam: 1
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container className="flex flex-col items-center">
        <HomeTemplate />
      </Container>
    </HydrationBoundary>
  )
}
