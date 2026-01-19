import Image from 'next/image'

import { CheckCircle, HelpCircle, XCircle } from 'lucide-react'

import { Character } from '@/interfaces/character'
import { cn } from '@/lib/utils'

const statusConfig = {
  Alive: {
    class: 'text-green-500',
    Icon: CheckCircle
  },
  Dead: {
    class: 'text-red-500',
    Icon: XCircle
  },
  unknown: {
    class: 'text-yellow-700',
    Icon: HelpCircle
  }
} as const

interface CharacterCardProps {
  character: Character
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const { class: color, Icon } =
    statusConfig[character.status as keyof typeof statusConfig] ?? statusConfig.unknown

  return (
    <article
      id={`character-card-${character.id}`}
      className="bg-card/90 flex h-full rounded-md bg-[url('/bg-card-card.webp')] bg-cover bg-center"
    >
      <div className="flex w-full flex-col">
        <div className="flex items-center justify-center rounded-t-lg bg-[#D2DB4C] bg-green-500 bg-yellow-400 p-4">
          <p className="font-schwifty text-2xl tracking-wide text-[#35c9dd] [-webkit-text-stroke:0.5px_black] [text-stroke:0.5px_black]">
            Portal License # {character.id}
          </p>
        </div>

        <div className="flex items-start p-4">
          <div className="flex w-full flex-col">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col">
                <p className="text-card-foreground mt-1 text-lg font-extrabold">{character.name}</p>
                <p className="text-muted-foreground mt-1 text-sm font-semibold">
                  Origin {character.location.name}, {character.location.name}
                </p>
              </div>
              <div className={cn('relative h-[80px] min-w-[60px]')}>
                <Image
                  src={character.image}
                  alt={character.name + 'Image'}
                  fill
                  fetchPriority="high"
                  className="rounded-xl border object-cover"
                  placeholder="blur"
                  blurDataURL="/fallback-avatar.webp"
                  sizes="(max-width: 640px) 120px, (max-width: 1024px) 160px, 200px"
                />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <p className="text-muted-foreground mt-1 text-xs font-semibold">Sex</p>
                <p className="text-card-foreground text-sm font-bold">{character.gender}</p>
              </div>
              <div>
                <p className="text-muted-foreground mt-1 text-xs font-semibold">Species</p>
                <p className="text-card-foreground text-sm font-bold">{character.species}</p>
              </div>
              <div>
                <p className="text-muted-foreground mt-1 text-xs font-semibold">Sex</p>
                <p className="text-card-foreground text-sm font-bold">{character.gender}</p>
              </div>
            </div>
            <div className={`mt-3 flex items-center gap-2 font-extrabold ${color}`}>
              <Icon className="h-4 w-4" />
              {character.status}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
