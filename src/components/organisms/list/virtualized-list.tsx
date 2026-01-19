'use client'
'use no memo'

import { useRef } from 'react'

import { useVirtualizer } from '@tanstack/react-virtual'

import AnimatePortalSpinner from '@/components/molecules/animates/portal-spinner'
import ScrollToTopButton from '@/components/molecules/buttons/scroll-top-button'
import { useInfiniteVirtualScroll } from '@/hooks/useInfiniteVirtualScroll'

interface VirtualizedListProps<T> {
  items: T[]
  estimateSize: () => number
  overscan?: number
  gap?: number
  hasNextPage?: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
  renderItem: (item: T, index: number) => React.ReactNode
}

export default function VirtualizedList<T>({
  items,
  estimateSize,
  overscan = 2,
  gap = 0,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  renderItem
}: VirtualizedListProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize,
    overscan,
    gap
  })

  const virtualItems = virtualizer.getVirtualItems()

  useInfiniteVirtualScroll({
    virtualItems,
    itemCount: items.length,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  })

  return (
    // Wrapper div for relative positioning context
    <div className="relative mx-auto h-screen max-h-[600px] w-full">
      <div
        ref={parentRef}
        className="h-full w-full overflow-auto"
        style={{ contain: 'strict' }}
        data-testid="virtualized-list-container"
      >
        <div
          style={{
            height: virtualizer.getTotalSize(),
            width: '100%',
            position: 'relative'
          }}
        >
          {virtualItems.map((virtualItem) => {
            const item = items[virtualItem.index]

            return (
              <div
                key={virtualItem.key}
                data-index={virtualItem.index}
                ref={virtualizer.measureElement}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualItem.start}px)`
                }}
              >
                {renderItem(item, virtualItem.index)}
              </div>
            )
          })}
        </div>

        {isFetchingNextPage && (
          <div className="flex w-full justify-center py-8">
            <AnimatePortalSpinner width={100} height={100} />
          </div>
        )}

        {!hasNextPage && items.length > 0 && (
          <div className="flex w-full justify-center py-8">
            <p className="text-sm text-gray-500">You've reached the end</p>
          </div>
        )}
      </div>

      <ScrollToTopButton containerRef={parentRef} virtualizer={virtualizer} />
    </div>
  )
}
