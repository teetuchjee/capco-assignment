import Image from 'next/image'

interface AnimatePortalSpinnerProps {
  width?: number
  height?: number
}

export default function AnimatePortalSpinner({
  width = 500,
  height = 500
}: AnimatePortalSpinnerProps) {
  return (
    <div className="relative inline-block">
      <div className="absolute inset-0 animate-pulse rounded-full bg-green-400/30 blur-2xl" />
      <div className="animate-portal relative">
        <Image
          src="/portal.webp"
          alt="Portal Loading"
          width={width}
          height={height}
          priority
          className="drop-shadow-[0_0_50px_rgba(34,197,94,0.6)]"
        />
      </div>
    </div>
  )
}
