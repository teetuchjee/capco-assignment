'use client'
'use no memo'

import { useRef } from 'react'

import { useVirtualizer } from '@tanstack/react-virtual'

import AnimatePortalSpinner from '@/components/molecules/animates/portal-spinner'
import ScrollToTopButton from '@/components/molecules/buttons/scroll-top-button'
import { useInfiniteVirtualScroll } from '@/hooks/useInfiniteVirtualScroll'
import { useResponsiveColumns } from '@/hooks/useResponsiveColumns'

interface VirtualizedGridProps<T> {
  items: T[]
  estimateSize: () => number
  columns?: {
    sm?: number
    md?: number
    lg?: number
    xl?: number
    '2xl'?: number
  }
  overscan?: number
  gap?: number
  hasNextPage?: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
  renderItem: (item: T, index: number) => React.ReactNode
}

export default function VirtualizedGrid<T>({
  items,
  estimateSize,
  columns = { sm: 1, md: 2, lg: 3, xl: 4 },
  overscan = 2,
  gap = 16,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  renderItem
}: VirtualizedGridProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null)

  const currentColumns = useResponsiveColumns(columns)
  const rowCount = Math.ceil(items.length / currentColumns)

  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize,
    overscan,
    gap
  })

  const virtualRows = virtualizer.getVirtualItems()

  useInfiniteVirtualScroll({
    virtualItems: virtualRows,
    itemCount: rowCount,
    totalItemCount: items.length,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  })

  return (
    <div className="relative mx-auto h-screen max-h-[600px] w-full">
      <div
        ref={parentRef}
        className="h-full w-full overflow-auto"
        style={{ contain: 'strict' }}
        data-testid="virtualized-grid-container"
      >
        <div
          suppressHydrationWarning
          style={{
            height: virtualizer.getTotalSize(),
            width: '100%',
            position: 'relative'
          }}
        >
          {virtualRows.map((virtualRow) => {
            const fromIndex = virtualRow.index * currentColumns
            const toIndex = Math.min(fromIndex + currentColumns, items.length)
            const itemsInRow = items.slice(fromIndex, toIndex)

            return (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={virtualizer.measureElement}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualRow.start}px)`,
                  display: 'grid',
                  gridTemplateColumns: `repeat(${currentColumns}, minmax(0, 1fr))`,
                  gap: `${gap}px`
                }}
              >
                {itemsInRow.map((item, colIndex) => {
                  const realIndex = fromIndex + colIndex
                  return (
                    <div key={realIndex} className="h-full w-full">
                      {renderItem(item, realIndex)}
                    </div>
                  )
                })}
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
