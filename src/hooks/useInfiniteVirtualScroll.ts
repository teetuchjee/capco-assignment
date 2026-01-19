// import { useEffect } from 'react'
// import type { VirtualItem } from '@tanstack/react-virtual'
// interface Props {
//   virtualItems: VirtualItem[]
//   itemCount: number
//   hasNextPage?: boolean
//   isFetchingNextPage: boolean
//   fetchNextPage: () => void
// }
// export function useInfiniteVirtualScroll({
//   virtualItems,
//   itemCount,
//   hasNextPage,
//   isFetchingNextPage,
//   fetchNextPage
// }: Props) {
//   useEffect(() => {
//     const lastItem = virtualItems.at(-1)
//     if (!lastItem) return
//     if (lastItem.index >= itemCount - 1 && hasNextPage && !isFetchingNextPage) {
//       fetchNextPage()
//     }
//   }, [virtualItems, itemCount, hasNextPage, isFetchingNextPage, fetchNextPage])
// }
import { useEffect, useRef } from 'react'

import type { VirtualItem } from '@tanstack/react-virtual'

interface Props {
  virtualItems: VirtualItem[]
  itemCount: number
  /**
   * Total number of actual items (for grids where itemCount represents rows).
   * If not provided, falls back to itemCount (for lists).
   */
  totalItemCount?: number
  hasNextPage?: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
}

export function useInfiniteVirtualScroll({
  virtualItems,
  itemCount,
  totalItemCount,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage
}: Props) {
  const lastFetchedCountRef = useRef(0)

  // Use totalItemCount if provided (grid), otherwise use itemCount (list)
  const actualItemCount = totalItemCount ?? itemCount

  useEffect(() => {
    const lastItem = virtualItems.at(-1)
    if (!lastItem) return

    const isNearEnd = lastItem.index >= itemCount - 1

    const shouldFetch =
      isNearEnd &&
      hasNextPage &&
      !isFetchingNextPage &&
      actualItemCount > lastFetchedCountRef.current

    if (shouldFetch) {
      lastFetchedCountRef.current = actualItemCount
      fetchNextPage()
    }
  }, [virtualItems, itemCount, actualItemCount, hasNextPage, isFetchingNextPage, fetchNextPage])
}
