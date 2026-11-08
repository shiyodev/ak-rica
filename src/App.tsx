import { initBase, type BaseData } from '@/components/Base'
import { BaseGrid } from '@/components/ui/BaseGrid'
import { RoomDetails } from '@/components/ui/RoomDetails'
import { Button } from '@/components/ui/button'
import { layout } from '@/data/index.gen'
import { useState } from 'react'

function GitHubButton() {
  return (
    <Button
      render={
        <a
          href="https://github.com/shiyodev/ak-rica"
          target="_blank"
          rel="noreferrer"
        />
      }
    >
      <svg className="button-icon" role="presentation" aria-hidden="true">
        <use href="/icons.svg#github-icon"></use>
      </svg>
      GitHub
    </Button>
  )
}

export default function App() {
  const [room, setRoom] = useState<(typeof layout)[keyof typeof layout] | null>(null)
  const [base, setBase] = useState<BaseData>(() => initBase())

  return (
    <main className="dark min-h-screen bg-background text-foreground">
      <GitHubButton />
      <BaseGrid base={base} onSelect={setRoom} />
      <RoomDetails room={room} onClose={() => setRoom(null)} />
    </main>
  )
}
