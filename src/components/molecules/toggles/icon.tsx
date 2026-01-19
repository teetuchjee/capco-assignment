'use client'

import { useEffect, useRef, useState } from 'react'

import { ToggleOption, ToggleViewOption } from '@/interfaces/ui'

interface IconToggleProps {
  options: ToggleOption[]
  defaultValue?: string
  onChange?: (value: ToggleViewOption) => void
}

export default function IconToggle({ options, defaultValue, onChange }: IconToggleProps) {
  const [activeValue, setActiveValue] = useState(defaultValue || options[0]?.value)
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 })

  const updateIndicator = (index: number): void => {
    const btn = buttonRefs.current[index]
    const container = containerRef.current
    if (!btn || !container) return

    const btnRect = btn.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()

    setIndicatorStyle({
      width: btnRect.width,
      left: btnRect.left - containerRect.left
    })
  }

  const handleToggle = (value: ToggleViewOption, index: number): void => {
    setActiveValue(value as string)
    onChange?.(value)
    updateIndicator(index)
  }

  useEffect(() => {
    const index = options.findIndex((o) => o.value === activeValue)
    updateIndicator(index)
  }, [activeValue, options])

  return (
    <div
      ref={containerRef}
      className="relative flex w-fit items-center gap-2 rounded-lg bg-[#6DBAD1] p-1"
    >
      <div
        className="absolute top-1 bottom-1 rounded-md bg-[#5D9DB0] transition-all duration-300 ease-out"
        style={indicatorStyle}
      />

      {options.map((option, i) => {
        const Icon = option.icon
        return (
          <button
            key={option.value}
            ref={(el) => {
              buttonRefs.current[i] = el
            }}
            data-testid={option.dataTestId}
            aria-label={option.value}
            onClick={() => handleToggle(option.value, i)}
            className="relative z-10 cursor-pointer rounded-md p-2"
          >
            <Icon className="text-white" size={18} />
          </button>
        )
      })}
    </div>
  )
}
