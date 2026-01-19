import { useEffect, useState } from 'react'

interface ResponsiveColumns {
  sm?: number
  md?: number
  lg?: number
  xl?: number
  '2xl'?: number
}

/**
 * Hook to manage responsive column count based on Tailwind breakpoints
 * @param columns - Column configuration for each breakpoint
 * @returns Current number of columns based on window width
 */
export function useResponsiveColumns(
  columns: ResponsiveColumns = { sm: 1, md: 2, lg: 3, xl: 4 }
): number {
  const [currentColumns, setCurrentColumns] = useState(() => {
    // Server-side or initial render - use lg as default
    if (typeof window === 'undefined') {
      return columns.lg || 3
    }

    // Client-side initial value
    return getColumnsForWidth(window.innerWidth, columns)
  })

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth
      setCurrentColumns(getColumnsForWidth(width, columns))
    }

    // Set initial value on mount (handles hydration mismatch)
    updateColumns()

    // Add resize listener with debounce for performance
    let timeoutId: NodeJS.Timeout
    const debouncedUpdate = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(updateColumns, 100)
    }

    window.addEventListener('resize', debouncedUpdate)

    return () => {
      window.removeEventListener('resize', debouncedUpdate)
      clearTimeout(timeoutId)
    }
  }, [columns])

  return currentColumns
}

/**
 * Helper function to determine column count based on width
 */
function getColumnsForWidth(width: number, columns: ResponsiveColumns): number {
  if (width >= 1536 && columns['2xl']) {
    return columns['2xl']
  } else if (width >= 1280 && columns.xl) {
    return columns.xl
  } else if (width >= 1024 && columns.lg) {
    return columns.lg
  } else if (width >= 768 && columns.md) {
    return columns.md
  } else if (columns.sm) {
    return columns.sm
  }

  // Fallback
  return columns.lg || 3
}
