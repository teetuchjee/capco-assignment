import * as React from 'react'

import { cn } from '@/lib/utils'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export default function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-(--container)', 'px-6 sm:px-4', className)} {...props}>
      {children}
    </div>
  )
}
