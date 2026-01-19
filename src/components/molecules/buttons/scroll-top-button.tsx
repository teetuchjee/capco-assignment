'use client'

import { RefObject, useEffect, useState } from 'react'

import { Virtualizer } from '@tanstack/react-virtual'
import { ChevronUp } from 'lucide-react'

import { Button } from '@/components/atoms/button'
import { cn } from '@/lib/utils'

interface ScrollToTopButtonProps {
  containerRef: RefObject<HTMLDivElement | null>
  virtualizer?: Virtualizer<HTMLDivElement, Element>
  threshold?: number
  className?: string
}

export default function ScrollToTopButton({
  containerRef,
  virtualizer,
  threshold = 300,
  className
}: ScrollToTopButtonProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      setShow(container.scrollTop > threshold)
    }

    container.addEventListener('scroll', handleScroll)

    handleScroll()

    return () => container.removeEventListener('scroll', handleScroll)
  }, [containerRef, threshold])

  const scrollToTop = () => {
    if (virtualizer) {
      virtualizer.scrollToOffset(0, { behavior: 'smooth' })
    } else if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <Button
      type="button"
      onClick={scrollToTop}
      className={cn(
        'absolute right-6 bottom-6 z-50 h-[40px] w-[40px] rounded-full bg-[#6DBAD1]/90 p-3 text-white shadow-lg transition-all duration-300 hover:bg-[#6DBAD1]/100 hover:shadow-xl active:scale-95',
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-10 opacity-0',
        className
      )}
      aria-label="Scroll to top"
    >
      <ChevronUp className="h-6 w-6" />
    </Button>
  )
}
