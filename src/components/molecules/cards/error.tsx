import Link from 'next/link'

import { Button } from '@/components/atoms/button'

interface ErrorCardProps {
  title: string
  message: string
  actionText?: string
  actionHref?: string
}

export default function ErrorCard({ title, message, actionText, actionHref }: ErrorCardProps) {
  return (
    <div className="flex max-w-[650px] flex-col gap-6 rounded-xl bg-[#EFFAE2]/80 p-4 text-center md:p-6">
      <p className="font-schwifty text-[40px] font-semibold text-[#35c9dd] [-webkit-text-stroke:0.3px_black] [text-stroke:0.3px_black] md:text-[80px]">
        {title}
      </p>
      <p>{message}</p>
      {actionText && actionHref && (
        <Button asChild variant="secondary" className="bg-yellow-500 hover:bg-yellow-400">
          <Link href={actionHref}>{actionText}</Link>
        </Button>
      )}
    </div>
  )
}
