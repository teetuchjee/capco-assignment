'use client'

import { useState } from 'react'

import Image from 'next/image'

import { Grid2x2, List } from 'lucide-react'

import AnimatePortalSpinner from '@/components/molecules/animates/portal-spinner'
import CharacterCard from '@/components/molecules/cards/character'
import ErrorCard from '@/components/molecules/cards/error'
import IconToggle from '@/components/molecules/toggles/icon'
import VirtualizedGrid from '@/components/organisms/list/virtualized-grid'
import VirtualizedList from '@/components/organisms/list/virtualized-list'
import { TOGGLE_VIEW_OPTION } from '@/constants/enum'
import { useCharacters } from '@/hooks/useCharacters'
import { ToggleViewOption } from '@/interfaces/ui'

const toggleOptions = [
  { value: TOGGLE_VIEW_OPTION.GRID, icon: Grid2x2, dataTestId: 'toggle-grid' },
  { value: TOGGLE_VIEW_OPTION.LIST, icon: List, dataTestId: 'toggle-list' }
]

export default function HomeTemplate() {
  const [view, setView] = useState<ToggleViewOption>(TOGGLE_VIEW_OPTION.GRID)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useCharacters()

  const characters = data?.pages.flatMap((page) => page.results) ?? []

  if (isLoading) {
    return <AnimatePortalSpinner />
  }

  if (isError) {
    return (
      <ErrorCard
        title=" Portal Malfunctioned !"
        message=" Looks like the interdimensional API broke mid-jump. Try again, or hop to another universe
        later — Rick’s probably fixing it (maybe). 🚀🌀"
      />
    )
  }

  return (
    <div className="w-full">
      <div className="flex justify-between p-6">
        <Image
          src={'/Rick_and_Morty.svg'}
          width={140}
          height={55}
          fetchPriority="high"
          alt="logo"
        />
        <IconToggle options={toggleOptions} onChange={setView} defaultValue="grid" />
      </div>

      {view === TOGGLE_VIEW_OPTION.GRID && (
        <VirtualizedGrid
          items={characters}
          overscan={1}
          columns={{ sm: 1, md: 2, lg: 2, xl: 3 }}
          estimateSize={() => 252}
          gap={16}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          renderItem={(character) => <CharacterCard character={character} />}
        />
      )}

      {view === TOGGLE_VIEW_OPTION.LIST && (
        <VirtualizedList
          items={characters}
          overscan={1}
          estimateSize={() => 252}
          gap={16}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          renderItem={(character) => <CharacterCard character={character} />}
        />
      )}
    </div>
  )
}
