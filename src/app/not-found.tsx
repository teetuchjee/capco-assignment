import ErrorCard from '@/components/molecules/cards/error'

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <ErrorCard
        title="Lost in Space"
        message="Looks like this universe doesn’t exist. Let’s head somewhere safer."
        actionText="Home"
        actionHref="/"
      />
    </div>
  )
}
